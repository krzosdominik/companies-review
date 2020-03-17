import React, { useState, useEffect } from 'react';

import { useApiData } from './context/ApiData.context';
import Table from './Table';

const Content = () => {
    const { mergedData, isloading } = useApiData();
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
                    <div class="spinner-grow text-info" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <p className="mt-5 text-info">Loading... Please wait</p>
                </div>
            )}
            {sortedData && !isloading && <Table columns={columns} data={sortedData} />}
        </div>
    )
};

export default Content;