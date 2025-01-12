import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface BarChartData {
    skills: string;
    browser: string;
}

const ApexChart = ({ barChartData }: { barChartData: BarChartData[] }) => {
    const series = [{
        data: barChartData.map(item => parseFloat(item.skills)), // Extract skills percentages
    }];

    const options = {
        chart: {
            type: 'bar' as const,
            height: 350,
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end' as const,
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: barChartData.map(item => item.browser), // Extract skill names
        },
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default ApexChart;