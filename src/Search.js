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
            dataArr: [],
            periodicAnswers: []
        }
        this.styleLabel = {

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
        console.log(name);
    }

    async handleSubmit(event) {
        event.preventDefault()
        var arr = []
        let config = {
            method: 'GET',
            headers: {
                'x-auth-token': sessionStorage.getItem("token")
            },
            body:{
                "UserID": this.state.searchValue
            }
        }
        if(this.state.steps){
            const response = await fetch("http://icc.ise.bgu.ac.il/njsw03auth/doctors/metrics/getSteps?UserID=111111111", config)
            // We get the API response and receive data in JSON format...
            const json = await response.json();
            // ...then we update the users state
            console.log(json.data);
            arr.push({
                values: json.data,
                name : "צעדים"
            })
        }
        if(this.state.distance){
            const response = await fetch("http://icc.ise.bgu.ac.il/njsw03metrics/getDistance?UserID=111111111"/*+this.state.searchValue*/)
            // We get the API response and receive data in JSON format...
            const json = await response.json();
            // ...then we update the users state
            arr.push({
                values: json.data,
                name : "מרחק"
            })
        }
        if(this.state.calories){
            const response = await fetch("http://icc.ise.bgu.ac.il/njsw03metrics/getCalories?UserID=111111111"/*+this.state.searchValue*/)
            // We get the API response and receive data in JSON format...
            const json = await response.json();
            // ...then we update the users state
            arr.push({
                values: json.data,
                name : "קלוריות"
            })
        }
        if(this.state.weather){
            const response = await fetch("http://icc.ise.bgu.ac.il/njsw03metrics/getWeather?UserID=111111111"/*+this.state.searchValue*/)
            // We get the API response and receive data in JSON format...
            const json = await response.json();
            // ...then we update the users state
            for( var j = 0; j <json.data.length; j++){
                json.data[j].Data = json.data[j].Data.High;
            }
            arr.push({
                values: json.data,
                name : "מזג האוויר"
            })
            
        }
        /*
        const response = await fetch("http://localhost:3000/answers/getPeriodicAnswers/"+this.state.searchValue+"/1")
        // We get the API response and receive data in JSON format...
        const json = await response.json();
        // ...then we update the users state
        
        this.setState({periodicAnswers : json.data})
        */
        this.setState({dataArr : arr})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="search">
                        <label id="lSearch" >
                                חפש מטופל:
                        </label>
                        <input id="iSearch"
                            type="text" 
                            name="searchValue"
                            value={this.state.searchValue} 
                            placeholder="תעודת זהות מטופל" 
                            style={{textAlign:"right"}} 
                            onChange={this.handleChange} 
                            required
                        />
                        <button id="bSearch"> 
                            חפש
                        </button>
                    </div>
                    <div className="dates">
                            <label id="cSearch">
                                בחר תאריכים מ
                            </label>
                            <input id="dSearch"
                                type="date"
                                name="start_date"
                                value={this.state.start_date} 
                                onChange={this.handleChange}
                                max="2020-01-09"
                            />
                            <label id="aSearch">
                                עד
                            </label>
                            <input id="dSearch"
                                type="date"
                                name="end_date"
                                value={this.state.end_date} 
                                onChange={this.handleChange}
                                max="2020-01-09"
                            />
                    </div>
                    <br />
                    <div className="mdd">
                        <label id="mLabel">
                                בחר מדדים
                        </label>
                        <input id="cInput"
                            type="checkbox" 
                            name="steps"
                            checked={this.state.steps}
                            onChange={this.handleChange}
                        />
                        <label id="mLabel">
                            צעדים
                        </label>
                        <input id="cInput"
                            type="checkbox" 
                            name="distance"
                            checked={this.state.distance}
                            onChange={this.handleChange}
                        />
                        <label id="mLabel">
                            מרחק
                        </label>
                        <input id="cInput"
                            type="checkbox" 
                            name="weather"
                            checked={this.state.weather}
                            onChange={this.handleChange}
                        />
                        <label id="mLabel">
                            מזג האוויר
                        </label>
                        <input id="cInput"
                            type="checkbox" 
                            name="calories"
                            checked={this.state.calories}
                            onChange={this.handleChange}
                        />
                        <label id="mLabel">
                            קלוריות
                        </label>
                        <input id="cInput"
                            type="checkbox" 
                            name="sleeping_hours"
                            checked={this.state.sleeping_hours}
                            onChange={this.handleChange}
                        />
                        <label id="mLabel">
                            שעות שינה
                        </label>
                    </div>
                </form>
                <br />
                <DisplayButton 
                    dataArr={this.state.dataArr} 
                    steps={this.state.steps}
                    distance={this.state.distance}
                    calories={this.state.calories}
                    periodicAnswers={this.state.periodicAnswers}
                />
            </div>
        )
    }
}

export default Search
