import moment, {Moment} from "moment";

const validLineRegex = /"(\d{2}\/\d{2}\/\d{4})",\s*"(\d{2}:\d{2})",\s*(\d*(\.\d*)?)/;

export interface IDataNode {
    date: string;
    time: string;
    fullDate: number;
    fullDateMoment:Moment;
    value:number;

}

export function parseCSVData(csvData:string):IDataNode[] {
    const result:IDataNode[] = [];
    const lines = csvData.split('\n');
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
                value: Number(parseResult[3])*1000,
            });
        }
    });
    result.sort((a, b) => a.fullDate - b.fullDate);
    return result;
}