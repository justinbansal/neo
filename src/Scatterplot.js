import React from 'react'
import {MarkSeries, YAxis, XAxis, XYPlot, HorizontalGridLines, VerticalGridLines} from 'react-vis';

class Scatterplot extends React.Component{
    constructor() {
        super();
    }

    render() {
        let data = this.props.data;
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
                    xDomain={[-1000,1000]}
                    yDomain={[new Date(1900, 1, 1),new Date().getTime()]}
                    yType="time"
                    >
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis 
                    top={0}/>
                <YAxis />
                <MarkSeries 
                    data={data}/>
            </XYPlot>
            </div>
        )
    }
}

export default Scatterplot;