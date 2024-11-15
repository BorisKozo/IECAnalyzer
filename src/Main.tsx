import React, {useCallback, useEffect, useState} from "react";
import {IDataNode, parseCSVData} from "./utils";
import {fakeData} from "./data";
import FullChart from "./FullChart";
import ByTimeChart from "./ByTimeChart";
import DiscountTable from "./DiscountTable";
import {Button, Stack, ThemeProvider} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import LoadDataModal from "./LoadDataModal";
import Filter, {FilterChangeFunction, IFilterValues} from "./Filter";
import moment from "moment";

const defaultFilterValues: IFilterValues = {
    startDate: moment('2000-01-01'),
    endDate: moment(),
}

const Main = () => {
    const [parsedData, setParsedData] = useState<IDataNode[]>(parseCSVData(fakeData))
    const [filterValues, setFilterValues] = useState<IFilterValues>(defaultFilterValues)
    const [showLoadModal, setShowLoadModal] = useState(false);

    const onModalClose = useCallback((csvData: string) => {
        if (csvData) {
            setParsedData(parseCSVData(csvData));
        }
        setShowLoadModal(false);
    }, [])

    const onFilterChanged: FilterChangeFunction = (newFilterValues) => {
        console.log(newFilterValues);
        setFilterValues(newFilterValues);
    };

    useEffect(() => {
        console.log(parsedData.length);
        if (parsedData.length > 0) {
            setFilterValues({
                startDate: parsedData[0].fullDateMoment,
                endDate: parsedData[parsedData.length - 1].fullDateMoment
            });
        }
    }, [parsedData]);

    return (
        <ThemeProvider dir={"rtl"}>
            <section style={{margin: '10px'}}>
                <h1>מנתח דו"ח מונה חכם</h1>
                {parsedData.length === 0 &&
                    <Button variant="primary" size={"sm"} style={{width: "400px"}} onClick={() => {
                        setShowLoadModal(true);
                    }}>טען דו"ח חברת חשמל</Button>}
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