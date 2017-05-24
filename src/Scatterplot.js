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
        let xArray = data.map((obj) => {return obj.x});
        console.log(xArray);
        let yArray = data.map((obj) => {return obj.y});
        let maxX = Math.max.apply(null, xArray);
        let minY = Math.min.apply(null, yArray);
        console.log(maxX);
        console.log(minY);
        // console.log(data);
        return (
            <div>
            <XYPlot width={1400}
                    height={500}
                    margin={{left: 50, right: 200, top: 50}}
                    xDomain={[0, maxX ]}
                    yDomain={[minY, new Date().getTime()]}
                    yType="time"
                    >
                <XAxis 
                    title={"Distance from Earth in 1,000,000 km"}
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
                                    <p>{value.size} kilometers in diameter</p>
                                    <p>{value.x} million km from Earth</p>
                                </div>
                            </Hint> : null
                }
            </XYPlot>
            </div>
        )
    }
}

export default Scatterplot;