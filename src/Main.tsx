import React, {useCallback, useState} from "react";
import {IDataNode, parseCSVData} from "./utils";
import {fakeData} from "./data";
import FullChart from "./FullChart";
import ByTimeChart from "./ByTimeChart";
import DiscountTable from "./DiscountTable";
import {Button, Stack, ThemeProvider} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import LoadDataModal from "./LoadDataModal";
import Filter, {FilterChangeFunction} from "./Filter";

const Main = () => {

    const [parsedData, setParsedData] = useState<IDataNode[]>(parseCSVData(fakeData))
    const [showLoadModal, setShowLoadModal] = useState(false);

    const onModalClose = useCallback((csvData:string)=>{
        if (csvData) {
            setParsedData(parseCSVData(csvData));
        }
        setShowLoadModal(false);
    },[])

    const onFilterChanged:FilterChangeFunction = ({startDate,endDate})=>{
        console.log(startDate, endDate);
    };

    return (
        <ThemeProvider dir={"rtl"}>
            <section style={{margin:'10px'}}>
                <h1>מנתח דו"ח מונה חכם</h1>
                {parsedData.length === 0 && <Button variant="primary" size={"sm"} style={{width: "400px"}} onClick={()=>{setShowLoadModal(true);}}>טען דו"ח חברת חשמל</Button>}
                <LoadDataModal show={showLoadModal} onClose={onModalClose}></LoadDataModal>
                {parsedData.length > 0 ? <Stack gap={2} direction={"vertical"}>
                    <Filter onFilterChanged={onFilterChanged} minDate={parsedData[0].fullDateMoment} maxDate={parsedData[parsedData.length-1].fullDateMoment}></Filter>
                    <FullChart dataNodes={parsedData}></FullChart>
                    <ByTimeChart dataNodes={parsedData}></ByTimeChart>
                    <DiscountTable dataNodes={parsedData}></DiscountTable>
                </Stack> : <div>כדי להתחיל יש לטעון דו"ח בעזרת הכפתור מעל</div>}
            </section>
        </ThemeProvider>
    );
}

export default Main;