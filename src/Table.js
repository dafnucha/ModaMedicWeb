import React, {Component} from "react"
import "./Table.css"


class Table extends Component {
    constructor(props) {
        super()
        var i
        var arr = []
        
        for(i = 0; i < props.dataArr[0].values.length; i++){
            var date = new Date(props.dataArr[0].values[i].Timestamp)
            var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
            arr.push(
                <tr key={i}>
                    <th>{dateStr}</th>
                    { props.dataArr.length > 0 ? <th>{props.dataArr[0].values[i].Data}</th> : null }
                    { props.dataArr.length > 1 ? <th>{props.dataArr[1].values[i].Data}</th> : null }
                    { props.dataArr.length > 2 ? <th>{props.dataArr[2].values[i].Data}</th> : null }
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
                            { this.props.steps ? <th>צעדים</th> : null }
                            { this.props.distance ? <th>מרחק</th> : null }
                            { this.props.calories ? <th>קלוריות</th> : null }
                        </tr>
                        {this.state.table}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table