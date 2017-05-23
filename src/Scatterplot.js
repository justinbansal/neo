import React from 'react'
import {Hint, MarkSeries, YAxis, XAxis, XYPlot, HorizontalGridLines, VerticalGridLines} from 'react-vis';

class Scatterplot extends React.Component{
    constructor() {
        super();
        this.state = {
            value: null
        }
        this.rememberValue = this.rememberValue.bind(this);
        this.forgetValue = this.forgetValue.bind(this);
    }

    rememberValue(value) {
        this.setState({
            value:value
        })
    }

    forgetValue(){
        this.setState({
            value:null
        })
    }

    render() {
        let data = this.props.data;
        let value = this.state.value;
        console.log(data);
        return (
            <div>
            <XYPlot width={1400}
                    height={500}
                    margin={{left: 50, right: 150, top: 50}}
                    // xDomain={[0,100000]}
                    yDomain={[new Date(1900, 1, 1),new Date().getTime()]}
                    yType="time"
                    >
                <XAxis 
                    
                    title="Distance in 1,000 kilometers"
                    />
                <YAxis 
                    title="Date"
                />
                <HorizontalGridLines />
                <VerticalGridLines />
                <MarkSeries 
                    data={data}
                    onValueMouseOver={this.rememberValue}
                    onValueMouseOut={this.forgetValue}
                    />
                {
                    value ? <Hint value={value}>
                                <div>
                                    <h3>{value.name}</h3>
                                    <p>Potentially hazardous:{value.is_potentially_hazardous_asteroid}</p>
                                    <a href={value.nasa_jpl_url}><p>Link for more info</p></a>
                                </div>
                            </Hint> : null
                }
            </XYPlot>
            </div>
        )
    }
}

export default Scatterplot;