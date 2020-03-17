import React from 'react';

const CompanyInfoTable = ({ companyData, lastMonthTotal }) => {
    return (
        <table className="table table-striped table-dark text-left rounded align-self-start">
            <tbody>
                <tr>
                    <th scope="row">ID</th>
                    <td>{companyData.id}</td>
                </tr>
                <tr>
                    <th scope="row">City</th>
                    <td>{companyData.city}</td>
                </tr>
                <tr>
                    <th scope="row">Total income</th>
                    <td>${companyData.totalIncome}</td>
                </tr>
                <tr>
                    <th scope="row">Average income</th>
                    {companyData.incomes && (
                        <td>
                            ${(companyData.totalIncome / companyData.incomes.length).toFixed(2)}
                        </td>
                    )}
                </tr>
                <tr>
                    <th scope="row">Last full month income</th>
                    {lastMonthTotal && lastMonthTotal.indexOf("No") != -1
                        ? <td>{lastMonthTotal}</td>
                        : <td>${lastMonthTotal}</td>}
                </tr>
            </tbody>
        </table>
    )
};

export default CompanyInfoTable;