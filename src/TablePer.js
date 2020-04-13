import React, {Component} from "react"
import "./Table.css"


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
                var date = new Date(data[i].data[j].ValidTime)
                var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
                if(table[dateStr] == null){
                    table[dateStr] = {};
                    dates.push(data[i].data[j].ValidTime);
                }
                table[dateStr][data[i].data[j].QuestionnaireID] = data[i].data[j].Score;
                dic[data[i].data[j].QuestionnaireID] = true;
            }
        }
        dates = dates.sort();
        this.state = {
            data: table,
            arr: dic,
            table: []
        }
        for(i = 0; i < dates.length; i++){
            date = new Date(dates[i])
            dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-');
            console.log(this.state.data[dateStr]["3"])

            this.state.table.push(
                <tr key={dateStr}>
                    <th>{dateStr}</th>
                    { this.state.arr["1"] ? (this.state.data[dateStr]["1"] >= 0 ? <th>{ this.state.data[dateStr]["1"]}</th> : <th>-</th>) : null }
                    { this.state.arr["2"] ? (this.state.data[dateStr]["2"] >= 0 ? <th>{ this.state.data[dateStr]["2"]}</th> : <th>-</th>) : null }
                    { this.state.arr["3"] ? (this.state.data[dateStr]["3"] >= 0 ? <th>{ this.state.data[dateStr]["3"]}</th> : <th>-</th>) : null }
                    { this.state.arr["4"] ? (this.state.data[dateStr]["4"] >= 0 ? <th>{ this.state.data[dateStr]["4"]}</th> : <th>-</th>) : null }
                </tr>
            )
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
                            { this.props.data.length > 0 ? <th>תאריך</th> : null}
                            { this.state.arr["1"] ? <th>Oswestry Disability Index</th> : null }
                            { this.state.arr["2"] ? <th>Neck Disability Index</th> : null }
                            { this.state.arr["3"] ? <th>Lower Extremity Functional Scale</th> : null }
                            { this.state.arr["4"] ? <th>Oswestry low back pain</th> : null }
                        </tr>
                        {this.state.table}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TablePer