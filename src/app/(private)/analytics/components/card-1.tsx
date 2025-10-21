"use client";
import { GenericCard } from "@/components/ui/card";
import { Soon } from "@/components/ui/soon";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import Chart from "react-apexcharts";
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function AnalyticsCard1() {
  const [state] = useState<{
    series: ApexAxisChartSeries;
    options: ApexOptions;
  }>({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        background: "transparent",
      },
      theme: {
        mode: "dark",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      colors: ["#cb0c9f"],
      grid: {
        row: {
          colors: ["#1f1f1f", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });

  return (
    <GenericCard className="xl:col-span-2">
      <Soon />
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </GenericCard>
  );
}
