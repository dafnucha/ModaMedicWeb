import React, {Component} from "react"
import "./DisplayButton.css"
import Table from "./Table"


class DisplayButton extends Component {
    constructor(props) {
        super()
        this.state = {
            graph: false,
            table : false,
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
        type === "checkbox" ? this.setState({graph: false, table:false, [name]: checked }) : this.setState({ [name]: value })
    }



    render() {
        return(
            <div>
                <div className="display">
                    { this.props.steps.length > 0 ? <div><div className="checkButton" id="cbRight">
                    <label>
                        <input 
                            type="checkbox" 
                            value="1"
                            name="graph"
                            checked={this.state.graph}
                            onChange={this.handleChange}
                        />
                        <span>
                            הצג מידע גרפי
                        </span>
                    </label>
                </div>
                <div className="checkButton" id="cbLeft">
                    <label>
                        <input 
                            type="checkbox" 
                            value="1"
                            name="table"
                            checked={this.state.table}
                            onChange={this.handleChange}
                        />
                        <span>
                            הצג מידע טבלאי
                        </span>
                    </label>
                </div> </div> : null }
                </div>
                <br />
                { this.state.table ? <Table steps={this.props.steps}/> : null }
            </div>
        )
    }
}

export default DisplayButton