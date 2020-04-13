import React, {Component} from "react"
import "./Table.css"


class TableAns extends Component {
    constructor(props) {
        super()
        var i
        var arr = []
        //var dates = []
        let data = props.data;
        for(i = 0; i < data.length; i++){
            //dates.push(data[i].ValidTime)
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
                    <th>{dateStr}</th>
                    <th>{data[i]["Answers"][0]["AnswerID"][0]}</th>
                    <th>{text}</th>
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
        this.handleChange = this.handleChange.bind(this)

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
                            <th>תאריך</th>
                            <th>רמת כאב</th>
                            <th>תרופה</th>
                        </tr>
                        {this.state.table}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TableAns