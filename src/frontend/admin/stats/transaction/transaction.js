import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';


const TransactionChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Number of Transactions',
            data: [],
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderWidth: 1,
          },
        ],
      });


    


  useEffect(() => {
    console.log("fetching info")
    fetch('http://localhost:4000/stats/transactions')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data received:', data);

        // Check if data is an array before mapping over it
        if (Array.isArray(data)) {
          const accountNumbers = data.map((entry) => entry.accountNo);
          const transactionCounts = data.map((entry) => entry.transactionCount);

          console.log('Processed data:', accountNumbers, transactionCounts);

          setChartData({
            labels: accountNumbers,
            datasets: [
              {
                label: 'Number of Transactions',
                data: transactionCounts,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Transaction Chart</h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: [
              {
                //type: 'category', // Set type to 'category' for categorical data
                position: 'bottom',
              },
            ],
            y: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
    }
  
export default TransactionChart;
