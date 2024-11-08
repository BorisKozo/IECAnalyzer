import React, {useState} from "react";
import {IDataNode, parseCSVData} from "./utils";
import {fakeData} from "./data";
import FullChart from "./FullChart";
import ByTimeChart from "./ByTimeChart";
import DiscountTable from "./DiscountTable";

const Main = ()=>{
    const [parsedData, setParsedData] = useState<IDataNode[]>(parseCSVData(fakeData))
    return (<>
        <h1>IEC Analyzer</h1>
            <FullChart dataNodes={parsedData}></FullChart>
            <ByTimeChart dataNodes={parsedData}></ByTimeChart>
            <DiscountTable dataNodes={parsedData}></DiscountTable>
        </>
        );
}

export default Main;