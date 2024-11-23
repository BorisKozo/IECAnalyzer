import {HighchartsReact, HighchartsReactProps} from "highcharts-react-official";
import * as Highcharts from "highcharts";
import React, {useMemo} from "react";
import {IDataNode} from "./utils";
import "./ByTimeChart.css";

const chartDefaultOptions: Highcharts.Options = {
    title: {
        text: 'שימוש כולל בכל מקטע זמן',
        align: 'right'
    },
    xAxis: {
        type: 'category',
        labels: {},
        crosshair:true
    },
    yAxis: {
        title: {
            text: 'Watt'
        }
    },
    legend: {
        enabled: false,
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
    tooltip: {
        useHTML:true,
        shared: true,
        headerFormat: '<span>{point.key}</span>',
        pointFormat: '<div class="by-time-series-container"><span><b>{point.y} W</b></span>' +
            '<span class="by-time-series-name-tooltip" style="color: {series.color}">{series.name}</span>' +
            '</div>'
    }
};

interface IByTimeChartProps {
    dataNodes: IDataNode[];
}

const ALL_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
const WEEK_END_DAYS = ['Fri', 'Sat'];

function ByTimeChart({dataNodes}: IByTimeChartProps) {
    function calculateData(dataNodes: IDataNode[], relevantDays: string[]): [number, number][] {
        const dataMap = new Map();
        dataNodes.forEach((item) => {
            if (!relevantDays.includes(item.fullDateMoment.format('ddd'))){
                return;
            }
            if (dataMap.has(item.time)) {
                dataMap.set(item.time, dataMap.get(item.time) + item.value);
            } else {
                dataMap.set(item.time, item.value);
            }
        });

        const data: [number, number][] = [];
        dataMap.forEach((value, key) => {
            data.push([key, value]);
        });
        return data;

    }

    const dataAllDays: [number, number][] = useMemo(() => {
        return calculateData(dataNodes, ALL_DAYS);
    }, [dataNodes]);

    const dataWeekDays: [number, number][] = useMemo(() => {
        return calculateData(dataNodes, WEEK_DAYS);
    }, [dataNodes]);

    const dataWeekEnds: [number, number][] = useMemo(() => {
        return calculateData(dataNodes, WEEK_END_DAYS);
    }, [dataNodes]);


    const options = {
        ...chartDefaultOptions,
        series: [
            {
                type: 'line',
                name: 'כל ימות השבוע',
                data: dataAllDays
            },
            {
                type: 'line',
                name: 'ימי חול',
                data: dataWeekDays
            },
            {
                type: 'line',
                name: 'סוף שבוע',
                data: dataWeekEnds
            }
        ],
    }

    return <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
}

export default ByTimeChart;