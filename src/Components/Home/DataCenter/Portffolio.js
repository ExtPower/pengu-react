import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Balancee, Add, Delete } from "../../../assets/index";

function Portffolio() {
  const [dataApex, setdataAapex] = useState({
    series: [
      {
        name: "series-1",
        data: [10, 15, 30],
      },
    ],

    options: {
      colors: ["#7A65FB"],
      chart: {
        id: "basic-line",
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
        },
      },
      xaxis: {
        categories: ["1st", "15th", "30th"],
        labels: {
          style: {
            colors: "#A0A1A9",
            fontFamily: "Montserrat",
            fontWeight: 600,
          },
        },
      },
      yaxis: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <span className="welcopmeInfo">Portfolio Value</span>
      <div className="chartData">
        <div className="innereChart">
          <span className="innerdataEETS">
            <img src={Balancee}></img>
          </span>
          <span>
            <h4>23</h4>
          </span>
        </div>
        <div className="innereChart">
          <span className="amouunt">$68,500</span>
        </div>
      </div>

      <Chart options={dataApex.options} series={dataApex.series} type="bar" />
    </div>
  );
}

export default Portffolio;
