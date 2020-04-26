import React, {Component} from "react"
//import "./TablePer.css"


class TablePer extends Component {
    constructor(props) {
        super()
        var table = {};
        var data = props.data;
        var i, j;
        var dates = [];
        var dic = {};
        for(i = 0; i < data.length; i++){
            for(j = 0; j < data[i].data.length; j++){
                if(props.showDaily){
                    var date = new Date(data[i].data[j].ValidTime)
                    var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
                    if(table[dateStr] == null){
                        table[dateStr] = {};
                        dates.push(data[i].data[j].ValidTime);
                    }
                    table[dateStr][data[i].data[j].QuestionnaireID] = data[i].data[j].Score;
                    dic[data[i].data[j].QuestionnaireID] = true;
                }
                else if(props.weekly){
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
                else if(props.monthly){
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
        this.state = {
            data: table,
            arr: dic,
            table: [],
            dates: dates
        }
        if(props.weekly || props.monthly){
            for (let [key,] of Object.entries(this.state.data)) {
                for (let [key1,] of Object.entries(this.state.data[key])) {
                    this.state.data[key][key1]["Data"] = this.state.data[key][key1]["sum"] / this.state.data[key][key1]["counter"];
                }
            }
        }
        for(i = 0; i < dates.length; i++){
            date = new Date(dates[i])
            dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
            if(props.showDaily){
                this.state.table.push(
                    <tr key={dateStr}>
                        {(this.state.dates[i] < props.date) ? <td className="before">{dateStr}</td> : <td className="after">{dateStr}</td>}
                        { this.state.arr["1"] ? ((this.state.data[dateStr]["1"] >= 0 || this.state.data[dateStr]["1"] < 0) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["1"]}</td> : <td className="after">{ this.state.data[dateStr]["1"]}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                        { this.state.arr["2"] ? ((this.state.data[dateStr]["2"] >= 0 || this.state.data[dateStr]["2"] < 0) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["2"]}</td> : <td className="after">{ this.state.data[dateStr]["2"]}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                        { this.state.arr["3"] ? ((this.state.data[dateStr]["3"] >= 0 || this.state.data[dateStr]["3"] < 0) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["3"]}</td> : <td className="after">{ this.state.data[dateStr]["3"]}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                        { this.state.arr["4"] ? ((this.state.data[dateStr]["4"] >= 0 || this.state.data[dateStr]["4"] < 0) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["4"]}</td> : <td className="after">{ this.state.data[dateStr]["4"]}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                        { this.state.arr["5"] ? ((this.state.data[dateStr]["5"] >= 0 || this.state.data[dateStr]["5"] < 0) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["5"]}</td> : <td className="after">{ this.state.data[dateStr]["5"]}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                        { this.state.arr["6"] ? ((this.state.data[dateStr]["6"] >= 0 || this.state.data[dateStr]["6"] < 0) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["6"]}</td> : <td className="after">{ this.state.data[dateStr]["6"]}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
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
                this.state.table.push(
                    <tr key={dateStr}>
                        {(this.state.dates[i] < props.date) ? <td className="before">{dateStr}</td> : <td className="after">{dateStr}</td>}
                        { this.state.arr["1"] ? ((this.state.data[dateStr]["1"] && (this.state.data[dateStr]["1"]["Data"] >= 0 || this.state.data[dateStr]["1"]["Data"] < 0)) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["1"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["1"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                        { this.state.arr["2"] ? ((this.state.data[dateStr]["2"] && (this.state.data[dateStr]["2"]["Data"] >= 0 || this.state.data[dateStr]["2"]["Data"] < 0)) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["2"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["2"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                        { this.state.arr["3"] ? ((this.state.data[dateStr]["3"] && (this.state.data[dateStr]["3"]["Data"] >= 0 || this.state.data[dateStr]["3"]["Data"] < 0)) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["3"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["3"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                        { this.state.arr["4"] ? ((this.state.data[dateStr]["4"] && (this.state.data[dateStr]["4"]["Data"] >= 0 || this.state.data[dateStr]["4"]["Data"] < 0)) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["4"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["4"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                        { this.state.arr["5"] ? ((this.state.data[dateStr]["5"] && (this.state.data[dateStr]["5"]["Data"] >= 0 || this.state.data[dateStr]["5"]["Data"] < 0)) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["5"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["5"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                        { this.state.arr["6"] ? ((this.state.data[dateStr]["6"] && (this.state.data[dateStr]["6"]["Data"] >= 0 || this.state.data[dateStr]["6"]["Data"] < 0)) ? ((this.state.dates[i] < props.date) ? <td className="before">{ this.state.data[dateStr]["6"]["Data"].toFixed(2)}</td> : <td className="after">{ this.state.data[dateStr]["6"]["Data"].toFixed(2)}</td>) : ((this.state.dates[i] < props.date) ? <td className="before">-</td> : <td className="after">-</td>)) : null }
                    </tr>
                )
            }
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
        require("./Table.css");
        return(
            <div>
                <table style={{width: "100%"}} id="per">
                    <tbody>
                        <tr>
                            { this.props.data.length > 0 ? <th>תאריך</th> : null}
                            { this.state.arr["1"] ? <th>Oswestry Disability Index</th> : null }
                            { this.state.arr["2"] ? <th>Neck Disability Index</th> : null }
                            { this.state.arr["3"] ? <th>Lower Extremity Functional Scale</th> : null }
                            { this.state.arr["4"] ? <th>Oswestry low back pain</th> : null }
                            { this.state.arr["5"] ? <th>EQ-5D</th> : null }
                            { this.state.arr["6"] ? <th>EQ5D Number</th> : null }
                        </tr>
                        {this.state.table}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TablePer