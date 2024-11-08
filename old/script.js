const validLineRegex = /"(\d{2}\/\d{2}\/\d{4})",\s*"(\d{2}:\d{2})",\s*(\d*\.\d*)/;

const COST_OF_ELECTRICITY_UNIT = 0.61;

function parseInput(input) {
    const result = [];
    const lines = input.split('\n');
    let prev
    lines.forEach(line => {
        if (validLineRegex.test(line)) {
            const parseResult = validLineRegex.exec(line);
            const fullDate = moment(`${parseResult[1]} ${parseResult[2]}`).unix() * 1000;

            result.push({
                date: parseResult[1],
                time: parseResult[2],
                fullDate: moment(`${parseResult[1]} ${parseResult[2]}`, 'DD/MM/YYYY HH:mm').unix() * 1000,
                fullDateMoment: moment(`${parseResult[1]} ${parseResult[2]}`, 'DD/MM/YYYY HH:mm'),
                value: Number(parseResult[3]),
            });
        }
    });
    result.sort((a, b) => a.fullDate - b.fullDate);
    return result;
}

function drawAllPoints(csvData) {

    const data = csvData.map((datapoint) => {
        return [datapoint.fullDate, datapoint.value];

    });

    Highcharts.chart('container', {
        chart: {
            zooming: {
                type: 'x'
            },
            panning: true,
            panKey: 'shift'
        },
        title: {
            text: 'Electricity usage over time',
            align: 'left'
        },
        subtitle: {
            subtitle: {
                text: 'Click and drag to zoom in. Hold down shift key to pan.',
                align: 'left'
            },
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'KW'
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

        series: [{
            type: 'line',
            name: 'KW/h',
            data: data
        }]
    });
}

function vendorsToRowData(vendors) {
    const result = [];
    Object.keys(vendors).forEach(vendorKey => {
        const vendor = vendors[vendorKey];
        vendor.tracks.forEach(track => {
            result.push({
                vendor: vendor.name,
                title: track.name,
                startTime: track.startTime,
                endTime: track.endTime,
                days: track.days,
                discount: track.discount,
                comment: track.comment,
                cap: track.cap
            });
        });
    });
    return result;
}

function calculateSavedValueForRow(row, parsedData) {
    let sum = 0;
    const startTime = moment(row.startTime, 'HH:mm');
    const endTime = moment(row.endTime, 'HH:mm');
    parsedData.forEach((item) => {
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
    return sum * (row.discount / 100) * COST_OF_ELECTRICITY_UNIT;
}

function calculateSavedValue(rowData, parsedData) {
    rowData.forEach((row) => {
        row.savedValue = calculateSavedValueForRow(row, parsedData);
    });
}

function daysFormatter(params) {
    if (params.value.length === 7) {
        return 'בכל ימות השבוע';
    }
    if (params.value.every(value => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'].includes(value))) {
        return 'א-ה';
    }
}

function showSuppliersGrid(parsedData, vendors) {
    const rowData = vendorsToRowData(vendors);
    calculateSavedValue(rowData, parsedData);

    const gridOptions = {
        enableRtl: true,
        // Row Data: The data to be displayed.
        rowData: rowData,
        // Column Definitions: Defines the columns to be displayed.
        columnDefs: [
            {field: "vendor", headerName: "ספק"},
            {field: "title", headerName: 'מסלול'},
            {field: "startTime", headerName: 'שעת התחלה', width: 120},
            {field: "endTime", headerName: 'שעת סיום', width: 120},
            {field: "days", headerName: 'ימים', valueFormatter: daysFormatter},
            {field: "discount", headerName: 'הנחה', valueFormatter: p => p.value + '%', width: 100},
            {field: "comment", headerName: 'הגבלות', width: 520},
            {field: "cap", headerName: 'חיסכון מקסימלי בחודש', width: 200},
            {
                field: 'savedValue',
                headerName: 'חיסכון בתקופת זמן',
                width: 200,
                valueFormatter: p => Math.round(p.value)
            },
        ]
    };
    const myGridElement = document.getElementById('suppliers-grid');
    agGrid.createGrid(myGridElement, gridOptions);
}

function showByTime(parsedData) {

    const dataMap = new Map();
    parsedData.forEach((item) => {
        if (dataMap.has(item.time)) {
            dataMap.set(item.time, dataMap.get(item.time) + item.value);
        } else {
            dataMap.set(item.time, item.value);
        }
    });

    const data = [];
    dataMap.forEach((value, key) => {
        data.push([key, value]);
    });

console.log(data);

    Highcharts.chart('by-time-container', {
        chart: {
            zooming: {
                type: 'x'
            },
            panning: true,
            panKey: 'shift'
        },
        title: {
            text: 'Electricity usage per time',
            align: 'left'
        },
        subtitle: {
            subtitle: {
                text: 'Click and drag to zoom in. Hold down shift key to pan.',
                align: 'left'
            },
        },
        xAxis: {
            type: 'category',
            labels: {
            }
        },
        yAxis: {
            title: {
                text: 'KW'
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

        series: [{
            type: 'line',
            name: 'KW/h',
            data: data
        }]
    });
}

function showAll(parsedData, vendors) {
    drawAllPoints(parsedData);
    showSuppliersGrid(parsedData, vendors);
    showByTime(parsedData);
}

window.onload = () => {
    const parsedData = parseInput(window.fake_data);
    showAll(parsedData, window.vendors);
}

function loadData() {
    const data = document.getElementById('floating-textarea').value ?? '';
    const parsedData = parseInput(data);
    showAll(parsedData, window.vendors);
}