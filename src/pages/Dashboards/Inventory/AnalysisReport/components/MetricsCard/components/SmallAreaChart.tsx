import { useMemo } from "react";
import { getChartColors } from "../utils/color.util";
import { formatMoneyWithVND } from "helpers/utils";
import ReactApexChart from "react-apexcharts";

interface SmallChartProps {
  data: { x: string; y: number }[];
  metric: string;
  title: string;
}

export const SmallAreaChart: React.FC<SmallChartProps> = ({ data, metric, title }) => {
  const isDark = document.documentElement.classList.contains("dark");
  const chartColors = getChartColors(metric);

  const options = useMemo(
    () => ({
      chart: {
        type: "area" as const,
        height: 100,
        sparkline: {
          enabled: true,
        },
        toolbar: {
          show: false,
        },
        background: "transparent",
      },
      stroke: {
        curve: "smooth" as const,
        width: 2,
        colors: [isDark ? chartColors.dark.stroke : chartColors.stroke],
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100],
          colorStops: [
            {
              offset: 0,
              color: isDark ? chartColors.dark.fill : chartColors.fill,
              opacity: 0.45,
            },
            {
              offset: 100,
              color: isDark ? chartColors.dark.fill : chartColors.fill,
              opacity: 0.05,
            },
          ],
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: true,
        },
        y: {
          formatter: function (value: number) {
            if (metric === "totalValue") {
              return formatMoneyWithVND(value);
            }
            return value.toLocaleString();
          },
        },
        marker: {
          show: false,
        },
        theme: isDark ? "dark" : "light",
        style: {
          fontSize: "12px",
          fontFamily: "inherit",
        },
      },
      grid: {
        show: false,
      },
    }),
    [metric, isDark, chartColors]
  );

  return (
    <div className="mt-4">
      {/* <p className={`text-xs ${getTextColor(metric)} opacity-75 mb-2`}>
        30-Day Overview
      </p> */}
      <ReactApexChart
        options={options}
        series={[{ data, name: title }]}
        type="area"
        height={50}
      />
    </div>
  );
};