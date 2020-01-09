import React, {Component} from "react"
//import LineChart from 'react-linechart';
import { LineChart} from 'react-chartkick'
import 'chart.js'

class GraphAns extends Component {
    constructor(props) {
        super()
        this.state = {
           
        }
        this.handleChange = this.handleChange.bind(this)
        this.sort_by_key = function(array, key)
        {
         return array.sort(function(a, b)
         {
          var x = a[key]; var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
         });
        }
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({[name]: checked }) : this.setState({ [name]: value })
    }
    



    render() {
        var data = this.sort_by_key(this.props.data, "ValidDate")
        var points = {}
        for(var i = 0; i < data.length; i++){
            var date = new Date(data[i].ValidDate)
            var dateStr = date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}).replace(/ /g, '-')
            points[dateStr] = data[i].Score
        }
        
		return (
            <div>
                <div className="App">
                    <h1>{this.props.name}</h1>
                    <LineChart data={points} min={0} />
                </div>	
            </div>
        )
    }
}

export default GraphAns