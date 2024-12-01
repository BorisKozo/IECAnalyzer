import React, {useCallback, useEffect, useState} from "react";
import {IDataNode, parseCSVData} from "./utils";
import {testReport} from "./testReport";
import FullChart from "./FullChart";
import ByTimeChart from "./ByTimeChart";
import DiscountTable from "./DiscountTable";
import {Button, Stack, ThemeProvider} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import LoadDataModal from "./LoadDataModal";
import Filter, {FilterChangeFunction, IFilterValues} from "./Filter";
import moment from "moment";
import HowToGerReportModal from "./HowToGerReportModal";
import {fakeData} from "./fakeData";

const defaultFilterValues: IFilterValues = {
    startDate: moment('2000-01-01'),
    endDate: moment(),
}

const Main = () => {
    const [fullData, setFullData] = useState<IDataNode[]>(parseCSVData(testReport));
    const [filteredData, setFilteredData] = useState<IDataNode[]>([...fullData]);
    const [filterValues, setFilterValues] = useState<IFilterValues>(defaultFilterValues);
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [showHowToGetReportModal, setShowHowToGetReportModal] = useState(false);

    const onModalClose = useCallback((csvData: string) => {
        if (csvData) {
            setFullData(parseCSVData(csvData));
        }
        setShowLoadModal(false);
    }, [])

    const onFilterChanged: FilterChangeFunction = (newFilterValues) => {
        setFilterValues(newFilterValues);
    };

    useEffect(() => {
        console.log(fullData.length);
        if (fullData.length > 0) {
            setFilterValues({
                startDate: fullData[0].fullDateMoment,
                endDate: fullData[fullData.length - 1].fullDateMoment
            });
        }
    }, [fullData]);

    useEffect(() => {
        const result: IDataNode[] = [];
        fullData.forEach((dataNode: IDataNode) => {
            if (dataNode.fullDateMoment.isBetween(filterValues.startDate, filterValues.endDate, 'days', '[]')) {
                result.push(dataNode);
            }
        });
        setFilteredData(result);
    }, [filterValues, fullData]);

    return (
        <ThemeProvider dir={"rtl"}>
            <section style={{margin: '10px'}}>
                <h1>מנתח דו"ח מונה חכם</h1>
                {fullData.length === 0 &&
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                        <Button variant="info" size={"sm"} style={{width: "400px", margin: '5px'}} onClick={() => {
                            setShowHowToGetReportModal(true);
                        }}>איך לקבל דו"ח</Button>

                        <Button variant="primary" size={"sm"} style={{width: "400px", margin: '5px'}} onClick={() => {
                            setShowLoadModal(true);
                        }}>טען דו"ח חברת חשמל</Button>

                        <Button variant="primary" size={"sm"} style={{width: "400px", margin: '5px'}} onClick={() => {
                            setFullData(parseCSVData(fakeData));
                        }}>טען נתוני דמה</Button>
                    </div>}

                <LoadDataModal show={showLoadModal} onClose={onModalClose}></LoadDataModal>
                <HowToGerReportModal show={showHowToGetReportModal} hide={() => {
                    setShowHowToGetReportModal(false)
                }}></HowToGerReportModal>
                {fullData.length > 0 ? <Stack gap={2} direction={"vertical"}>
                    <Filter onFilterChanged={onFilterChanged} minDate={fullData[0].fullDateMoment}
                            maxDate={fullData[fullData.length - 1].fullDateMoment}></Filter>
                    <FullChart dataNodes={filteredData}></FullChart>
                    <ByTimeChart dataNodes={filteredData}></ByTimeChart>
                    <DiscountTable dataNodes={filteredData}></DiscountTable>
                </Stack> : <div></div>}
            </section>
        </ThemeProvider>
    );
}

export default Main;