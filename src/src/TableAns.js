import React, {Component} from "react"
import "./Table.css"


class TableAns extends Component {
    constructor(props) {
        super()
        var i
        var arr = []
        
        for(i = 0; i < props.periodicAnswers.length; i++){
            var date = new Date(props.periodicAnswers[i].ValidDate)
            var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
            arr.push(
                <tr key={i}>
                    <th>{dateStr}</th>
                    <th>{props.periodicAnswers[i].Score}</th>
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
                            <th>ציון</th>
                        </tr>
                        {this.state.table}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TableAns