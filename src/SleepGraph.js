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
        var oDay = new Date(this.props.date);
        var lineD = {}, lineL = {}, lineT = {};
        var table = {};
        var dates = [];
        for(var i = 0; i < data.length; i++){
            var date = new Date(data[i].ValidTime);
            var deep = 0, light = 0, total = 0, last, lDeep, lLight, lTotal;
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
            if(this.props.showDaily){
                var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
                if(date <= oDay){
                    pointsD[dateStr] = deep.toFixed(2);
                    pointsL[dateStr] = light.toFixed(2);
                    pointsT[dateStr] = total.toFixed(2);
                    last = dateStr;
                    lDeep = deep.toFixed(2);
                    lLight = light.toFixed(2);
                    lTotal = total.toFixed(2);
                }
                if(date >= oDay){
                    lineD[dateStr] = deep.toFixed(2);
                    lineL[dateStr] = light.toFixed(2);
                    lineT[dateStr] = total.toFixed(2);
                    if(last){
                        lineD[last] = lDeep;
                        lineL[last] = lLight;
                        lineT[last] = lTotal;
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
                    table[dateStr]["light"] = {};
                    table[dateStr]["deep"] = {};
                    table[dateStr]["total"] = {};
                    table[dateStr]["light"]["counter"] = 0;
                    table[dateStr]["light"]["sum"] = 0;
                    table[dateStr]["deep"]["counter"] = 0;
                    table[dateStr]["deep"]["sum"] = 0;
                    table[dateStr]["total"]["counter"] = 0;
                    table[dateStr]["total"]["sum"] = 0;
                    dates.push(data[i].ValidTime);
                }
                table[dateStr]["light"]["counter"]++;
                table[dateStr]["light"]["sum"] += light;
                table[dateStr]["deep"]["counter"]++;
                table[dateStr]["deep"]["sum"] += deep;
                table[dateStr]["total"]["counter"]++;
                table[dateStr]["total"]["sum"] += total;
            }
            else if(this.props.monthly){
                date = new Date(data[i].ValidTime);;
                dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                if(table[dateStr] == null){
                    table[dateStr] = {};
                    table[dateStr]["light"] = {};
                    table[dateStr]["deep"] = {};
                    table[dateStr]["total"] = {};
                    table[dateStr]["light"]["counter"] = 0;
                    table[dateStr]["light"]["sum"] = 0;
                    table[dateStr]["deep"]["counter"] = 0;
                    table[dateStr]["deep"]["sum"] = 0;
                    table[dateStr]["total"]["counter"] = 0;
                    table[dateStr]["total"]["sum"] = 0;
                    dates.push(data[i].ValidTime);
                }
                table[dateStr]["light"]["counter"]++;
                table[dateStr]["light"]["sum"] += light;
                table[dateStr]["deep"]["counter"]++;
                table[dateStr]["deep"]["sum"] += deep;
                table[dateStr]["total"]["counter"]++;
                table[dateStr]["total"]["sum"] += total;
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
                    pointsD[dateStr] = (table[dateStr]["deep"]["sum"] /  table[dateStr]["deep"]["counter"]).toFixed(2);
                    pointsL[dateStr] = (table[dateStr]["light"]["sum"] /  table[dateStr]["light"]["counter"]).toFixed(2);
                    pointsT[dateStr] = (table[dateStr]["total"]["sum"] /  table[dateStr]["total"]["counter"]).toFixed(2);
                    last = dateStr;
                    lDeep = (table[dateStr]["deep"]["sum"] /  table[dateStr]["deep"]["counter"]).toFixed(2);
                    lLight = (table[dateStr]["light"]["sum"] /  table[dateStr]["light"]["counter"]).toFixed(2);
                    lTotal = (table[dateStr]["total"]["sum"] /  table[dateStr]["total"]["counter"]).toFixed(2);
                }
                if(date >= oDay){
                    lineD[dateStr] = (table[dateStr]["deep"]["sum"] /  table[dateStr]["deep"]["counter"]).toFixed(2);
                    lineL[dateStr] = (table[dateStr]["light"]["sum"] /  table[dateStr]["light"]["counter"]).toFixed(2);
                    lineT[dateStr] =(table[dateStr]["total"]["sum"] /  table[dateStr]["total"]["counter"]).toFixed(2);
                    if(last){
                        lineD[last] = lDeep;
                        lineL[last] = lLight;
                        lineT[last] = lTotal;
                    }
                }
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
                    <LineChart data={dataX} colors={["#010C6B", "#7C0000", "#0D4E00", "#77CCEE" ,"#F78989", "#B5FFA2"]} min={0}/>
                </div>	
            </div>
        )
    }
}

export default SleepGraph