import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserFilter = ({ companyData }) => {
    const [totalFiltered, setTotalFiltered] = useState();
    const [averageFiltered, setAverageFiltered] = useState();
    const [totalStartDate, setTotalStartDate] = useState();
    const [totalEndDate, setTotalEndDate] = useState();
    const [averageStartDate, setAverageStartDate] = useState();
    const [averageEndDate, setAverageEndDate] = useState();

    useEffect(() => {
        if (totalStartDate && totalEndDate) {
            const filter = companyData.incomes
                .filter(({ date }) => new Date(date) >= new Date(totalStartDate))
                .filter(({ date }) => new Date(date) <= new Date(totalEndDate))
                .map(el => el.value);

            if (filter.length !== 0) {
                const total = filter.reduce((acc, curr) => Number(acc) + Number(curr)).toFixed(2);
                setTotalFiltered(total);
            }
        }
    }, [companyData, totalStartDate, totalEndDate]);

    if (companyData) {
        console.log(companyData)
    }

    useEffect(() => {
        if (averageStartDate && averageEndDate) {
            const filter = companyData.incomes
                .filter(({ date }) => new Date(date) >= new Date(averageStartDate))
                .filter(({ date }) => new Date(date) <= new Date(averageEndDate))
                .map(el => el.value);

            if (filter.length !== 0) {
                const total = filter.reduce((acc, curr) => Number(acc) + Number(curr));
                const average = (total / filter.length).toFixed(2);
                setAverageFiltered(average);
            }
        }
    }, [companyData, averageStartDate, averageEndDate]);

    const onTotalStartDateChange = date => setTotalStartDate(date);
    const onTotalEndDateChange = date => setTotalEndDate(date);
    const onAverageStartDateChange = date => setAverageStartDate(date);
    const onAverageEndDateChange = date => setAverageEndDate(date);

    return (
        <div className="d-flex justify-content-around">
            <div className="d-flex flex-column">
                <p>Total income</p>
                <small>from</small>
                <DatePicker selected={totalStartDate} onChange={onTotalStartDateChange} />
                <small>to</small>
                <DatePicker selected={totalEndDate} onChange={onTotalEndDateChange} />
                {!totalFiltered && <p className="mt-2 text-left">=</p>}
                {totalFiltered && <p className="mt-2 text-left">= ${totalFiltered}</p>}
            </div>
            <div className="d-flex flex-column">
                <p>Average income</p>
                <small>from</small>
                <DatePicker selected={averageStartDate} onChange={onAverageStartDateChange} />
                <small>to</small>
                <DatePicker selected={averageEndDate} onChange={onAverageEndDateChange} />
                {!averageFiltered && <p className="mt-2 text-left">=</p>}
                {averageFiltered && <p className="mt-2 text-left">= ${averageFiltered}</p>}
            </div>
        </div>
    )
}

export default UserFilter;