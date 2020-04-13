import React, {Component} from "react"
//import LineChart from 'react-linechart';
import { LineChart} from 'react-chartkick'
import 'chart.js'

class GraphAns extends Component {
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
        var data = this.sort_by_key(this.props.data, "ValidTime")
        var points = {};
        var oDay = new Date(1584526107531);
        var first = true;
        var firsStr = "";
        var line = {};
        for(var i = 0; i < data.length; i++){
            var date = new Date(data[i].ValidTime)
            var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
            if(date <= oDay){
                points[dateStr] = data[i]["Answers"][0]["AnswerID"][0];
            }
            if(date >= oDay){
                line[dateStr] = data[i]["Answers"][0]["AnswerID"][0];
                if(first || firsStr === dateStr){
                    first = false;
                    firsStr = dateStr;
                    points[dateStr] = data[i]["Answers"][0]["AnswerID"][0];
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

export default GraphAns