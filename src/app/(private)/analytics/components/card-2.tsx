"use client";
import { GenericCard } from "@/components/ui/card";
import { Soon } from "@/components/ui/soon";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import Chart from "react-apexcharts";
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function AnalyticsCard2() {
  const [state] = useState<{
    series: ApexNonAxisChartSeries;
    options: ApexOptions;
  }>({
    series: [67],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          track: {
            background: "#1f1f1f",
          },
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function (val) {
                return val + "%";
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        colors: ["#cb0c9f"],
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
        colors: ["#cb0c9f"],
      },
      labels: ["Median Ratio"],
    },
  });

  return (
    <GenericCard className="xl:col-span-1">
      <Soon />
      <Chart
        options={state.options}
        series={state.series}
        type="radialBar"
        height={350}
      />
    </GenericCard>
  );
}
