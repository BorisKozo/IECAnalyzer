import {HighchartsReact, HighchartsReactProps} from "highcharts-react-official";
import * as Highcharts from "highcharts";
import React from "react";
import {IDataNode} from "./utils";

const chartDefaultOptions:Highcharts.Options = {
    chart: {
        zooming: {
            type: 'x'
        },
        panning: {
            enabled:true
        },
        panKey: 'shift'
    },
    title: {
        text: 'Electricity usage over time',
        align: 'left'
    },
    subtitle: {
            text: 'Click and drag to zoom in. Hold down shift key to pan.',
            align: 'left'
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'Watt'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        line: {
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    }
};

interface IFullChartProps {
    dataNodes:IDataNode[];
}

function FullChart({dataNodes}:IFullChartProps){

    const data: [number, number][] = dataNodes.map((dataNode) => {
        return [dataNode.fullDate, dataNode.value];
    });


    const options = {
        ...chartDefaultOptions,
        series: [{
            type: 'line',
            name: 'W',
            data: data
        }],
    }

    return <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
}

export default FullChart;