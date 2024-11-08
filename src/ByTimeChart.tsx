import {HighchartsReact, HighchartsReactProps} from "highcharts-react-official";
import * as Highcharts from "highcharts";
import React, {useMemo} from "react";
import {IDataNode} from "./utils";

const chartDefaultOptions:Highcharts.Options = {
    title: {
        text: 'Electricity usage per time',
        align: 'left'
    },
    xAxis: {
        type: 'category',
        labels: {
        }
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
    },
};

interface IByTimeChartProps {
    dataNodes:IDataNode[];
}

function ByTimeChart({dataNodes}:IByTimeChartProps){

    const data: [number, number][] = useMemo(()=> {
        const dataMap = new Map();
        dataNodes.forEach((item) => {
            if (dataMap.has(item.time)) {
                dataMap.set(item.time, dataMap.get(item.time) + item.value);
            } else {
                dataMap.set(item.time, item.value);
            }
        });

        const data:[number, number][] = [];
        dataMap.forEach((value, key) => {
            data.push([key, value]);
        });
        return data;
    },[dataNodes]);

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

export default ByTimeChart;