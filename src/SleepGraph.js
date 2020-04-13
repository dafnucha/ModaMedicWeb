import React, {Component} from "react"
//import LineChart from 'react-linechart';
import {LineChart} from 'react-chartkick'
import 'chart.js'

class SleepGraph extends Component {
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
        var pointsD = {}, pointsL = {}, pointsT = {};
        var oDay = new Date(1584526107531);
        var lineD = {}, lineL = {}, lineT = {};
        for(var i = 0; i < data.length; i++){
            var date = new Date(data[i].ValidTime)
            var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
            var deep = 0, light = 0, total = 0;
            for(var k = 0; k < data[i]["Data"].length; k++){
                var time = data[i]["Data"][k]["EndTime"] - data[i]["Data"][k]["StartTime"];
                time = time / 3600000;
                if(data[i]["Data"][k]["State"] === "SLEEP_LIGHT"){
                    light = light + time;
                }
                else{
                    deep = deep + time;
                }
                total = total + time;
            }
            if(date <= oDay){
                pointsD[dateStr] = deep;
                pointsL[dateStr] = light;
                pointsT[dateStr] = total;
            }
            if(date >= oDay){
                lineD[dateStr] = deep;
                lineL[dateStr] = light;
                lineT[dateStr] = total;
            }
        }
        var dataX = [
            {"name": "שעות שינה קלה לפני הניתוח", "data": pointsL},
            {"name": "שעות שינה עמוקה לפני הניתוח", "data": pointsD},
            {"name": "סך כל שעות השינה לפני הניתוח", "data": pointsT},
            {"name": "שעות שינה קלה אחרי הניתוח", "data": lineL},
            {"name": "שעות שינה עמוקה אחרי הניתוח", "data": lineD},
            {"name": "סך כל שעות השינה אחרי הניתוח", "data": lineT},
        ];
        
		return (
            <div>
                <div className="App">
                    <h1>{this.props.name}</h1>
                    <LineChart data={dataX} min={0}/>
                </div>	
            </div>
        )
    }
}

export default SleepGraph