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
        // let markSeriesJSX = data.map((obj,i) => {
        //     return <MarkSeries 
        //         data={obj[i]}
        //         size={obj[i].estimated_diameter.kilometers.estimated_diameter_max*10}/>
        // })
        return (
            <div>
            <XYPlot width={1000}
                    height={900}
                    xDomain={[0,100000]}
                    yDomain={[new Date(1900, 1, 1),new Date().getTime()]}
                    yType="time"
                    >
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis 
                    // bottom={0}
                    orientation="bottom"
                    title="Distance in 1,000 kilometers"
                    />
                <YAxis 
                    title="Date"
                    orientation="left"
                />
                <MarkSeries 
                    data={data}
                    onValueMouseOver={this.rememberValue}
                    onValueMouseOut={this.forgetValue}
                    />
                {
                    value ? <Hint value={value}><div><p>{value.name}</p></div> </Hint> : null
                }
            </XYPlot>
            </div>
        )
    }
}

export default Scatterplot;