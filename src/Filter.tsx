import moment, {Moment} from "moment";
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {Button, Col, Form, Row} from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css';

export interface IFilterValues {
    startDate: Moment;
    endDate: Moment;
}

export type FilterChangeFunction = (values: IFilterValues) => void;

interface IFilterProps {
    minDate: Moment;
    maxDate: Moment;
    onFilterChanged: FilterChangeFunction;
}

function Filter({onFilterChanged, minDate, maxDate}: IFilterProps) {

    const [startDate, setStartDate] = useState<Date>(minDate.toDate());
    const [endDate, setEndDate] = useState<Date>(maxDate.toDate());

    useEffect(() => {
        setStartDate(minDate.toDate());
        setEndDate(maxDate.toDate());
    }, [minDate, maxDate]);

    function handleOnChange(newStartDate?: Date, newEndDate?: Date) {
        const filterChangeResult = {
            startDate: moment(startDate),
            endDate: moment(endDate),
        }
        if (newStartDate) {
            setStartDate(newStartDate);
            filterChangeResult.startDate = moment(newStartDate);
        }
        if (newEndDate) {
            setEndDate(newEndDate);
            filterChangeResult.endDate = moment(newEndDate);
        }
        onFilterChanged(filterChangeResult);
    }

    return (<Form>
        <Form.Group as={Row} className="mb-1">
            <Form.Label column sm="1">החל מ:</Form.Label>
            <Col sm="1">
                <DatePicker minDate={minDate.toDate()}
                            maxDate={maxDate.toDate()}
                            className='form-control form-control-solid'
                            selected={startDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date: Date) => {
                                handleOnChange(date);
                            }}></DatePicker>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1">עד:</Form.Label>
            <Col sm="1">
                <DatePicker
                    minDate={minDate.toDate()}
                    maxDate={maxDate.toDate()}
                    className='form-control form-control-solid'
                    selected={endDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date: Date) => {
                        handleOnChange(undefined, date);
                    }}></DatePicker>
            </Col>
        </Form.Group>
        <Form.Group>
            <Button className="btn-primary btn" onClick={() => {
                handleOnChange(minDate.toDate(), maxDate.toDate());
            }}> איפוס</Button>
        </Form.Group>
    </Form>);
}

export default Filter;