import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { groupBy } from 'lodash';
import moment from 'moment';

import { useApiData } from './context/ApiData.context';
import CompanyInfoTable from './CompanyInfoTable';
import UserFilter from './UserFilter';
import CompanyInfoChart from './CompanyInfoChart';

const CompanyInfo = props => {
    const { id: companyId } = props.match.params;
    const { mergedData } = useApiData([]);
    const [companyData, setCompanyData] = useState();
    const [incomesByMonth, setIncomesByMonth] = useState();
    const [lastMonthTotal, setLastMonthTotal] = useState();

    const prevMonth = moment().subtract(1, 'month').add(1, 'day').format('MM/YY');

    useEffect(() => {
        if (mergedData) {
            const company = mergedData.filter(el => el.id === Number(companyId));
            setCompanyData(...company);
        }
    }, [mergedData]);

    useEffect(() => {
        if (companyData && companyData.incomes) {
            const formatedDate = companyData.incomes.map(el => {
                const date = moment(el.date);
                return {
                    value: el.value,
                    date: date.format('MM/YY'),
                    month: date.month(),
                    year: date.year()
                }
            });
            const grouped = groupBy(formatedDate, "date");
            setIncomesByMonth(Object.entries(grouped));
        }
    }, [companyData]);

    useEffect(() => {
        if (incomesByMonth && incomesByMonth.some(el => el[0] === prevMonth)) {
            const lastMonthTotal = incomesByMonth
                .filter(el => el[0] === prevMonth)
                .map(el => el[1]
                    .map(el => Number(el.value))
                    .reduce((acc, curr) => acc + curr)
                    .toFixed(2));

            setLastMonthTotal(lastMonthTotal);
        } else {
            setLastMonthTotal(`No income in ${moment(prevMonth).format('MMMM')}`);
        }
    }, [incomesByMonth]);

    return (
        <div className="container">
            {companyData && (
                <>
                    <section className="company d-flex flex-column align-items-center text-center">
                        <Link to="/" className="btn btn-outline-danger btn-sm align-self-start text-bold">
                            ↩ Back
                        </Link>
                        <h1 className="text-dark">{companyData.name}</h1>
                        <hr class="my-4 bg-primary" />
                        <div
                            className="row d-flex align-items-start"
                            style={{ width: "100%" }}
                        >
                            <div className="col-sm-12 col-lg-6">
                                <CompanyInfoTable
                                    companyData={companyData}
                                    lastMonthTotal={lastMonthTotal}
                                />
                            </div>
                            <div className="col-sm-12 col-lg-6">
                                <h5>Change the range of:</h5>
                                <UserFilter companyData={companyData} />
                            </div>
                        </div>
                        <CompanyInfoChart incomesByMonth={incomesByMonth} />
                    </section>
                </>
            )}
        </div>
    )
}

export default CompanyInfo;