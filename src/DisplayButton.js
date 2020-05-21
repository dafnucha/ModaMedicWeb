import React, {Component} from "react"
import "./DisplayButton.css"
import Table from "./Table"
import TableAns from "./TableAns"
import Graph from "./Graph"
import TablePer from "./TablePer"
import SleepGraph from "./SleepGraph"
import GraphAns from "./GraphAns"
import PatientData from "./PatientData"


class DisplayButton extends Component {
    constructor(props) {
        super()
        this.state = {
            graph: true,
            table : false
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
        var arrSteps, arrDis, arrCal, arrWeat, arrSleep;
        var  arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [];
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
                if(this.props.dataArr[i].values.length && this.props.dataArr[i].values[0].Data && this.props.dataArr[i].values[0].Data.High){
                    for(var j = 0; j < this.props.dataArr[i].values.length; j++){
                        this.props.dataArr[i].values[j].Data = this.props.dataArr[i].values[j].Data.High;
                    }
                }
                arrWeat = this.props.dataArr[i].values;
            }
            else if(this.props.dataArr[i].name === "שעות שינה"){
                arrSleep = this.props.dataArr[i].values;
            }

        }
        
        for(i = 0; i < this.props.periodicAnswers.length; i++){
            if(this.props.periodicAnswers[i].QuestionnaireID === 1){
                arr1 = this.props.periodicAnswers[i].data;
                for(j = 0; j < arr1.length; j++){
                    arr1[j]["Data"] = arr1[j]["Score"];
                }
            }
            if(this.props.periodicAnswers[i].QuestionnaireID === 2){
                arr2 = this.props.periodicAnswers[i].data;
                for(j = 0; j < arr2.length; j++){
                    arr2[j]["Data"] = arr2[j]["Score"];
                }
            }
            if(this.props.periodicAnswers[i].QuestionnaireID === 3){
                arr3 = this.props.periodicAnswers[i].data;
                for(j = 0; j < arr3.length; j++){
                    arr3[j]["Data"] = arr3[j]["Score"];
                }
            }
            if(this.props.periodicAnswers[i].QuestionnaireID === 4){
                arr4 = this.props.periodicAnswers[i].data;
                for(j = 0; j < arr4.length; j++){
                    arr4[j]["Data"] = arr4[j]["Score"];
                }
            }
            if(this.props.periodicAnswers[i].QuestionnaireID === 5){
                arr5 = this.props.periodicAnswers[i].data;
                for(j = 0; j < arr5.length; j++){
                    arr5[j]["Data"] = arr5[j]["Score"];
                }
            }
            if(this.props.periodicAnswers[i].QuestionnaireID === 6){
                arr6 = this.props.periodicAnswers[i].data;
                for(j = 0; j < arr6.length; j++){
                    arr6[j]["Data"] = arr6[j]["Score"];
                }
            }
        }
        return(
            <div>
                <div className="display">
                    { (this.props.dataArr.length > 0 || this.props.dailyA.length > 0) ? <div><div className="checkButton" id="cbRight">
                    <label>
                        <input 
                            type="checkbox" 
                            value="1"
                            name="graph"
                            checked={this.state.graph}
                            onChange={this.handleChange}
                        />
                        <span>
                            <div id="text">
                                הצג מידע גרפי
                            </div>
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
                            <div id="text">
                                הצג מידע טבלאי  
                            </div>
                        </span>
                    </label>
                </div> </div> : null }
                </div>
                <br />
                <br />
                { ((this.state.graph || this.state.table) && this.props.ready) ? <PatientData user={this.props.user}/> : null}
                { (this.state.table && this.props.dataArr.length > 0 && this.props.ready) ? <h3>מדדים</h3> : null }
                { this.state.table ? <div className="ex1"><Table dataArr={this.props.dataArr}
                    steps={this.props.steps}
                    distance={this.props.distance}
                    calories={this.props.calories}
                    weather={this.props.weather}
                    sleep={this.props.sleep}
                    date={this.props.date}
                    showDaily={this.props.showDaily}
                    weekly={this.props.weekly}
                    monthly={this.props.monthly}
                    name={this.props.name}
                    ready={this.props.ready}
                /> </div>: null }
                <br />
                { (this.state.table && this.props.dailyQ && this.props.ready) ? <h3>שאלון יומי</h3> : null }
                { (this.state.table && this.props.dailyQ) ? <TableAns data={this.props.dailyA} 
                    date={this.props.date}
                    showDaily={this.props.showDaily}
                    weekly={this.props.weekly}
                    monthly={this.props.monthly}
                    name={this.props.name}
                    ready={this.props.ready}
                    /> : null }
                { (this.state.table && this.props.perQ && this.props.ready) ? <h3>שאלונים תקופתיים</h3> : null }
                { (this.state.table && this.props.perQ) ? <TablePer data={this.props.periodicAnswers} 
                    date={this.props.date}
                    showDaily={this.props.showDaily}
                    weekly={this.props.weekly}
                    monthly={this.props.monthly}
                    ready={this.props.ready}
                    name={this.props.name} />: null }
                { (this.state.graph && this.props.steps) ? <Graph data={arrSteps} date={this.props.date} name="צעדים" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                { (this.state.graph && this.props.distance) ? <Graph data={arrDis} date={this.props.date} name="מרחק" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                { (this.state.graph && this.props.calories) ? <Graph data={arrCal} date={this.props.date} name="קלוריות" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                { (this.state.graph && this.props.weather) ? <Graph data={arrWeat} date={this.props.date} name="מזג האוויר" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                { (this.state.graph && this.props.sleep) ? <SleepGraph data={arrSleep} date={this.props.date} name="שעות שינה" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                { (this.state.graph && this.props.dailyQ) ? <GraphAns data={this.props.dailyA} date={this.props.date} name="שאלון יומי" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                { (this.state.graph && arr1.length > 0 && this.props.perQ) ? <Graph data={arr1} date={this.props.date} name="Oswestry Disability Index" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                { (this.state.graph && arr2.length > 0 && this.props.perQ) ? <Graph data={arr2} date={this.props.date} name="Neck Disability Index" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                { (this.state.graph && arr3.length > 0 && this.props.perQ) ? <Graph data={arr3} date={this.props.date} name="Lower Extremity Functional Scale" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                { (this.state.graph && arr4.length > 0 && this.props.perQ) ? <Graph data={arr4} date={this.props.date} name="Oswestry low back pain" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                { (this.state.graph && arr5.length > 0 && this.props.perQ) ? <Graph data={arr5} date={this.props.date} name="EQ-5D" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                { (this.state.graph && arr6.length > 0 && this.props.perQ) ? <Graph data={arr6} date={this.props.date} name="EQ5D Number" showDaily={this.props.showDaily} weekly={this.props.weekly} monthly={this.props.monthly} ready={this.props.ready}/> : null }
                
            </div>
        )
    }
}

export default DisplayButton