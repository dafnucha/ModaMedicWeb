import React, {Component} from "react"
import {ExportCSV} from "./ExportCSV"
//import "./TablePer.css"


class TablePer extends Component {
    constructor(props) {
        super()
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
            var data = this.props.data;
            var i, j;
            var dates = [];
            var dic = {};
            for(i = 0; i < data.length; i++){
                for(j = 0; j < data[i].data.length; j++){
                    if(this.props.showDaily){
                        var date = new Date(data[i].data[j].ValidTime)
                        var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
                        if(table[dateStr] == null){
                            table[dateStr] = {};
                            dates.push(data[i].data[j].ValidTime);
                        }
                        table[dateStr][data[i].data[j].QuestionnaireID] = data[i].data[j].Score;
                        dic[data[i].data[j].QuestionnaireID] = true;
                    }
                    else if(this.props.weekly){
                        date = new Date(data[i].data[j].ValidTime)
                        var dayOfWeek = date.getDay();
                        var sunday = new Date(data[i].data[j].ValidTime - dayOfWeek * 86400000);
                        var saturday = new Date(sunday.getTime() + 518400000);
                        dateStr = sunday.toLocaleDateString('en-GB', {day: 'numeric'}) + "-" + saturday.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
                        if(table[dateStr] == null){
                            table[dateStr] = {};
                            dates.push(data[i].data[j].ValidTime);
                        }
                        if(table[dateStr][data[i].data[j].QuestionnaireID] == null){
                            table[dateStr][data[i].data[j].QuestionnaireID] = {};
                            table[dateStr][data[i].data[j].QuestionnaireID]["sum"] = 0;
                            table[dateStr][data[i].data[j].QuestionnaireID]["counter"] = 0;
                        }
                        table[dateStr][data[i].data[j].QuestionnaireID]["sum"] += data[i].data[j].Score;
                        table[dateStr][data[i].data[j].QuestionnaireID]["counter"]++;
                        dic[data[i].data[j].QuestionnaireID] = true;
                    }
                    else if(this.props.monthly){
                        date = new Date(data[i].data[j].ValidTime)
                        dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                        if(table[dateStr] == null){
                            table[dateStr] = {};
                            dates.push(data[i].data[j].ValidTime);
                        }
                        if(table[dateStr][data[i].data[j].QuestionnaireID] == null){
                            table[dateStr][data[i].data[j].QuestionnaireID] = {};
                            table[dateStr][data[i].data[j].QuestionnaireID]["sum"] = 0;
                            table[dateStr][data[i].data[j].QuestionnaireID]["counter"] = 0;
                        }
                        table[dateStr][data[i].data[j].QuestionnaireID]["sum"] += data[i].data[j].Score;
                        table[dateStr][data[i].data[j].QuestionnaireID]["counter"]++;
                        dic[data[i].data[j].QuestionnaireID] = true;
                    }
                }
            }
            dates = dates.sort();
            var arr = [], exportCSV = [];
            if(this.props.weekly || this.props.monthly){
                for (let [key,] of Object.entries(table)) {
                    for (let [key1,] of Object.entries(table[key])) {
                        table[key][key1]["Data"] = table[key][key1]["sum"] / table[key][key1]["counter"];
                    }
                }
            }
            for(i = 0; i < dates.length; i++){
                date = new Date(dates[i])
                dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
                if(this.props.showDaily){
                    arr.push(
                        <tr key={dateStr}>
                            {(dates[i] < this.props.date) ? <td className="before">{dateStr}</td> : <td className="after">{dateStr}</td>}
                            { dic["1"] ? ((table[dateStr]["1"] >= 0 || table[dateStr]["1"] < 0) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["1"]}</td> : <td className="after">{ table[dateStr]["1"]}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                            { dic["2"] ? ((table[dateStr]["2"] >= 0 || table[dateStr]["2"] < 0) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["2"]}</td> : <td className="after">{ table[dateStr]["2"]}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                            { dic["3"] ? ((table[dateStr]["3"] >= 0 || table[dateStr]["3"] < 0) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["3"]}</td> : <td className="after">{ table[dateStr]["3"]}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                            { dic["4"] ? ((table[dateStr]["4"] >= 0 || table[dateStr]["4"] < 0) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["4"]}</td> : <td className="after">{ table[dateStr]["4"]}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                            { dic["5"] ? ((table[dateStr]["5"] >= 0 || table[dateStr]["5"] < 0) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["5"]}</td> : <td className="after">{ table[dateStr]["5"]}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                            { dic["6"] ? ((table[dateStr]["6"] >= 0 || table[dateStr]["6"] < 0) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["6"]}</td> : <td className="after">{ table[dateStr]["6"]}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
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
                            { dic["1"] ? ((table[dateStr]["1"] && (table[dateStr]["1"]["Data"] >= 0 || table[dateStr]["1"]["Data"] < 0)) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["1"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["1"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                            { dic["2"] ? ((table[dateStr]["2"] && (table[dateStr]["2"]["Data"] >= 0 || table[dateStr]["2"]["Data"] < 0)) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["2"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["2"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                            { dic["3"] ? ((table[dateStr]["3"] && (table[dateStr]["3"]["Data"] >= 0 || table[dateStr]["3"]["Data"] < 0)) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["3"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["3"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                            { dic["4"] ? ((table[dateStr]["4"] && (table[dateStr]["4"]["Data"] >= 0 || table[dateStr]["4"]["Data"] < 0)) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["4"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["4"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                            { dic["5"] ? ((table[dateStr]["5"] && (table[dateStr]["5"]["Data"] >= 0 || table[dateStr]["5"]["Data"] < 0)) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["5"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["5"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                            { dic["6"] ? ((table[dateStr]["6"] && (table[dateStr]["6"]["Data"] >= 0 || table[dateStr]["6"]["Data"] < 0)) ? ((dates[i] < this.props.date) ? <td className="before">{ table[dateStr]["6"]["Data"].toFixed(2)}</td> : <td className="after">{ table[dateStr]["6"]["Data"].toFixed(2)}</td>) : ((dates[i] < this.props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                        </tr>
                    )
                }
                var line = {};
                line["תאריך"] = dateStr;
                if(dic["1"] && (table[dateStr]["1"] > 0 || table[dateStr]["1"] <= 0)){
                    line["Oswestry Disability Index"] = table[dateStr]["1"];
                }
                if(dic["2"] && (table[dateStr]["2"] > 0 || table[dateStr]["2"] <= 0)){
                    line["Neck Disability Index"] = table[dateStr]["2"];
                }
                if(dic["3"] && (table[dateStr]["3"] > 0 || table[dateStr]["3"] <= 0)){
                    line["Lower Extremity Functional Scale"] = table[dateStr]["3"];
                }
                if(dic["4"] && (table[dateStr]["4"] > 0 || table[dateStr]["4"] <= 0)){
                    line["Oswestry low back pain"] = table[dateStr]["4"];
                }
                if(dic["5"] && (table[dateStr]["5"] > 0 || table[dateStr]["5"] <= 0)){
                    line["EQ-5D"] = table[dateStr]["5"];
                }
                if(dic["6"] && (table[dateStr]["6"] > 0 || table[dateStr]["6"] <= 0)){
                    line["EQ5D Number"] = table[dateStr]["6"];
                }
                exportCSV.push(line);
            }
        }
        return(
            <div>
                {this.props.ready ? <div>
                    <table style={{width: "100%"}} id="per">
                        <tbody>
                            <tr>
                                { this.props.data.length > 0 ? <th>תאריך</th> : null}
                                { dic["1"] ? <th>Oswestry Disability Index</th> : null }
                                { dic["2"] ? <th>Neck Disability Index</th> : null }
                                { dic["3"] ? <th>Lower Extremity Functional Scale</th> : null }
                                { dic["4"] ? <th>Oswestry low back pain</th> : null }
                                { dic["5"] ? <th>EQ-5D</th> : null }
                                { dic["6"] ? <th>EQ5D Number</th> : null }
                            </tr>
                            {arr}
                        </tbody>
                    </table>
                    <ExportCSV csvData={exportCSV} fileName={this.props.name + " שאלונים תקופתיים"}/>
                </div> : null}
            </div>
        )
    }
}

export default TablePer