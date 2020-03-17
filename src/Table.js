import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTable, usePagination, useFilters } from 'react-table';

import DefaultColumnFilter from './DefaultColumnFilter';

const Table = ({ columns, data }) => {
    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            defaultColumn
        },
        useFilters,
        usePagination,
    );

    return (
        <div className="table-responsive-sm">
            <table {...getTableProps()} className="table table-striped table-dark rounded w-auto">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    const linkPath = `/company/${row.cells[0].value}`;
                                    return (
                                        <td {...cell.getCellProps()}>
                                            <Link to={linkPath} className="text-white">
                                                {cell.render('Cell')}
                                            </Link>
                                        </td>)
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="pagination d-flex flex-row justify-content-between align-items-center">
                <div>
                    <button
                        className="btn btn-secondary btn-sm mx-1"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}>
                        ≪
                    </button>
                    <button
                        className="btn btn-secondary btn-sm mx-1"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}>
                        Previous
                    </button>
                    <button
                        className="btn btn-secondary btn-sm mx-1"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}>
                        Next
                    </button>
                    <button
                        className="btn btn-secondary btn-sm mx-1"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}>
                        ≫
                    </button>
                </div>
                <p className="text-dark">
                    Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong>
                </p>
            </div>
        </div>
    )
}

export default Table;