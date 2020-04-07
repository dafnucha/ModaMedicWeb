import React, {Component} from "react"
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import "./search.css"
import DisplayButton from './DisplayButton';

class Search extends Component {
    constructor() {
        super()
        this.state = {
            pName: "",
            fName: "",
            end_date: new Date(),
            start_date: new Date(),
            steps: false,
            distance : false,
            weather: false,
            calories: false,
            sleeping_hours: false,
            dataArr: [],
            periodicAnswers: [],
            showPopup: false,
            textPopup: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.selectUser = this.selectUser.bind(this);
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }

    async getRequest(name, url){
        let getUrl = 'http://icc.ise.bgu.ac.il/njsw03auth/doctors/metrics/' + url + '?FirstName=' + this.state.pName + '&LastName=' + this.state.fName;
            const response = await axios.get(
                getUrl,
                { 
                    headers: { 
                        'Content-Type': 'application/json',
                        'x-auth-token': sessionStorage.getItem("token")
                    } 
                }
            );
            return({
                values: response.data.data,
                name : name,
                numOfUsers: response.data.data.length
            });
    }

    selectUser(key){
        console.log(key);
        let arr = this.state.dataArr;
        for(var i = 0; i < arr.length; i++){
            let values = [];
            for(var j = 0; j < arr[i].values.length; j++){
                if(arr[i].values[j].UserID === key){
                    values = arr[i].values[j]
                }
            }
            arr[i].values = values;
        }
        this.setState({
            dataArr: arr
        })
        this.togglePopup();
    }

    async handleSubmit(event) {
        event.preventDefault()
        var numOfUsers = 0;
        var arr = []
        var  i = 0;
        if(this.state.steps){
            let response = await this.getRequest("צעדים", "getSteps")
            arr.push(response);
            if(response.numOfUsers > numOfUsers){
                numOfUsers = response.numOfUsers;
            }
        }
        if(this.state.distance){
            let response = await this.getRequest("מרחק", "getDistance")
            arr.push(response);
            if(response.numOfUsers > numOfUsers){
                numOfUsers = response.numOfUsers;
            }
        }
        if(this.state.calories){
            let response = await this.getRequest("קלוריות", "getCalories")
            arr.push(response);
            if(response.numOfUsers > numOfUsers){
                numOfUsers = response.numOfUsers;
            }
        }
        if(this.state.weather){
            let response = await this.getRequest("מזג האוויר", "getWeather")
            arr.push(response);
            if(response.numOfUsers > numOfUsers){
                numOfUsers = response.numOfUsers;
            }
        }
        if(numOfUsers === 1){
            for(i = 0; i < arr.length; i++){
                arr[i].values = arr[i].values[0];
            }
        }
        this.setState({dataArr : arr})
        if(numOfUsers > 1){
            var cards = [];
            for(i = 0; i < numOfUsers; i++){
                let x = arr[0].values[i].UserID;
                cards.push(
                    <Card className="card" key={arr[0].values[i].UserID}  onClick={() => this.selectUser(x)}>
                        <Card.Body className="cardBody">שם פרטי: {this.state.pName} </Card.Body>
                        <Card.Body className="cardBody">שם משפחה: {this.state.fName} </Card.Body>
                        <Card.Body className="cardBody">תז: {arr[0].values[i].UserID}</Card.Body>
                    </Card>
                );
            }
            this.setState({
                text: cards
            })
            this.togglePopup();
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="search">
                        <label className="lSearch" >
                                חפש מטופל:
                        </label>
                        <input className="iSearch"
                            id="pname"
                            type="text" 
                            name="pName"
                            value={this.state.pName} 
                            placeholder="שם פרטי" 
                            onChange={this.handleChange} 
                            required
                        />
                        <input className="iSearch"
                            id="fname"
                            type="text" 
                            name="fName"
                            value={this.state.fName} 
                            placeholder="שם משפחה" 
                            onChange={this.handleChange} 
                            required
                        />
                        <button className="bSearch"> 
                            חפש
                        </button>
                    </div>
                    <div className="dates">
                            <label className="cSearch">
                                בחר תאריכים מ
                            </label>
                            <input className="dSearch"
                                type="date"
                                name="start_date"
                                value={this.state.start_date} 
                                onChange={this.handleChange}
                                max="2020-01-09"
                            />
                            <label className="aSearch">
                                עד
                            </label>
                            <input className="dSearch"
                                type="date"
                                name="end_date"
                                value={this.state.end_date} 
                                onChange={this.handleChange}
                                max="2020-01-09"
                            />
                    </div>
                    <br />
                    <div className="mdd">
                        <label className="mLabel">
                                בחר מדדים
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="steps"
                            checked={this.state.steps}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            צעדים
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="distance"
                            checked={this.state.distance}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            מרחק
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="weather"
                            checked={this.state.weather}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            מזג האוויר
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="calories"
                            checked={this.state.calories}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            קלוריות
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="sleeping_hours"
                            checked={this.state.sleeping_hours}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
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
                {this.state.showPopup ? 
                    <Popup
                        text={this.state.text}
                    /> : null
                }
            </div>
        )
    }
}

export default Search

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
            <div className='popup_inner' >
                <h4>:אנא בחר מבין הרשומות הבאות</h4>
                {this.props.text}
            </div>
        </div>
      );
    }
  }
