import React, { useState, useEffect } from 'react';

import { useApiData } from './context/ApiData.context';
import Table from './Table';

const Content = () => {
    const { mergedData, isloading, error } = useApiData();
    const [sortedData, setSortedData] = useState();

    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id',
                Filter: false
            },
            {
                Header: 'Name',
                accessor: 'name'
            }, {
                Header: 'City',
                accessor: 'city',
                Filter: false
            },
            {
                Header: 'Total income $',
                accessor: 'totalIncome',
                Filter: false
            }
        ],
        []
    );

    useEffect(() => {
        if (mergedData) {
            let sortedData = mergedData.sort((a, b) => b.totalIncome - a.totalIncome);
            setSortedData(sortedData);
        }
    }, [mergedData]);

    return (
        <div className="d-flex justify-content-center">
            {isloading && (
                <div className="d-flex flex-column pt-5 mt-5 align-items-center">
                    <div className="spinner-grow text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-5 text-info">Loading... Please wait</p>
                </div>
            )}
            {!isloading && error && (
                <div className="text-danger text-center">
                <h2>Oops, something went wrong</h2>
                <p>Please try again later.</p>
                </div>
            )}
            {sortedData && !isloading && !error && <Table columns={columns} data={sortedData} />}
        </div>
    )
};

export default Content;