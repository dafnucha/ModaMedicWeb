import React, {Component} from "react"
import "./Table.css"


class Table extends Component {
    constructor(props) {
        super()
        var table = {};
        var i, j;
        var dates = []
        for(i = 0; i < props.dataArr.length; i++){
            for(j = 0; j < props.dataArr[i].values.length; j++){
                var date = new Date(props.dataArr[i].values[j].ValidTime)
                var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
                if(table[dateStr] == null){
                    table[dateStr] = {};
                    dates.push(props.dataArr[i].values[j].ValidTime);
                }
                var name = "";
                if(props.dataArr[i].name === "צעדים"){
                    name = "steps";
                }
                else if(props.dataArr[i].name === "מרחק"){
                    name = "distance";
                }
                else if(props.dataArr[i].name === "קלוריות"){
                    name = "calories";
                }
                else if(props.dataArr[i].name === "מזג האוויר"){
                    name = "weather";
                }
                else if(props.dataArr[i].name === "שעות שינה"){
                    var deep = 0, light = 0, total = 0;
                    for(var k = 0; k < props.dataArr[i].values[j]["Data"].length; k++){
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
                    table[dateStr]["light"] = light;
                    table[dateStr]["deep"] = deep;
                    table[dateStr]["total"] = total;
                    continue;
                }
                table[dateStr][name] = props.dataArr[i].values[j];
            }
        }
        dates = dates.sort();
        this.state = {
            steps: props.steps,
            distance : props.distance,
            calories: props.calories,
            weather: props.weather,
            sleep: props.sleep,
            data: table
        }
        var arr = []
        for(i = 0; i < dates.length; i++){
            date = new Date(dates[i])
            dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
            arr.push(
                <tr key={dateStr}>
                    <th>{dateStr}</th>
                    { this.state.steps ? (this.state.data[dateStr]["steps"] ? <th>{ this.state.data[dateStr]["steps"]["Data"].toFixed(2)}</th> : <th>-</th> ) : null}
                    { this.state.distance ? (this.state.data[dateStr]["distance"] ? <th>{ this.state.data[dateStr]["distance"]["Data"].toFixed(2)}</th> : <th>-</th>) : null }
                    { this.state.calories ? (this.state.data[dateStr]["calories"] ? <th>{ this.state.data[dateStr]["calories"]["Data"].toFixed(2)}</th> : <th>-</th>) : null }
                    { this.state.weather ? (this.state.data[dateStr]["weather"] ? <th>{ this.state.data[dateStr]["weather"]["Data"].toFixed(2)}</th> : <th>-</th>) : null }
                    { this.state.sleep ? (this.state.data[dateStr]["light"] ? <th>{ this.state.data[dateStr]["light"].toFixed(2)}</th> : <th>-</th>) : null }
                    { this.state.sleep ? (this.state.data[dateStr]["deep"] ? <th>{ this.state.data[dateStr]["deep"].toFixed(2)}</th> : <th>-</th>) : null }
                    { this.state.sleep ? (this.state.data[dateStr]["total"] ? <th>{ this.state.data[dateStr]["total"].toFixed(2)}</th> : <th>-</th>) : null }
                </tr>
            )
        }
        this.state = {
            table: arr
        }
        this.styleLabel = {
            fontSize: "calc(10px)",
            color: "black",
            margin: "2vmin 2vmin 2vmin 2vmin"
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({[name]: checked }) : this.setState({ [name]: value })
    }
    
    


    render() {
        return(
            <div>
                <table style={{width: "100%"}}>
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
                        {this.state.table}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table