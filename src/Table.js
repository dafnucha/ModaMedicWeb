import React, {Component} from "react";
import {ExportCSV} from "./ExportCSV";

class Table extends Component {
    constructor(props) {
        super();
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
            var i, j, week = false;
            var dates = [];
            var dateO, dateOStr;
            if(this.props.weekly){
                dateO = new Date(this.props.date);
                var day = dateO.getDay();
                var sun = new Date(this.props.date - day * 86400000);
                var sat = new Date(sun.getTime() + 518400000);
                dateOStr = sun.toLocaleDateString('en-GB', {day: 'numeric'}) + "-" + sat.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
            }
            if(this.props.monthly){
                dateO = new Date(this.props.date);
                dateOStr = dateO.toLocaleDateString('en-GB', {month: 'short'});
            }
            var avgO = {};
            avgO["before"] = {צעדים: {}, מרחק: {}, קלוריות: {}, weather: {}, light: {}, deep: {}, total: {}};
            avgO["after"] = {צעדים: {}, מרחק: {}, קלוריות: {}, weather: {}, light: {}, deep: {}, total: {}};
            avgO["before"]["צעדים"] = {sum: 0, counter: 0};
            avgO["before"]["מרחק"] = {sum: 0, counter: 0};
            avgO["before"]["קלוריות"] = {sum: 0, counter: 0};
            avgO["before"]["weather"] = {sum: 0, counter: 0};
            avgO["before"]["light"] = {sum: 0, counter: 0};
            avgO["before"]["deep"] = {sum: 0, counter: 0};
            avgO["before"]["total"] = {sum: 0, counter: 0};
            avgO["after"]["צעדים"] = {sum: 0, counter: 0};
            avgO["after"]["מרחק"] = {sum: 0, counter: 0};
            avgO["after"]["קלוריות"] = {sum: 0, counter: 0};
            avgO["after"]["weather"] = {sum: 0, counter: 0};
            avgO["after"]["light"] = {sum: 0, counter: 0};
            avgO["after"]["deep"] = {sum: 0, counter: 0};
            avgO["after"]["total"] = {sum: 0, counter: 0};
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
                            if(!table[dateStr]){
                                table[dateStr] = {};
                            }
                            table[dateStr]["light"] = light;
                            table[dateStr]["deep"] = deep;
                            table[dateStr]["total"] = total;
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
                        if(dateOStr === dateStr){
                            if(this.props.dataArr[i].name === "שעות שינה"){
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
                                if(this.props.dataArr[i].values[j].ValidTime < this.props.date){
                                    avgO["before"]["light"]["sum"] += light;
                                    avgO["before"]["deep"]["sum"] += deep;
                                    avgO["before"]["total"]["sum"] += total;
                                    avgO["before"]["light"]["counter"] ++;
                                    avgO["before"]["deep"]["counter"] ++;
                                    avgO["before"]["total"]["counter"] ++;
                                }
                                else{
                                    avgO["after"]["light"]["sum"] += light;
                                    avgO["after"]["deep"]["sum"] += deep;
                                    avgO["after"]["total"]["sum"] += total;
                                    avgO["after"]["light"]["counter"] ++;
                                    avgO["after"]["deep"]["counter"] ++;
                                    avgO["after"]["total"]["counter"] ++;
                                }
                                continue;
                            }
                            if(this.props.dataArr[i].values[j].ValidTime < this.props.date){
                                if(this.props.dataArr[i].name === "מזג האוויר"){
                                    avgO["before"]["weather"]["sum"] += this.props.dataArr[i].values[j]["Data"];
                                    avgO["before"]["weather"]["counter"] ++;
                                    continue;
                                }
                                avgO["before"][this.props.dataArr[i].name]["sum"] += this.props.dataArr[i].values[j]["Data"];
                                avgO["before"][this.props.dataArr[i].name]["counter"] ++;
                            }
                            else{
                                if(this.props.dataArr[i].name === "מזג האוויר"){
                                    avgO["after"]["weather"]["sum"] += this.props.dataArr[i].values[j]["Data"];
                                    avgO["after"]["weather"]["counter"] ++;
                                    continue;
                                }
                                avgO["after"][this.props.dataArr[i].name]["sum"] += this.props.dataArr[i].values[j]["Data"];
                                avgO["after"][this.props.dataArr[i].name]["counter"] ++;
                            }
                            if(!week){
                                dates.push(this.props.dataArr[i].values[j].ValidTime);
                                week = true;
                            }
                            continue;
                        }
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
                            if(!table[dateStr]){
                                table[dateStr] = {};
                            }
                            if(!table[dateStr]["total"]){
                                table[dateStr]["light"] = {};
                                table[dateStr]["deep"] = {};
                                table[dateStr]["total"] = {};
                                table[dateStr]["light"]["counter"] = 0;
                                table[dateStr]["deep"]["counter"] = 0;
                                table[dateStr]["total"]["counter"] = 0;
                                table[dateStr]["light"]["sum"] = 0;
                                table[dateStr]["deep"]["sum"] = 0;
                                table[dateStr]["total"]["sum"] = 0;
                            }
                            table[dateStr]["light"]["sum"] += light;
                            table[dateStr]["deep"]["sum"] += deep;
                            table[dateStr]["total"]["sum"] += total;
                            table[dateStr]["light"]["counter"]++;
                            table[dateStr]["deep"]["counter"]++;
                            table[dateStr]["total"]["counter"]++;
                            continue;
                        }
                        table[dateStr][this.props.dataArr[i].name]["sum"] += this.props.dataArr[i].values[j]["Data"];
                        table[dateStr][this.props.dataArr[i].name]["counter"]++;
                    }
                    else if(this.props.monthly){
                        date = new Date(this.props.dataArr[i].values[j].ValidTime);;
                        dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                        if(dateOStr === dateStr){
                            if(this.props.dataArr[i].name === "שעות שינה"){
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
                                if(this.props.dataArr[i].values[j].ValidTime < this.props.date){
                                    avgO["before"]["light"]["sum"] += light;
                                    avgO["before"]["deep"]["sum"] += deep;
                                    avgO["before"]["total"]["sum"] += total;
                                    avgO["before"]["light"]["counter"] ++;
                                    avgO["before"]["deep"]["counter"] ++;
                                    avgO["before"]["total"]["counter"] ++;
                                }
                                else{
                                    avgO["after"]["light"]["sum"] += light;
                                    avgO["after"]["deep"]["sum"] += deep;
                                    avgO["after"]["total"]["sum"] += total;
                                    avgO["after"]["light"]["counter"] ++;
                                    avgO["after"]["deep"]["counter"] ++;
                                    avgO["after"]["total"]["counter"] ++;
                                }
                                continue;
                            }
                            if(this.props.dataArr[i].values[j].ValidTime < this.props.date){
                                if(this.props.dataArr[i].name === "מזג האוויר"){
                                    avgO["before"]["weather"]["sum"] += this.props.dataArr[i].values[j]["Data"];
                                    avgO["before"]["weather"]["counter"] ++;
                                    continue;
                                }
                                avgO["before"][this.props.dataArr[i].name]["sum"] += this.props.dataArr[i].values[j]["Data"];
                                avgO["before"][this.props.dataArr[i].name]["counter"] ++;
                            }
                            else{
                                if(this.props.dataArr[i].name === "מזג האוויר"){
                                    avgO["after"]["weather"]["sum"] += this.props.dataArr[i].values[j]["Data"];
                                    avgO["after"]["weather"]["counter"] ++;
                                    continue;
                                }
                                avgO["after"][this.props.dataArr[i].name]["sum"] += this.props.dataArr[i].values[j]["Data"];
                                avgO["after"][this.props.dataArr[i].name]["counter"] ++;
                            }
                            if(!week){
                                dates.push(this.props.dataArr[i].values[j].ValidTime);
                                week = true;
                            }
                            continue;
                        }
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
                            if(!table[dateStr]){
                                table[dateStr] = {};
                            }
                            if(!table[dateStr]["total"]){
                                table[dateStr]["light"] = {};
                                table[dateStr]["deep"] = {};
                                table[dateStr]["total"] = {};
                                table[dateStr]["light"]["counter"] = 0;
                                table[dateStr]["deep"]["counter"] = 0;
                                table[dateStr]["total"]["counter"] = 0;
                                table[dateStr]["light"]["sum"] = 0;
                                table[dateStr]["deep"]["sum"] = 0;
                                table[dateStr]["total"]["sum"] = 0;
                            }
                            table[dateStr]["light"]["sum"] += light;
                            table[dateStr]["deep"]["sum"] += deep;
                            table[dateStr]["total"]["sum"] += total;
                            table[dateStr]["light"]["counter"]++;
                            table[dateStr]["deep"]["counter"]++;
                            table[dateStr]["total"]["counter"]++;
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
                    if(dateStr === dateOStr){
                        arr.push(
                            <tr key={dateStr + "before"}>
                                <td className="before">{dateStr}</td>
                                { this.props.steps ? (avgO["before"]["צעדים"]["counter"] ? (<td className="before">{ (avgO["before"]["צעדים"]["sum"] / avgO["before"]["צעדים"]["counter"]).toFixed(2)}</td> ) : <td className="before">-</td>) : null}
                                { this.props.distance ? (avgO["before"]["מרחק"]["counter"] ? (<td className="before">{ (avgO["before"]["מרחק"]["sum"] / avgO["before"]["מרחק"]["counter"]).toFixed(2)}</td> ) : <td className="before">-</td>) : null}
                                { this.props.calories ? (avgO["before"]["קלוריות"]["counter"] ? (<td className="before">{ (avgO["before"]["קלוריות"]["sum"] / avgO["before"]["קלוריות"]["counter"]).toFixed(2)}</td> ) : <td className="before">-</td>) : null}
                                { this.props.weather ? (avgO["before"]["weather"]["counter"] ? (<td className="before">{ (avgO["before"]["weather"]["sum"] / avgO["before"]["weather"]["counter"]).toFixed(2)}</td> ) : <td className="before">-</td>) : null}
                                { this.props.sleep ? (avgO["before"]["light"]["counter"] ? (<td className="before">{ (avgO["before"]["light"]["sum"] / avgO["before"]["light"]["counter"]).toFixed(2)}</td> ) : <td className="before">-</td>) : null}
                                { this.props.sleep ? (avgO["before"]["deep"]["counter"] ? (<td className="before">{ (avgO["before"]["deep"]["sum"] / avgO["before"]["deep"]["counter"]).toFixed(2)}</td> ) : <td className="before">-</td>) : null}
                                { this.props.sleep ? (avgO["before"]["total"]["counter"] ? (<td className="before">{ (avgO["before"]["total"]["sum"] / avgO["before"]["total"]["counter"]).toFixed(2)}</td> ) : <td className="before">-</td>) : null}
                            </tr>
                        )
                        arr.push(
                            <tr key={dateStr + "after"}>
                                <td className="after">{dateStr}</td>
                                { this.props.steps ? (avgO["after"]["צעדים"]["counter"] ? (<td className="after">{ (avgO["after"]["צעדים"]["sum"] / avgO["after"]["צעדים"]["counter"]).toFixed(2)}</td> ) : <td className="after">-</td>) : null}
                                { this.props.distance ? (avgO["after"]["מרחק"]["counter"] ? (<td className="after">{ (avgO["after"]["מרחק"]["sum"] / avgO["after"]["מרחק"]["counter"]).toFixed(2)}</td> ) : <td className="after">-</td>) : null}
                                { this.props.calories ? (avgO["after"]["קלוריות"]["counter"] ? (<td className="after">{ (avgO["after"]["קלוריות"]["sum"] / avgO["after"]["קלוריות"]["counter"]).toFixed(2)}</td> ) : <td className="after">-</td>) : null}
                                { this.props.weather ? (avgO["after"]["weather"]["counter"] ? (<td className="after">{ (avgO["after"]["weather"]["sum"] / avgO["after"]["weather"]["counter"]).toFixed(2)}</td> ) : <td className="after">-</td>) : null}
                                { this.props.sleep ? (avgO["after"]["light"]["counter"] ? (<td className="after">{ (avgO["after"]["light"]["sum"] / avgO["after"]["light"]["counter"]).toFixed(2)}</td> ) : <td className="after">-</td>) : null}
                                { this.props.sleep ? (avgO["after"]["deep"]["counter"] ? (<td className="after">{ (avgO["after"]["deep"]["sum"] / avgO["after"]["deep"]["counter"]).toFixed(2)}</td> ) : <td className="after">-</td>) : null}
                                { this.props.sleep ? (avgO["after"]["total"]["counter"] ? (<td className="after">{ (avgO["after"]["total"]["sum"] / avgO["after"]["total"]["counter"]).toFixed(2)}</td> ) : <td className="after">-</td>) : null}
                            </tr>
                        )
                    }
                    else{
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
                }
                var line = {};
                line["תאריך"] = dateStr;
                if(dateStr === dateOStr){
                    if(this.props.steps && avgO["before"]["צעדים"]["counter"]){
                        line["צעדים"] = (avgO["before"]["צעדים"]["sum"] / avgO["before"]["צעדים"]["counter"]).toFixed(2);
                    }
                    if(this.props.distance && avgO["before"]["מרחק"]["counter"]){
                        line["מרחק"] = (avgO["before"]["מרחק"]["sum"] / avgO["before"]["מרחק"]["counter"]).toFixed(2);
                    }
                    if(this.props.calories && avgO["before"]["קלוריות"]["counter"]){
                        line["קלוריות"] = (avgO["before"]["קלוריות"]["sum"] / avgO["before"]["קלוריות"]["counter"]).toFixed(2);
                    }
                    if(this.props.weather && avgO["before"]["weather"]["counter"]){
                        line["מזג האוויר"] = (avgO["before"]["weather"]["sum"] / avgO["before"]["weather"]["counter"]).toFixed(2);
                    }
                    if(this.props.sleep && avgO["before"]["light"]["counter"]){
                        line["שעות שינה קלה"] = (avgO["before"]["light"]["sum"] / avgO["before"]["light"]["counter"]).toFixed(2);
                    }
                    if(this.props.sleep && avgO["before"]["deep"]["counter"]){
                        line["שעות שינה עמוקה"] = (avgO["before"]["deep"]["sum"] / avgO["before"]["deep"]["counter"]).toFixed(2);
                    }
                    if(this.props.sleep && avgO["before"]["total"]["counter"]){
                        line["סך כל שעות השינה"] = (avgO["before"]["total"]["sum"] / avgO["before"]["total"]["counter"]).toFixed(2);
                    }
                    exportCSV.push(line);
                    line = {};
                    line["תאריך"] = dateStr;
                    if(this.props.steps && avgO["after"]["צעדים"]["counter"]){
                        line["צעדים"] = (avgO["after"]["צעדים"]["sum"] / avgO["after"]["צעדים"]["counter"]).toFixed(2);
                    }
                    if(this.props.distance && avgO["after"]["מרחק"]["counter"]){
                        line["מרחק"] = (avgO["after"]["מרחק"]["sum"] / avgO["after"]["מרחק"]["counter"]).toFixed(2);
                    }
                    if(this.props.calories && avgO["after"]["קלוריות"]["counter"]){
                        line["קלוריות"] = (avgO["after"]["קלוריות"]["sum"] / avgO["after"]["קלוריות"]["counter"]).toFixed(2);
                    }
                    if(this.props.weather && avgO["after"]["weather"]["counter"]){
                        line["מזג האוויר"] = (avgO["after"]["weather"]["sum"] / avgO["after"]["weather"]["counter"]).toFixed(2);
                    }
                    if(this.props.sleep && avgO["after"]["light"]["counter"]){
                        line["שעות שינה קלה"] = (avgO["after"]["light"]["sum"] / avgO["after"]["light"]["counter"]).toFixed(2);
                    }
                    if(this.props.sleep && avgO["after"]["deep"]["counter"]){
                        line["שעות שינה עמוקה"] = (avgO["after"]["deep"]["sum"] / avgO["after"]["deep"]["counter"]).toFixed(2);
                    }
                    if(this.props.sleep && avgO["after"]["total"]["counter"]){
                        line["סך כל שעות השינה"] = (avgO["after"]["total"]["sum"] / avgO["after"]["total"]["counter"]).toFixed(2);
                    }
                    exportCSV.push(line);
                    continue;
                }
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