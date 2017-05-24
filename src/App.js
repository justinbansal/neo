import React, { Component } from 'react';
import './App.css';
import Earth from './Earth';
import Scatterplot from './Scatterplot';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {data: []};
    
  }

  componentWillMount(){
    function buildUrls(num) {
      let urlArray = [];
      for(let i = 0; i < num-1; i++) {
        urlArray.push('https://api.nasa.gov/neo/rest/v1/neo/browse?page='+i+'&size=20&api_key=TOqTr8XlUvG8fx0OrgFe6iQVItOmD0JmQxgtos6Q');
      }
      return urlArray;
    }

    let data =[];
    let promiseArray = buildUrls(20).map((url) => axios.get(url));

    axios.all(promiseArray)
    .then((promises) => {
      let promiseData = promises.map((promise) => {
        return promise.data.near_earth_objects
      })
      let subData = promiseData.reduce((a,b) => {
        return a.concat(b)
      })
      data = subData.filter((obj)=>{
        return obj.is_potentially_hazardous_asteroid === true;
      })
      data = data.filter((obj) => {
        return obj.close_approach_data.length > 0
      })
      
      this.setState({
        data: data.map((obj, i)=> ({...obj, x: (obj.close_approach_data[0].miss_distance.kilometers / 1000000), y: Date.parse(obj.close_approach_data[0].close_approach_date), size: obj.estimated_diameter.kilometers.estimated_diameter_max}))
      });
    })
    .catch((error)=>{
      console.log(error);
    })
  }


  render() {
    return (
      <div className="App">
        <h1>Mapping the skies</h1>
        <h3>Near Earth Objects and their proximity to Earth</h3>
        <Scatterplot 
          data={this.state.data}/>
      </div>
    )
  }
}

export default App;
