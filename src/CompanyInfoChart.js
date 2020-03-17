import React, { useState, useEffect } from 'react';
import moment from 'moment';
import CanvasJSReact from './assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const SplineChart = ({ incomesByMonth }) => {
    const [options, setOptions] = useState();

    useEffect(() => {
        if (incomesByMonth) {

            const everyMonthTotal = incomesByMonth.map(el => {
                return {
                    year: el[1][0].year,
                    month: el[1][0].month,
                    total: el[1].map(item => Number(item.value))
                        .reduce((acc, curr) => acc + curr)
                        .toFixed(2)
                }
            });

            const sortedByDate = everyMonthTotal.sort((a, b) => {
                if (a.year === b.year) {
                    return a.month - b.month;
                }
                return a.year > b.year ? 1 : -1;
            });

            const points = sortedByDate.map(({ year, month, total }) => {
                return { x: new Date(year, month), y: Number(total) };
            });

            const options = {
                animationEnabled: true,
                title: {
                    text: "Monthly Incomes"
                },
                axisX: {
                    valueFormatString: "MM/YYYY"
                },
                axisY: {
                    title: "",
                    prefix: "$",
                    includeZero: false
                },
                data: [{
                    yValueFormatString: "$#,###",
                    xValueFormatString: "MMMM YYYY",
                    type: "spline",
                    dataPoints: points
                }]
            };

            setOptions(options);
        }
    }, [incomesByMonth]);

    return (
        <div style={{ width: "100%" }}>
            {options && <CanvasJSChart options={options} />}
        </div>
    );
}


export default SplineChart;                           