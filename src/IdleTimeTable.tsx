import React, {CSSProperties, useMemo} from "react";
import {AgGridReact} from "ag-grid-react";
import {IDataNode} from "./utils";
import {ColDef, ValueFormatterParams, ModuleRegistry, ClientSideRowModelModule} from "ag-grid-community";
import moment, {Moment} from "moment";

const columnDefs: ColDef[] = [
    {field: "startTime", headerName: "שעת התחלה"},
    {field: "endTime", headerName: 'שעת סיום'},
    {field: "avgUsage", headerName: 'צריכה ממוצעת', width: 200, sort: 'asc'},
];

interface IRowData {
    startTime: string;
    endTime: string;
    avgUsage: number;
}

interface IdleTimeTableProps {
    dataNodes: IDataNode[];
}

interface IWindowPoint {
    startTime: Moment;
    value: number;
}

function getWindowSum(window: IWindowPoint[]): number {
    return window.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value
    }, 0);
}

function calculateIdleTimes(dataNodes: IDataNode[]): IRowData[] {
    let currentWeek = '';
    let currentMin: IWindowPoint = {
        startTime: moment(),
        value: 0
    };
    let currentWindow: IWindowPoint[] = [];
    let result: Map<string, IRowData> = new Map();
    dataNodes.forEach((dataNode) => {
        if (currentWeek !== dataNode.fullDateMoment.format('ww-YYYY')) { //starting a new week
            currentWindow = [];
            currentWeek = dataNode.fullDateMoment.format('ww-YYYY');
            currentMin = {
                startTime: moment(),
                value: 0
            };
        }

        currentWindow.push({
            value: dataNode.value,
            startTime: dataNode.fullDateMoment
        });

        if (currentWindow.length > 4) { //We check 4 points as each point is 15 min and we want an hour
            currentWindow.shift();
            const tempSum = getWindowSum(currentWindow);
            if (tempSum < currentMin.value) {
                currentMin = {
                    value: tempSum,
                    startTime: currentWindow[0].startTime
                }
            }
        } else {
            currentMin = {
                value: getWindowSum(currentWindow),
                startTime: currentWindow[0].startTime
            }
        }

        result.set(currentWeek, {
            avgUsage: currentMin.value,
            startTime: currentMin.startTime.format('HH:mm'),
            endTime: currentMin.startTime.add(1, 'hours').format('HH:mm')
        });
    });

    return Array.from(result.values()).sort((item1, item2) => {
        return item1.avgUsage - item2.avgUsage;
    }).slice(0, 10);
}

function IdleTimeTable({dataNodes}: IdleTimeTableProps) {
    const containerStyle = useMemo<CSSProperties>(() => ({
        width: "100%",
        height: "465px",
        display: "flex",
        flexDirection: "column"
    }), []);
    const gridStyle = useMemo(() => ({height: "100%", width: "100%"}), []);
    const rowData: IRowData[] = calculateIdleTimes(dataNodes);

    return (
        <div style={containerStyle}>
            <h5>שעה עם שימוש מינימלי (לפי שבוע, עשרת הנמוכים)</h5>
            <div
                style={gridStyle}
                className={
                    "ag-theme-quartz"
                }
            >
                <AgGridReact<IRowData>
                    rowData={rowData}
                    columnDefs={columnDefs}
                    enableRtl={true}
                />
            </div>
        </div>
    );
}

export default IdleTimeTable;