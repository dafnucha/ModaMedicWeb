import React, {Component} from "react"
import {ExportCSV} from "./ExportCSV"
import "./Table.css"


class TableAns extends Component {
    constructor(props) {
        super()
        var i
        var arr = []
        var dates = []
        let data = props.data;
        var table = {};
        var exportCSV = [];
        for(i = 0; i < data.length; i++){
            if(props.showDaily){
                var date = new Date(data[i].ValidTime);
                var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
                var text = "";
                for(var j = 0 ; j < data[i]["Answers"][1]["AnswerID"].length; j++){
                    if(data[i]["Answers"][1]["AnswerID"][j] === 0){
                        text = text + "לא נטלתי, "
                    }
                    else if(data[i]["Answers"][1]["AnswerID"][j] === 1){
                        text = text + "בסיסית, "
                    }
                    else if(data[i]["Answers"][1]["AnswerID"][j] === 2){
                        text = text + "מתקדמת, "
                    }
                    else if(data[i]["Answers"][1]["AnswerID"][j] === 3){
                        text = text + "נרקוטית, "
                    }
                }
                text = text.slice(0, -2);
                arr.push(
                    <tr key={i}>
                        {(data[i].ValidTime < props.date) ? <td className="before">{dateStr}</td> : <td className="after">{dateStr}</td>}
                        {(data[i].ValidTime < props.date) ? <td className="before">{data[i]["Answers"][0]["AnswerID"][0]}</td> : <td className="after">{data[i]["Answers"][0]["AnswerID"][0]}</td>}
                        {(data[i].ValidTime < props.date) ? <td className="before">{text}</td> : <td className="after">{text}</td>}
                    </tr>
                )
                var line = {};
                line["תאריך"] = dateStr;
                line["רמת כאב"] = data[i]["Answers"][0]["AnswerID"][0];
                line["תרופה"] = text;
                exportCSV.push(line);
            }
            else if(props.weekly){
                date = new Date(data[i].ValidTime)
                var dayOfWeek = date.getDay();
                var sunday = new Date(data[i].ValidTime - dayOfWeek * 86400000);
                var saturday = new Date(sunday.getTime() + 518400000);
                dateStr = sunday.toLocaleDateString('en-GB', {day: 'numeric'}) + "-" + saturday.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
                if(table[dateStr] == null){
                    table[dateStr] = {};
                    table[dateStr]["sum"] = 0;
                    table[dateStr]["counter"] = 0;
                    table[dateStr]["text"] = "";
                    dates.push(data[i].ValidTime);
                }
                table[dateStr]["sum"] += data[i]["Answers"][0]["AnswerID"][0];
                table[dateStr]["counter"]++;
                for(j = 0 ; j < data[i]["Answers"][1]["AnswerID"].length; j++){
                    if(!table[dateStr]["text"].includes("לא נטלתי") && data[i]["Answers"][1]["AnswerID"][j] === 0){
                        table[dateStr]["text"] += "לא נטלתי, "
                    }
                    else if(!table[dateStr]["text"].includes("בסיסית") && data[i]["Answers"][1]["AnswerID"][j] === 1){
                        table[dateStr]["text"] += "בסיסית, "
                    }
                    else if(!table[dateStr]["text"].includes("מתקדמת") && data[i]["Answers"][1]["AnswerID"][j] === 2){
                        table[dateStr]["text"] += "מתקדמת, "
                    }
                    else if(!table[dateStr]["text"].includes("נרקוטית") && data[i]["Answers"][1]["AnswerID"][j] === 3){
                        table[dateStr]["text"] += "נרקוטית, "
                    }
                }
                
            }
            else if(props.monthly){
                date = new Date(data[i].ValidTime)
                dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                if(table[dateStr] == null){
                    table[dateStr] = {};
                    table[dateStr]["sum"] = 0;
                    table[dateStr]["counter"] = 0;
                    table[dateStr]["text"] = "";
                    dates.push(data[i].ValidTime);
                }
                table[dateStr]["sum"] += data[i]["Answers"][0]["AnswerID"][0];
                table[dateStr]["counter"]++;
                table[dateStr]["sum"] += data[i]["Answers"][0]["AnswerID"][0];
                table[dateStr]["counter"]++;
                for(j = 0 ; j < data[i]["Answers"][1]["AnswerID"].length; j++){
                    if(!table[dateStr]["text"].includes("לא נטלתי") && data[i]["Answers"][1]["AnswerID"][j] === 0){
                        table[dateStr]["text"] += "לא נטלתי, "
                    }
                    else if(!table[dateStr]["text"].includes("בסיסית") && data[i]["Answers"][1]["AnswerID"][j] === 1){
                        table[dateStr]["text"] += "בסיסית, "
                    }
                    else if(!table[dateStr]["text"].includes("מתקדמת") && data[i]["Answers"][1]["AnswerID"][j] === 2){
                        table[dateStr]["text"] += "מתקדמת, "
                    }
                    else if(!table[dateStr]["text"].includes("נרקוטית") && data[i]["Answers"][1]["AnswerID"][j] === 3){
                        table[dateStr]["text"] += "נרקוטית, "
                    }
                }
            }
            
        }
        dates = dates.sort();
        this.state = {
            table: arr,
            data: table,
            dates: dates,
            exportCSV: exportCSV
        }
        if(props.weekly || props.monthly){
            for (let [key,] of Object.entries(this.state.data)) {
                this.state.data[key]["Data"] = this.state.data[key]["sum"] / this.state.data[key]["counter"];
            }
            for(i = 0; i < dates.length; i++){
                date = new Date(dates[i]);
                if(props.weekly){
                    dayOfWeek = date.getDay();
                    sunday = new Date(date.getTime() - dayOfWeek * 86400000);
                    saturday = new Date(sunday.getTime() + 518400000);
                    dateStr = sunday.toLocaleDateString('en-GB', {day: 'numeric'}) + "-" + saturday.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
                }
                else{
                    dateStr = date.toLocaleDateString('en-GB', {month: 'short'});
                }
                table[dateStr]["text"] =  table[dateStr]["text"].slice(0, -2);
                this.state.table.push(
                    <tr key={dateStr}>
                        {(data[i].ValidTime < props.date) ? <td className="before">{dateStr}</td> : <td className="after">{dateStr}</td>}
                        {(data[i].ValidTime < props.date) ? <td className="before">{this.state.data[dateStr]["Data"].toFixed(2)}</td> : <td className="after">{this.state.data[dateStr]["Data"].toFixed(2)}</td>}
                        {(data[i].ValidTime < props.date) ? <td className="before">{table[dateStr]["text"]}</td> : <td className="after">{table[dateStr]["text"]}</td>}
                    </tr>
                )
                line = {};
                line["תאריך"] = dateStr;
                line["רמת כאב"] = this.state.data[dateStr];
                //line["תרופה"] = text;
                this.state.exportCSV.push(line);
            }
        }
        this.styleLabel = {
            fontSize: "calc(10px)",
            color: "black",
            margin: "2vmin 2vmin 2vmin 2vmin"
        }
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({[name]: checked }) : this.setState({ [name]: value })
    }
    
    


    render() {
        return(
            <div className="center">
                <table style={{width: "100%"}} id="daily" className="tabels">
                    <tbody>
                        <tr>
                            <th>תאריך</th>
                            <th>רמת כאב</th>
                            {this.props.showDaily ? <th>תרופה</th> : <th>תרופות שהיו בשימוש</th>}
                        </tr>
                        {this.state.table}
                    </tbody>
                </table>
                <ExportCSV csvData={this.state.exportCSV} fileName={this.props.name + " שאלון יומי"}/>
            </div>
        )
    }
}

export default TableAns