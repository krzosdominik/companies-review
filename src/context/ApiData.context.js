import React, { useState, useEffect, useContext } from 'react';

import getData from "../getData";

const ApiDataContext = React.createContext();

export function useApiData() {
    return useContext(ApiDataContext);
}

export const ApiDataProvider = ({ children }) => {
    const [companies, setCompanies] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [mergedData, setMergedData] = useState();
    const [isloading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getData('companies')
            .then(data => {
                data.forEach(company => {
                    getData(`incomes/${company.id}`)
                        .then(data => setIncomes(incomes => [...incomes, calculateTotalIncome(data)]))
                        .catch(error => setError(error));
                });
                setCompanies(data);
            })
            .catch(error => setError(error));
    }, []);

    useEffect(() => {
        mergeArrays(companies, incomes);
    }, [companies, incomes,]);

    const calculateTotalIncome = data => {
        const totalIncome = data.incomes
            .map(el => parseFloat(el.value))
            .reduce((curr, acc) => curr + acc)
            .toFixed(2);

        return {
            id: data.id,
            incomes: data.incomes,
            totalIncome
        }
    };

    const mergeArrays = (firstArray, secondArray) => {
        const result = firstArray.map(element => ({
            ...secondArray.find(item => (item.id === element.id) && item),
            ...element
        }));
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);

        setMergedData(result);
    };

    return (
        <ApiDataContext.Provider value={{ mergedData, isloading, error }}>
            {children}
        </ApiDataContext.Provider>
    )
}