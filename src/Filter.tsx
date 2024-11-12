import moment, {Moment} from "moment";
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import {Col, Form, Row} from "react-bootstrap";
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

    return (<Form>
        <Form.Group as={Row} className="mb-1">
            <Form.Label column sm="1" >החל מ:</Form.Label>
            <Col sm="1">
                <DatePicker className='form-control form-control-solid' selected={startDate} onChange={(date: Date) => {
                    setStartDate(date);
                    onFilterChanged({
                        startDate: moment(date),
                        endDate: moment(endDate),
                    })
                }}></DatePicker>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="1">עד:</Form.Label>
            <Col sm="1">
            <DatePicker className='form-control form-control-solid' selected={endDate} onChange={(date: Date) => {
                setEndDate(date);
                onFilterChanged({
                    startDate: moment(startDate),
                    endDate: moment(date),
                })
            }}></DatePicker>
            </Col>
        </Form.Group>
    </Form>);
}

export default Filter;