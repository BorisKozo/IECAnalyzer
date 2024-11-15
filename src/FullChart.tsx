import {HighchartsReact, HighchartsReactProps} from "highcharts-react-official";
import * as Highcharts from "highcharts";
import React from "react";
import {IDataNode} from "./utils";
import moment, {Moment} from "moment";

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
        text: 'שימוש בחשמל על פני הזמן',
        align: 'right'
    },
    subtitle: {
            text: 'אפשר לבחור אזור בשביל זום או להחזיק שיפט בשביל לנוע לצדדים',
            align: 'right'
    },
    xAxis: {
        type: 'datetime',
        labels:{
            formatter:function ():string{
                return moment(this.value).format('DD/MM/YY');
            }
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
    tooltip: {
        formatter: function () {
            const date:Moment = moment.unix(Number(this.x)/1000);
            return `${date.format('ddd, DD/MM, HH:mm')} - <b>${this.y} watt</b>`;
        }
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