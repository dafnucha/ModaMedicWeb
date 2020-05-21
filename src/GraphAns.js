import React, {Component} from "react"
//import LineChart from 'react-linechart';
import { LineChart} from 'react-chartkick'
import 'chart.js'

class GraphAns extends Component {
    constructor(props) {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.sort_by_key = function(array, key)
        {
         return array.sort(function(a, b)
         {
          var x = a[key]; var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
         });
        }

    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({[name]: checked }) : this.setState({ [name]: value })
    }
    



    render() {
        if(this.props.ready){
            var noData = false;
            if(this.props.data.length > 0){
                var data = this.sort_by_key(this.props.data, "ValidTime")
                var points = {};
                var oDay = new Date(this.props.date);
                var line = {};
                var table = {};
                var dates = [];
                var week = false;
                var dateO, dateOStr;
                if(this.props.weekly){
                    dateO = new Date(this.props.date);
                    var day = dateO.getDay();
                    var sun = new Date(this.props.date - day * 86400000);
                    var sat = new Date(sun.getTime() + 518400000);
                    dateOStr = sun.toLocaleDateString('en-GB', {day: 'numeric'}) + " - " + sat.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
                }
                if(this.props.monthly){
                    dateO = new Date(this.props.date);
                    dateOStr = dateO.toLocaleDateString('en-GB', {month: 'short'});
                }
                var avgO = {};
                avgO["before"] = {sum: 0, counter: 0};
                avgO["after"]= {sum: 0, counter: 0};
                for(var i = 0; i < data.length; i++){
                    if(this.props.showDaily){
                        var date = new Date(data[i].ValidTime)
                        var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year:"numeric"}).replace(/ /g, '-')
                        if(date <= oDay){
                            points[dateStr] = data[i]["Answers"][0]["AnswerID"][0].toFixed(2);
                        }
                        if(date >= oDay){
                            line[dateStr] = data[i]["Answers"][0]["AnswerID"][0].toFixed(2);
                        }
                    }
                    else if(this.props.weekly){
                        date = new Date(data[i].ValidTime);
                        var dayOfWeek = date.getDay();
                        var sunday = new Date(data[i].ValidTime - dayOfWeek * 86400000);
                        var saturday = new Date(sunday.getTime() + 518400000);
                        dateStr = sunday.toLocaleDateString('en-GB', {day: 'numeric'}) + " - " + saturday.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
                        if(dateOStr === dateStr){
                            if(data[i].ValidTime < this.props.date){
                                avgO["before"]["counter"]++;
                                avgO["before"]["sum"] += data[i]["Answers"][0]["AnswerID"][0];
                            }
                            else{
                                avgO["after"]["counter"]++;
                                avgO["after"]["sum"] += data[i]["Answers"][0]["AnswerID"][0]; 
                            }
                            if(!week){
                                week = true;
                                dates.push(data[i].ValidTime);
                            }
                        }
                        else{
                            if(table[dateStr] == null){
                                table[dateStr] = {};
                                table[dateStr]["counter"] = 0;
                                table[dateStr]["sum"] = 0;
                                dates.push(data[i].ValidTime);
                            }
                            table[dateStr]["sum"] += data[i]["Answers"][0]["AnswerID"][0];
                            table[dateStr]["counter"]++;
                        }
                    }
                    else if(this.props.monthly){
                        date = new Date(data[i].ValidTime);;
                        dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                        if(dateOStr === dateStr){
                            if(data[i].ValidTime < this.props.date){
                                avgO["before"]["counter"]++;
                                avgO["before"]["sum"] += data[i]["Answers"][0]["AnswerID"][0];
                            }
                            else{
                                avgO["after"]["counter"]++;
                                avgO["after"]["sum"] += data[i]["Answers"][0]["AnswerID"][0]; 
                            }
                            if(!week){
                                week = true;
                                dates.push(data[i].ValidTime);
                            }
                        }
                        else{
                            if(table[dateStr] == null){
                                table[dateStr] = {};
                                table[dateStr]["counter"] = 0;
                                table[dateStr]["sum"] = 0;
                                dates.push(data[i].ValidTime);
                            }
                            table[dateStr]["sum"] += data[i]["Answers"][0]["AnswerID"][0];
                            table[dateStr]["counter"]++;
                        }
                    }
                }
                dates = dates.sort();
                if(this.props.weekly || this.props.monthly){
                    for (i = 0; i < dates.length; i++) {
                        date = new Date(dates[i]);
                        if(this.props.weekly){
                            dayOfWeek = date.getDay();
                            sunday = new Date(date.getTime() - dayOfWeek * 86400000);
                            saturday = new Date(sunday.getTime() + 518400000);
                            dateStr = sunday.toLocaleDateString('en-GB', {day: 'numeric'}) + " - " + saturday.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
                        }
                        else{
                            dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                        }
                        if(dateStr === dateOStr){
                            points[dateStr] = (avgO["before"]["sum"] /  avgO["before"]["counter"]).toFixed(2);
                            line[dateStr] = (avgO["after"]["sum"] /  avgO["after"]["counter"]).toFixed(2);
                            continue;
                        }
                        if(date <= oDay){
                            points[dateStr] = (table[dateStr]["sum"] / table[dateStr]["counter"]).toFixed(2);
                        }
                        if(date >= oDay){
                            line[dateStr] = (table[dateStr]["sum"] / table[dateStr]["counter"]).toFixed(2);
                        }
                    }
                }
                var dataX = [
                    {"name": "לפני הניתוח", "data": points},
                    {"name": "אחרי הניתוח", "data": line}
                ];
            }
            else{
                noData = true;
            }
        }
        
		return (
            <div>
                {this.props.ready ? <div>
                    <div className="App">
                        <h1>{this.props.name}</h1>
                        {noData ? <h4>לא קיים מידע על המשתמש</h4> : <LineChart download={true} data={dataX} min={0} />}
                    </div>	
                </div> : null}
            </div>
        )
    }
}

export default GraphAns