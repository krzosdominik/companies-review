import React from 'react';

function DefaultColumnFilter({ column: { filterValue, setFilter } }) {

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => setFilter(e.target.value || undefined)}
            placeholder="Search"
        />
    )
};

export default DefaultColumnFilter;
