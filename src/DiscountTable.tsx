import {AgGridReact} from "ag-grid-react";
import {ColDef, ValueFormatterParams,ModuleRegistry,ClientSideRowModelModule} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, {useMemo} from "react";
import {IDataNode} from "./utils";
import {IVendor, vendors} from "./vendors";
import moment from "moment";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

function daysFormatter(params: ValueFormatterParams<string[], string[]>) {
    if (params.value.length === 7) {
        return 'בכל ימות השבוע';
    }
    if (params.value.every(value => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'].includes(value))) {
        return 'א-ה';
    }
}

const columnDefs: ColDef[] = [
    {field: "vendor", headerName: "ספק"},
    {field: "title", headerName: 'מסלול'},
    {field: "startTime", headerName: 'שעת התחלה', width: 120},
    {field: "endTime", headerName: 'שעת סיום', width: 120},
    {field: "days", headerName: 'ימים', valueFormatter: daysFormatter},
    {field: "discount", headerName: 'הנחה', valueFormatter: p => p.value + '%', width: 100},
    {field: "comment", headerName: 'הגבלות', width: 520},
    {
        field: 'savedValue',
        headerName: 'חיסכון בתקופת זמן בשקלים',
        width: 230,
        sort:'desc',
        valueFormatter: p => String(Math.round(p.value))
    },
];


interface IRowData {
    vendor: string;
    title: string;
    startTime: string;
    endTime: string;
    days: string[];
    discount: number;
    comment: string;
    savedValue: number;
}

const COST_OF_ELECTRICITY_UNIT = 0.61;

function calculateSavedValueForRow(row: IRowData, dataNodes: IDataNode[]) {
    let sum = 0;
    const startTime = moment(row.startTime, 'HH:mm');
    const endTime = moment(row.endTime, 'HH:mm');
    dataNodes.forEach((item) => {
        const itemDayOfWeek = item.fullDateMoment.format('ddd');
        if (!row.days.includes(itemDayOfWeek)) { //Not in the correct day
            return;
        }
        if (row.startTime === row.endTime) { // if whole day just give the discount
            sum += item.value;
            return;
        }
        const itemTime = moment(item.time, 'HH:mm');
        if (startTime.isBefore(endTime, 'hour')) {
            if (itemTime.isBetween(startTime, endTime, 'hours', '[)')) {
                sum += item.value;
            }
        } else {
            if (itemTime.isAfter(startTime, 'hours') || itemTime.isBefore(endTime, 'hours')) {
                sum += item.value;
            }
        }
    });
    return (sum * (row.discount / 100) * COST_OF_ELECTRICITY_UNIT) / 1000;
}

function calculateSavedValue(rowData: IRowData[], dataNodes: IDataNode[]) {
    rowData.forEach((row) => {
        row.savedValue = calculateSavedValueForRow(row, dataNodes);

    });
}

function vendorsToRowData(vendors: IVendor[]): IRowData[] {
    const result: IRowData[] = [];
    vendors.forEach(vendor => {
        vendor.tracks.forEach(track => {
            result.push({
                vendor: vendor.name,
                title: track.name,
                startTime: track.startTime,
                endTime: track.endTime,
                days: track.days,
                discount: track.discount,
                comment: track.comment,
                savedValue: 0
            });
        });
    });
    return result;
}

interface IDiscountTableProps {
    dataNodes: IDataNode[];
}


function DiscountTable({dataNodes}: IDiscountTableProps) {
    const rowData = vendorsToRowData(vendors);
    calculateSavedValue(rowData, dataNodes);
    const containerStyle = useMemo(() => ({ width: "100%", height: "300px" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

    return (
        <div style={containerStyle}>
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

export default DiscountTable;