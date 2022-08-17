import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function ComboChart() {
  const dateOptions = ["1D", "7D", "1M", "3M", "ALL"];

  const [activeDateOption, setActiveDateOption] = useState("1D");

  const [dataApex, setdataAapex] = useState({
    series: [
      {
        name: "Floor Price",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17],
      },

      {
        name: "Total listed",
        type: "line",
        data: [13, 35, 42, 15, 27, 41, 21],
      },
      {
        name: "Volume",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201],
      },
    ],
    options: {
      colors: ["#7A65FB", "#E272FF", "#F8F7FF"],
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        width: [4, 4],
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1],
      },

      labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      grid: {
        show: false,
      },
      xaxis: {
        type: "category",

        labels: {
          style: {
            colors: "#A0A1A9",
            fontFamily: "Montserrat",
            fontWeight: 600,
          },
        },
      },
      legend: {
        position: "top",
        colors: "#A0A1A9",
        fontFamily: "Montserrat",
        fontWeight: 600,
        labels: {
          colors: "#A0A1A9",
        },
      },
      tooltip: {
        enabled: false,
      },
      yaxis: [
        {
          title: {
            text: "Floor Price",
            style: {
              color: "#A0A1A9",
            },
          },
          labels: {
            style: {
              colors: "#A0A1A9",
              fontFamily: "Montserrat",
              fontWeight: 600,
            },
          },
        },
        {
          opposite: true,
          title: {
            text: "Total Listed",
            style: {
              color: "#A0A1A9",
            },
          },
          labels: {
            style: {
              colors: "#A0A1A9",
              fontFamily: "Montserrat",
              fontWeight: 600,
            },
          },
        },
      ],
    },
  });

  return (
    <div className="comboChartContainer">
      <div className="comboChartHeaderContainer">
        <div className="comboChartHeaderText">
          <h3>Overview</h3>
        </div>
        <div className="comboChartHeaderButtons">
          {dateOptions.map((option) => (
            <h5
              className={activeDateOption === option ? "active" : ""}
              onClick={() => setActiveDateOption(option)}
            >
              {option}
            </h5>
          ))}
        </div>
      </div>
      <div className="combochart">
        <ReactApexChart
          options={dataApex.options}
          series={dataApex.series}
          type="line"
          height={"95%"}
        />
      </div>
    </div>
  );
}

export default ComboChart;
