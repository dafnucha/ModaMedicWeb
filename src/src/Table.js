import React, {Component} from "react"
import "./Table.css"


class Table extends Component {
    constructor(props) {
        super()
        this.state = {
            steps: props.steps
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
                            { this.props.steps.length > 0 ? <th>צעדים</th> : null }
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table