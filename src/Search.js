import React, {Component} from "react"
import "./search.css"
import DisplayButton from './DisplayButton';
//import axios from 'axios'

class Search extends Component {
    constructor() {
        super()
        this.state = {
            searchValue: "",
            end_date: new Date(),
            start_date: new Date(),
            steps: false,
            distance : false,
            weather: false,
            calories: false,
            sleeping_hours: false,
            light_sleep: false,
            dataArr: []
        }
        this.styleLabel = {
            fontSize: "calc(10px)",
            color: "black",
            margin: "2vmin 2vmin 2vmin 2vmin"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }

    async handleSubmit(event) {
        event.preventDefault()
        var arr = []
        
        if(this.state.steps){
            const response = await fetch("http://localhost:3000/metrics/getSteps"/*+this.state.searchValue*/)
            // We get the API response and receive data in JSON format...
            const json = await response.json();
            // ...then we update the users state
            arr.push({
                values: json.data,
                name : "צעדים"
            })
        }
        if(this.state.distance){
            const response = await fetch("http://localhost:3000/metrics/getDistance"/*+this.state.searchValue*/)
            // We get the API response and receive data in JSON format...
            const json = await response.json();
            // ...then we update the users state
            arr.push({
                values: json.data,
                name : "מרחק"
            })
        }
        if(this.state.calories){
            const response = await fetch("http://localhost:3000/metrics/getCalories"/*+this.state.searchValue*/)
            // We get the API response and receive data in JSON format...
            const json = await response.json();
            // ...then we update the users state
            arr.push({
                values: json.data,
                name : "קלוריות"
            })
        }
        this.setState({dataArr : arr})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <button>
                            חפש
                        </button>
                        <input 
                            type="text" 
                            name="searchValue"
                            value={this.state.searchValue} 
                            placeholder="תעודת זהות מטופל" 
                            style={{textAlign:"right"}} 
                            onChange={this.handleChange} 
                            required
                        />
                        <label style={this.styleLabel}>
                                :חפש מטופל
                        </label>
                    </div>
                    <div className="dates">
                        <div className="date">
                            <input 
                                type="date"
                                name="start_date"
                                value={this.state.start_date} 
                                onChange={this.handleChange}
                                max="2020-01-09"
                            />
                            <label style={this.styleLabel}>
                                עד
                            </label>
                        </div>
                        <div className="date">
                            <input 
                                type="date"
                                name="end_date"
                                value={this.state.end_date} 
                                onChange={this.handleChange}
                                max="2020-01-09"
                            />
                            <label style={this.styleLabel}>
                                בחר תאריכים מ
                            </label>
                        </div>
                    </div>
                    <br />
                    <div className="mdd">
                        <div className="matrix">
                            <label style={this.styleLabel}>
                                צעדים
                                <input 
                                    type="checkbox" 
                                    name="steps"
                                    checked={this.state.steps}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className="matrix">
                            <label style={this.styleLabel}>
                                מרחק
                                <input 
                                    type="checkbox" 
                                    name="distance"
                                    checked={this.state.distance}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className="matrix">
                            <label style={this.styleLabel}>
                                מזג האוויר
                                <input 
                                    type="checkbox" 
                                    name="weather"
                                    checked={this.state.weather}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className="matrix">
                            <label style={this.styleLabel}>
                                קלוריות
                                <input 
                                    type="checkbox" 
                                    name="calories"
                                    checked={this.state.calories}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className="matrix">
                            <label style={this.styleLabel}>
                                שעות שינה
                                <input 
                                    type="checkbox" 
                                    name="sleeping_hours"
                                    checked={this.state.sleeping_hours}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className="matrix">
                            <label style={this.styleLabel}>
                                שינה קלה
                                <input 
                                    type="checkbox" 
                                    name="light_sleep"
                                    checked={this.state.light_sleep}
                                    onChange={this.handleChange}
                                />
                            </label>
                            
                        </div>
                        <label style={this.styleLabel}>
                                בחר מדדים
                        </label>
                    </div>

                </form>
                <br />
                <DisplayButton 
                    dataArr={this.state.dataArr} 
                    steps={this.state.steps}
                    distance={this.state.distance}
                    calories={this.state.calories}
                />
            </div>
        )
    }
}

export default Search
