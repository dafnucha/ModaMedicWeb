import React, {Component} from "react"
import "./DisplayButton.css"
import Table from "./Table"
import TableAns from "./TableAns"
import Graph from "./Graph"
import GraphAns from "./GraphAns"


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

        this.clean = function(arr){
            var tempDic = {};
            var temp = [];
            for(var i = 0; i < arr.length; i++){
                var date = new Date(arr[i].ValidTime)
                var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
                if(tempDic[dateStr] === undefined){
                    tempDic[dateStr] = arr[i];
                    temp.push(arr[i])
                }
            }
            return temp;
        }
        
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({graph: false, table:false, [name]: checked }) : this.setState({ [name]: value })
    }



    render() {
        var arrSteps, arrDis, arrCal, arrWeat;
        for(var i = 0; i < this.props.dataArr.length; i++){
            if(this.props.dataArr[i].name === "צעדים"){
                arrSteps = this.props.dataArr[i].values
            }
            else if(this.props.dataArr[i].name === "מרחק"){
                arrDis = this.props.dataArr[i].values
            }
            else if(this.props.dataArr[i].name === "קלוריות"){
                arrCal = this.props.dataArr[i].values;
            }
            else if(this.props.dataArr[i].name === "מזג האוויר"){
                arrWeat = this.props.dataArr[i].values
                console.log(arrWeat);
            }
        }
        return(
            <div>
                <div className="display">
                    { this.props.dataArr.length > 0 ? <div><div className="checkButton" id="cbRight">
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
                <br />
                { this.state.table ? <h3>מדדים</h3> : null }
                { this.state.table ? <Table dataArr={this.props.dataArr}
                    steps={this.props.steps}
                    distance={this.props.distance}
                    calories={this.props.calories}
                /> : null }
                <br />
                { this.state.table ? <h3>Oswerty Disability Index</h3> : null }
                { this.state.table ? <TableAns periodicAnswers={this.props.periodicAnswers}/> : null }
                { (this.state.graph && this.props.steps) ? <Graph data={arrSteps} name="צעדים"/> : null }
                { (this.state.graph && this.props.distance) ? <Graph data={arrDis} name="מרחק"/> : null }
                { (this.state.graph && this.props.calories) ? <Graph data={arrCal} name="קלוריות"/> : null }
                { (this.state.graph) ? <GraphAns data={this.props.periodicAnswers} name="Oswerty Disability Index"/> : null }
            </div>
        )
    }
}

export default DisplayButton