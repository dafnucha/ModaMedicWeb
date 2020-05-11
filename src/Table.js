import React, {Component} from "react"
import {ExportCSV} from "./ExportCSV"
//import "./Table.css"


class Table extends Component {
    constructor(props) {
        super()
        /*
        var table = {};
        var i, j;
        var dates = []
        for(i = 0; i < props.dataArr.length; i++){
            for(j = 0; j < props.dataArr[i].values.length; j++){
                if(props.showDaily){
                    var date = new Date(props.dataArr[i].values[j].ValidTime);
                    var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
                    if(table[dateStr] == null){
                        table[dateStr] = {};
                        dates.push(props.dataArr[i].values[j].ValidTime);
                    }
                    if(props.dataArr[i].name === "שעות שינה"){
                        var dateS = new Date(props.dataArr[i].values[j].ValidTime - 8640000);
                        var dateStrS = dateS.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
                        var deep = 0, light = 0, total = 0, firstTime = 0;
                        for(var k = 0; k < props.dataArr[i].values[j]["Data"].length; k++){
                            if(k === 0){
                                firstTime = props.dataArr[i].values[j]["Data"][k]["StartTime"];
                            }
                            else if( firstTime === props.dataArr[i].values[j]["Data"][k]["StartTime"]){
                                break;
                            }
                            var time = props.dataArr[i].values[j]["Data"][k]["EndTime"] - props.dataArr[i].values[j]["Data"][k]["StartTime"];
                            time = time / 3600000;
                            if(props.dataArr[i].values[j]["Data"][k]["State"] === "SLEEP_LIGHT"){
                                light = light + time;
                            }
                            else{
                                deep = deep + time;
                            }
                            total = total + time;
                        }
                        if(!table[dateStrS]){
                            table[dateStrS] = {};
                        }
                        table[dateStrS]["light"] = light;
                        table[dateStrS]["deep"] = deep;
                        table[dateStrS]["total"] = total;
                        continue;
                    }
                    table[dateStr][props.dataArr[i].name] = props.dataArr[i].values[j];
                }
                else if(props.weekly){
                    date = new Date(props.dataArr[i].values[j].ValidTime);
                    var dayOfWeek = date.getDay();
                    var sunday = new Date(props.dataArr[i].values[j].ValidTime - 8640000 - dayOfWeek * 86400000);
                    var saturday = new Date(sunday.getTime() + 518400000);
                    dateStr = sunday.toLocaleDateString('en-GB', {day: 'numeric'}) + "-" + saturday.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
                    if(table[dateStr] == null){
                        table[dateStr] = {};
                        dates.push(props.dataArr[i].values[j].ValidTime);
                    }
                    if(table[dateStr][props.dataArr[i].name] == null){
                        table[dateStr][props.dataArr[i].name] = {};
                        table[dateStr][props.dataArr[i].name]["counter"] = 0;
                        table[dateStr][props.dataArr[i].name]["sum"] = 0;
                    }
                    if(props.dataArr[i].name === "שעות שינה"){
                        dateS = new Date(props.dataArr[i].values[j].ValidTime - 8640000);
                        dateStrS = dateS.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
                        let deep = 0, light = 0, total = 0, firstTime = 0;
                        for(k = 0; k < props.dataArr[i].values[j]["Data"].length; k++){
                            if(k === 0){
                                firstTime = props.dataArr[i].values[j]["Data"][k]["StartTime"];
                            }
                            else if( firstTime === props.dataArr[i].values[j]["Data"][k]["StartTime"]){
                                break;
                            }
                            time = props.dataArr[i].values[j]["Data"][k]["EndTime"] - props.dataArr[i].values[j]["Data"][k]["StartTime"];
                            time = time / 3600000;
                            if(props.dataArr[i].values[j]["Data"][k]["State"] === "SLEEP_LIGHT"){
                                light = light + time;
                            }
                            else{
                                deep = deep + time;
                            }
                            total = total + time;
                        }
                        if(!table[dateStrS]){
                            table[dateStrS] = {};
                        }
                        if(!table[dateStrS]["total"]){
                            table[dateStrS]["light"] = {};
                            table[dateStrS]["deep"] = {};
                            table[dateStrS]["total"] = {};
                            table[dateStrS]["light"]["counter"] = 0;
                            table[dateStrS]["deep"]["counter"] = 0;
                            table[dateStrS]["total"]["counter"] = 0;
                            table[dateStrS]["light"]["sum"] = 0;
                            table[dateStrS]["deep"]["sum"] = 0;
                            table[dateStrS]["total"]["sum"] = 0;
                        }
                        table[dateStrS]["light"]["sum"] += light;
                        table[dateStrS]["deep"]["sum"] += deep;
                        table[dateStrS]["total"]["sum"] += total;
                        table[dateStrS]["light"]["counter"]++;
                        table[dateStrS]["deep"]["counter"]++;
                        table[dateStrS]["total"]["counter"]++;
                        continue;
                    }
                    table[dateStr][props.dataArr[i].name]["sum"] += props.dataArr[i].values[j]["Data"];
                    table[dateStr][props.dataArr[i].name]["counter"]++;
                }
                else if(props.monthly){
                    date = new Date(props.dataArr[i].values[j].ValidTime);;
                    dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                    if(table[dateStr] == null){
                        table[dateStr] = {};
                        dates.push(props.dataArr[i].values[j].ValidTime );
                    }
                    if(table[dateStr][props.dataArr[i].name] == null){
                        table[dateStr][props.dataArr[i].name] = {};
                        table[dateStr][props.dataArr[i].name]["counter"] = 0;
                        table[dateStr][props.dataArr[i].name]["sum"] = 0;
                    }
                    if(props.dataArr[i].name === "שעות שינה"){
                        dateS = new Date(props.dataArr[i].values[j].ValidTime - 8640000);
                        dateStrS = dateS.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
                        let deep = 0, light = 0, total = 0, firstTime = 0;
                        for(k = 0; k < props.dataArr[i].values[j]["Data"].length; k++){
                            if(k === 0){
                                firstTime = props.dataArr[i].values[j]["Data"][k]["StartTime"];
                            }
                            else if( firstTime === props.dataArr[i].values[j]["Data"][k]["StartTime"]){
                                break;
                            }
                            time = props.dataArr[i].values[j]["Data"][k]["EndTime"] - props.dataArr[i].values[j]["Data"][k]["StartTime"];
                            time = time / 3600000;
                            if(props.dataArr[i].values[j]["Data"][k]["State"] === "SLEEP_LIGHT"){
                                light = light + time;
                            }
                            else{
                                deep = deep + time;
                            }
                            total = total + time;
                        }
                        if(!table[dateStrS]){
                            table[dateStrS] = {};
                        }
                        if(!table[dateStrS]["total"]){
                            table[dateStrS]["light"] = {};
                            table[dateStrS]["deep"] = {};
                            table[dateStrS]["total"] = {};
                            table[dateStrS]["light"]["counter"] = 0;
                            table[dateStrS]["deep"]["counter"] = 0;
                            table[dateStrS]["total"]["counter"] = 0;
                            table[dateStrS]["light"]["sum"] = 0;
                            table[dateStrS]["deep"]["sum"] = 0;
                            table[dateStrS]["total"]["sum"] = 0;
                        }
                        table[dateStrS]["light"]["sum"] += light;
                        table[dateStrS]["deep"]["sum"] += deep;
                        table[dateStrS]["total"]["sum"] += total;
                        table[dateStrS]["light"]["counter"]++;
                        table[dateStrS]["deep"]["counter"]++;
                        table[dateStrS]["total"]["counter"]++;
                        continue;
                    }
                    table[dateStr][props.dataArr[i].name]["sum"] += props.dataArr[i].values[j]["Data"];
                    table[dateStr][props.dataArr[i].name]["counter"]++;
                }
            }
        }
        dates = dates.sort();
        this.state = {
            steps: props.steps,
            distance : props.distance,
            calories: props.calories,
            weather: props.weather,
            sleep: props.sleep,
            data: table,
            dates: dates,
            
        }
        var arr = []
        if(props.weekly || props.monthly){
            for (let [key,] of Object.entries(this.state.data)) {
                for (let [key1,] of Object.entries(this.state.data[key])) {
                    this.state.data[key][key1]["Data"] = this.state.data[key][key1]["sum"] / this.state.data[key][key1]["counter"];
                }
            }
        }
        var exportCSV = [];
        for(i = 0; i < dates.length; i++){
            date = new Date(dates[i])
            dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
            if(props.showDaily){
                arr.push(
                    <tr key={dateStr}>
                        {(this.state.dates[i] < props.date) ? <td className="before">{dateStr}</td> : <td className="after">{dateStr}</td>}
                        { this.state.steps ? (this.state.data[dateStr]["צעדים"] ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["צעדים"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["צעדים"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.distance ? (this.state.data[dateStr]["מרחק"] ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["מרחק"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["מרחק"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.calories ? (this.state.data[dateStr]["קלוריות"] ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["קלוריות"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["קלוריות"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.weather ? (this.state.data[dateStr]["מזג האוויר"] ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["מזג האוויר"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["מזג האוויר"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.sleep ? (this.state.data[dateStr]["light"] >= 0 ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["light"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["light"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.sleep ? (this.state.data[dateStr]["deep"] >= 0 ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["deep"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["deep"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.sleep ? (this.state.data[dateStr]["total"] >= 0 ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["total"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["total"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                    </tr>
                )
            }
            else if(props.weekly || props.monthly){
                if(props.weekly){
                    dayOfWeek = date.getDay();
                    sunday = new Date(date.getTime() - dayOfWeek * 86400000);
                    saturday = new Date(sunday.getTime() + 518400000);
                    dateStr = sunday.toLocaleDateString('en-GB', {day: 'numeric'}) + "-" + saturday.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
                }
                else{
                    dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                }
                arr.push(
                    <tr key={dateStr}>
                        {(this.state.dates[i] < props.date) ? <td className="before">{dateStr}</td> : <td className="after">{dateStr}</td>}
                        { this.state.steps ? (this.state.data[dateStr]["צעדים"] ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["צעדים"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["צעדים"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.distance ? (this.state.data[dateStr]["מרחק"] ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["מרחק"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["מרחק"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.calories ? (this.state.data[dateStr]["קלוריות"] ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["קלוריות"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["קלוריות"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.weather ? (this.state.data[dateStr]["מזג האוויר"] ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["מזג האוויר"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["מזג האוויר"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.sleep ? (this.state.data[dateStr]["light"] ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["light"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["light"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.sleep ? (this.state.data[dateStr]["deep"] ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["deep"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["deep"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        { this.state.sleep ? (this.state.data[dateStr]["total"] ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["total"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["total"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                    </tr>
                )
            }
            var line = {};
            line["תאריך"] = dateStr;
            if(this.state.steps && this.state.data[dateStr]["צעדים"]){
                line["צעדים"] = this.state.data[dateStr]["צעדים"]["Data"];
            }
            if(this.state.distance && this.state.data[dateStr]["מרחק"]){
                line["מרחק"] = this.state.data[dateStr]["מרחק"]["Data"];
            }
            if(this.state.calories && this.state.data[dateStr]["קלוריות"]){
                line["קלוריות"] = this.state.data[dateStr]["קלוריות"]["Data"];
            }
            if(this.state.weather && this.state.data[dateStr]["מזג האוויר"]){
                line["מזג האוויר"] = this.state.data[dateStr]["מזג האוויר"]["Data"];
            }
            if(this.state.sleep && this.state.data[dateStr]["light"] && props.showDaily){
                line["שעות שינה קלה"] = this.state.data[dateStr]["light"];
                line["שעות שינה עמוקה"] = this.state.data[dateStr]["deep"];
                line["סך כל שעות השינה"] = this.state.data[dateStr]["total"];
                
            }
            if(this.state.sleep && this.state.data[dateStr]["light"] && !props.showDaily){
                line["שעות שינה קלה"] = this.state.data[dateStr]["light"]["Data"];
                line["שעות שינה עמוקה"] = this.state.data[dateStr]["deep"]["Data"];
                line["סך כל שעות השינה"] = this.state.data[dateStr]["total"]["Data"];
            }
            exportCSV.push(line);
        }
        this.state = {
            table: arr,
            exportCSV: exportCSV
        }
        this.styleLabel = {
            fontSize: "calc(10px)",
            color: "black",
            margin: "2vmin 2vmin 2vmin 2vmin"
        }*/
        
        this.state = {
            steps: props.steps,
            distance : props.distance,
            calories: props.calories,
            weather: props.weather,
            sleep: props.sleep,
            dataArr: props.dataArr,
            table: [],
            exportCSV: []
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({[name]: checked }) : this.setState({ [name]: value })
    }
    
    


    render() {
        require("./Table.css");
        if(this.props.ready){
            var table = {};
            var i, j;
            var dates = []
            for(i = 0; i < this.props.dataArr.length; i++){
                for(j = 0; j < this.props.dataArr[i].values.length; j++){
                    if(this.props.showDaily){
                        var date = new Date(this.props.dataArr[i].values[j].ValidTime);
                        var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
                        if(table[dateStr] == null){
                            table[dateStr] = {};
                            dates.push(this.props.dataArr[i].values[j].ValidTime);
                        }
                        if(this.props.dataArr[i].name === "שעות שינה"){
                            var dateS = new Date(this.props.dataArr[i].values[j].ValidTime - 8640000);
                            var dateStrS = dateS.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
                            var deep = 0, light = 0, total = 0, firstTime = 0;
                            for(var k = 0; k < this.props.dataArr[i].values[j]["Data"].length; k++){
                                if(k === 0){
                                    firstTime = this.props.dataArr[i].values[j]["Data"][k]["StartTime"];
                                }
                                else if( firstTime === this.props.dataArr[i].values[j]["Data"][k]["StartTime"]){
                                    break;
                                }
                                var time = this.props.dataArr[i].values[j]["Data"][k]["EndTime"] - this.props.dataArr[i].values[j]["Data"][k]["StartTime"];
                                time = time / 3600000;
                                if(this.props.dataArr[i].values[j]["Data"][k]["State"] === "SLEEP_LIGHT"){
                                    light = light + time;
                                }
                                else{
                                    deep = deep + time;
                                }
                                total = total + time;
                            }
                            if(!table[dateStrS]){
                                table[dateStrS] = {};
                            }
                            table[dateStrS]["light"] = light;
                            table[dateStrS]["deep"] = deep;
                            table[dateStrS]["total"] = total;
                            continue;
                        }
                        table[dateStr][this.props.dataArr[i].name] = this.props.dataArr[i].values[j];
                    }
                    else if(this.props.weekly){
                        date = new Date(this.props.dataArr[i].values[j].ValidTime);
                        var dayOfWeek = date.getDay();
                        var sunday = new Date(this.props.dataArr[i].values[j].ValidTime - dayOfWeek * 86400000);
                        var saturday = new Date(sunday.getTime() + 518400000);
                        dateStr = sunday.toLocaleDateString('en-GB', {day: 'numeric'}) + "-" + saturday.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
                        if(table[dateStr] == null){
                            table[dateStr] = {};
                            dates.push(this.props.dataArr[i].values[j].ValidTime);
                        }
                        if(table[dateStr][this.props.dataArr[i].name] == null){
                            table[dateStr][this.props.dataArr[i].name] = {};
                            table[dateStr][this.props.dataArr[i].name]["counter"] = 0;
                            table[dateStr][this.props.dataArr[i].name]["sum"] = 0;
                        }
                        if(this.props.dataArr[i].name === "שעות שינה"){
                            dateS = new Date(this.props.dataArr[i].values[j].ValidTime - 8640000);
                            dateStrS = dateS.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
                            let deep = 0, light = 0, total = 0, firstTime = 0;
                            for(k = 0; k < this.props.dataArr[i].values[j]["Data"].length; k++){
                                if(k === 0){
                                    firstTime = this.props.dataArr[i].values[j]["Data"][k]["StartTime"];
                                }
                                else if( firstTime === this.props.dataArr[i].values[j]["Data"][k]["StartTime"]){
                                    break;
                                }
                                time = this.props.dataArr[i].values[j]["Data"][k]["EndTime"] - this.props.dataArr[i].values[j]["Data"][k]["StartTime"];
                                time = time / 3600000;
                                if(this.props.dataArr[i].values[j]["Data"][k]["State"] === "SLEEP_LIGHT"){
                                    light = light + time;
                                }
                                else{
                                    deep = deep + time;
                                }
                                total = total + time;
                            }
                            if(!table[dateStrS]){
                                table[dateStrS] = {};
                            }
                            if(!table[dateStrS]["total"]){
                                table[dateStrS]["light"] = {};
                                table[dateStrS]["deep"] = {};
                                table[dateStrS]["total"] = {};
                                table[dateStrS]["light"]["counter"] = 0;
                                table[dateStrS]["deep"]["counter"] = 0;
                                table[dateStrS]["total"]["counter"] = 0;
                                table[dateStrS]["light"]["sum"] = 0;
                                table[dateStrS]["deep"]["sum"] = 0;
                                table[dateStrS]["total"]["sum"] = 0;
                            }
                            table[dateStrS]["light"]["sum"] += light;
                            table[dateStrS]["deep"]["sum"] += deep;
                            table[dateStrS]["total"]["sum"] += total;
                            table[dateStrS]["light"]["counter"]++;
                            table[dateStrS]["deep"]["counter"]++;
                            table[dateStrS]["total"]["counter"]++;
                            continue;
                        }
                        table[dateStr][this.props.dataArr[i].name]["sum"] += this.props.dataArr[i].values[j]["Data"];
                        table[dateStr][this.props.dataArr[i].name]["counter"]++;
                    }
                    else if(this.props.monthly){
                        date = new Date(this.props.dataArr[i].values[j].ValidTime);;
                        dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                        if(table[dateStr] == null){
                            table[dateStr] = {};
                            dates.push(this.props.dataArr[i].values[j].ValidTime );
                        }
                        if(table[dateStr][this.props.dataArr[i].name] == null){
                            table[dateStr][this.props.dataArr[i].name] = {};
                            table[dateStr][this.props.dataArr[i].name]["counter"] = 0;
                            table[dateStr][this.props.dataArr[i].name]["sum"] = 0;
                        }
                        if(this.props.dataArr[i].name === "שעות שינה"){
                            dateS = new Date(this.props.dataArr[i].values[j].ValidTime - 8640000);
                            dateStrS = dateS.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
                            let deep = 0, light = 0, total = 0, firstTime = 0;
                            for(k = 0; k < this.props.dataArr[i].values[j]["Data"].length; k++){
                                if(k === 0){
                                    firstTime = this.props.dataArr[i].values[j]["Data"][k]["StartTime"];
                                }
                                else if( firstTime === this.props.dataArr[i].values[j]["Data"][k]["StartTime"]){
                                    break;
                                }
                                time = this.props.dataArr[i].values[j]["Data"][k]["EndTime"] - this.props.dataArr[i].values[j]["Data"][k]["StartTime"];
                                time = time / 3600000;
                                if(this.props.dataArr[i].values[j]["Data"][k]["State"] === "SLEEP_LIGHT"){
                                    light = light + time;
                                }
                                else{
                                    deep = deep + time;
                                }
                                total = total + time;
                            }
                            if(!table[dateStrS]){
                                table[dateStrS] = {};
                            }
                            if(!table[dateStrS]["total"]){
                                table[dateStrS]["light"] = {};
                                table[dateStrS]["deep"] = {};
                                table[dateStrS]["total"] = {};
                                table[dateStrS]["light"]["counter"] = 0;
                                table[dateStrS]["deep"]["counter"] = 0;
                                table[dateStrS]["total"]["counter"] = 0;
                                table[dateStrS]["light"]["sum"] = 0;
                                table[dateStrS]["deep"]["sum"] = 0;
                                table[dateStrS]["total"]["sum"] = 0;
                            }
                            table[dateStrS]["light"]["sum"] += light;
                            table[dateStrS]["deep"]["sum"] += deep;
                            table[dateStrS]["total"]["sum"] += total;
                            table[dateStrS]["light"]["counter"]++;
                            table[dateStrS]["deep"]["counter"]++;
                            table[dateStrS]["total"]["counter"]++;
                            continue;
                        }
                        table[dateStr][this.props.dataArr[i].name]["sum"] += this.props.dataArr[i].values[j]["Data"];
                        table[dateStr][this.props.dataArr[i].name]["counter"]++;
                    }
                }
            }
            dates = dates.sort();
            var arr = [];
            if(this.props.weekly || this.props.monthly){
                for (let [key,] of Object.entries(table)) {
                    for (let [key1,] of Object.entries(table[key])) {
                        table[key][key1]["Data"] = table[key][key1]["sum"] / table[key][key1]["counter"];
                    }
                }
            }
            var exportCSV = [];
            for(i = 0; i < dates.length; i++){
                date = new Date(dates[i])
                dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
                if(this.props.showDaily){
                    arr.push(
                        <tr key={dateStr}>
                            {(dates[i] < this.props.date) ? <td className="before">{dateStr}</td> : <td className="after">{dateStr}</td>}
                            { this.props.steps ? (table[dateStr]["צעדים"] ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["צעדים"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["צעדים"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.distance ? (table[dateStr]["מרחק"] ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["מרחק"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["מרחק"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.calories ? (table[dateStr]["קלוריות"] ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["קלוריות"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["קלוריות"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.weather ? (table[dateStr]["מזג האוויר"] ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["מזג האוויר"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["מזג האוויר"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.sleep ? (table[dateStr]["light"] >= 0 ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["light"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["light"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.sleep ? (table[dateStr]["deep"] >= 0 ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["deep"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["deep"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.sleep ? (table[dateStr]["total"] >= 0 ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["total"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["total"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        </tr>
                    )
                }
                else if(this.props.weekly || this.props.monthly){
                    if(this.props.weekly){
                        dayOfWeek = date.getDay();
                        sunday = new Date(date.getTime() - dayOfWeek * 86400000);
                        saturday = new Date(sunday.getTime() + 518400000);
                        dateStr = sunday.toLocaleDateString('en-GB', {day: 'numeric'}) + "-" + saturday.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
                    }
                    else{
                        dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                    }
                    arr.push(
                        <tr key={dateStr}>
                            {(dates[i] < this.props.date) ? <td className="before">{dateStr}</td> : <td className="after">{dateStr}</td>}
                            { this.props.steps ? (table[dateStr]["צעדים"] ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["צעדים"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["צעדים"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.distance ? (table[dateStr]["מרחק"] ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["מרחק"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["מרחק"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.calories ? (table[dateStr]["קלוריות"] ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["קלוריות"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["קלוריות"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.weather ? (table[dateStr]["מזג האוויר"] ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["מזג האוויר"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["מזג האוויר"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.sleep ? (table[dateStr]["light"] ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["light"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["light"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.sleep ? (table[dateStr]["deep"] ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["deep"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["deep"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                            { this.props.sleep ? (table[dateStr]["total"] ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["total"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["total"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>) ) : null}
                        </tr>
                    )
                }
                var line = {};
                line["תאריך"] = dateStr;
                if(this.props.steps && table[dateStr]["צעדים"]){
                    line["צעדים"] = table[dateStr]["צעדים"]["Data"];
                }
                if(this.props.distance && table[dateStr]["מרחק"]){
                    line["מרחק"] = table[dateStr]["מרחק"]["Data"];
                }
                if(this.props.calories && table[dateStr]["קלוריות"]){
                    line["קלוריות"] = table[dateStr]["קלוריות"]["Data"];
                }
                if(this.props.weather && table[dateStr]["מזג האוויר"]){
                    line["מזג האוויר"] = table[dateStr]["מזג האוויר"]["Data"];
                }
                if(this.props.sleep && table[dateStr]["light"] && this.props.showDaily){
                    line["שעות שינה קלה"] = table[dateStr]["light"];
                    line["שעות שינה עמוקה"] = table[dateStr]["deep"];
                    line["סך כל שעות השינה"] = table[dateStr]["total"];
                    
                }
                if(this.props.sleep && table[dateStr]["light"] && !this.props.showDaily){
                    line["שעות שינה קלה"] = table[dateStr]["light"]["Data"];
                    line["שעות שינה עמוקה"] = table[dateStr]["deep"]["Data"];
                    line["סך כל שעות השינה"] = table[dateStr]["total"]["Data"];
                }
                exportCSV.push(line);
            }
        }
        return(
            <div>
                {this.props.ready ? <div className="center">
                    <table style={{width: "100%"}} id="mdd" className="tabels" align="center">
                        <tbody>
                            <tr>
                                { this.props.dataArr.length > 0 ? <th>תאריך</th> : null}
                                { this.props.steps ? <th>צעדים</th> : null }
                                { this.props.distance ? <th>מרחק</th> : null }
                                { this.props.calories ? <th>קלוריות</th> : null }
                                { this.props.weather ? <th>מזג האוויר</th> : null }
                                { this.props.sleep ? <th>שעות שינה קלה</th> : null }
                                { this.props.sleep ? <th>שעות שינה עמוקה</th> : null }
                                { this.props.sleep ? <th>סך כל שעות השינה</th> : null }
                            </tr>
                            {arr}
                        </tbody>
                    </table>
                    { this.props.dataArr.length > 0 ? <ExportCSV csvData={exportCSV} fileName={this.props.name + " מדדים"}/> : null}
                    
                </div> : null}
            </div>
        )
    }
}

export default Table