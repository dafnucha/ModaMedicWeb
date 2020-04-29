import React, {Component} from "react"
//import LineChart from 'react-linechart';
import {LineChart} from 'react-chartkick'
import 'chart.js'

class Graph extends Component {
    constructor(props) {
        super()
        this.state = {
           
        }
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
        var data = this.sort_by_key(this.props.data, "Timestamp")
        var points = {};
        var oDay = new Date(this.props.date);
        var line = {};
        var table = {};
        var last, lData;
        var dates = [];
        for(var i = 0; i < data.length; i++){
            if(this.props.showDaily){
                var date = new Date(data[i].ValidTime)
                var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year:"numeric"}).replace(/ /g, '-')
                if(date <= oDay){
                    points[dateStr] = data[i].Data.toFixed(2);
                    last = dateStr;
                    lData = data[i].Data.toFixed(2);
                }
                if(date >= oDay){
                    line[dateStr] = data[i].Data.toFixed(2)
                    if(last){
                        line[last] = lData
                    }
                }
            }
            else if(this.props.weekly){
                date = new Date(data[i].ValidTime);
                var dayOfWeek = date.getDay();
                var sunday = new Date(data[i].ValidTime - dayOfWeek * 86400000);
                var saturday = new Date(sunday.getTime() + 518400000);
                dateStr = sunday.toLocaleDateString('en-GB', {day: 'numeric'}) + " - " + saturday.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
                if(table[dateStr] == null){
                    table[dateStr] = {};
                    table[dateStr]["counter"] = 0;
                    table[dateStr]["sum"] = 0;
                    dates.push(data[i].ValidTime);
                }
                table[dateStr]["sum"] += data[i].Data;
                table[dateStr]["counter"]++;
            }
            else if(this.props.monthly){
                date = new Date(data[i].ValidTime);;
                dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                if(table[dateStr] == null){
                    table[dateStr] = {};
                    table[dateStr]["counter"] = 0;
                    table[dateStr]["sum"] = 0;
                    dates.push(data[i].ValidTime);
                }
                table[dateStr]["sum"] += data[i].Data;
                table[dateStr]["counter"]++;
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
                if(date <= oDay){
                    points[dateStr] = (table[dateStr]["sum"] /  table[dateStr]["counter"]).toFixed(2);
                    last = dateStr;
                    lData = (table[dateStr]["sum"] /  table[dateStr]["counter"]).toFixed(2);
                }
                if(date >= oDay){
                    line[dateStr] = (table[dateStr]["sum"] /  table[dateStr]["counter"]).toFixed(2);
                    if(last){
                        line[last] = lData
                    }
                }
            }
        }
        var dataX = [
            {"name": "לפני הניתוח", "data": points},
            {"name": "אחרי הניתוח", "data": line}
        ];
        
		return (
            <div>
                <div className="App">
                    <h1>{this.props.name}</h1>
                    <LineChart data={dataX} min={0} />
                </div>	
            </div>
        )
    }
}

export default Graph