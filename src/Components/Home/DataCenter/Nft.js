import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Nfts, Nft_nobg } from "../../../assets/index";

function Nft() {
  const [dataApex, setdataAapex] = useState({
    series: [
      {
        name: "series-1",
        data: [10, 15, 30],
      },
    ],

    options: {
      colors: ["#7A65FB"],
      stroke: {
        curve: "straight",
      },
      dataLabels: {
        enabled: false,
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
        opposite: true,
        labels: {
          style: {
            colors: "#A0A1A9",
            fontFamily: "Montserrat",
            fontWeight: 600,
          },
        },
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
      <span className="welcopmeInfo">Total NFTs</span>
      <div className="chartData">
        <div className="innereChart">
          <span>
            <h4>19</h4>
          </span>
        </div>
        <div className="innereChart">
          <span className="amouunt">
            <img src={Nft_nobg}></img>
          </span>
        </div>
      </div>

      <Chart options={dataApex.options} series={dataApex.series} type="area" />
    </div>
  );
}

export default Nft;
