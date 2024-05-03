import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const Barcharts = ({ title }) => {
    const chartRef = useRef(null)

    useEffect(() => {
        const chartDom = chartRef.current
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }
            ]
        };
        option && myChart.setOption(option);
    }, [title])

    return <div ref={chartRef} style={{ width: "400px", height: "400px" }}></div>
}

export default Barcharts