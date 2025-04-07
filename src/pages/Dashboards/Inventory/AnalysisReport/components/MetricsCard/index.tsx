import { SmallAreaChart } from "./components/SmallAreaChart";
import { getBgColor, getIconColor, getTextColor } from "./utils/color.util";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  percentage: number;
  trend: "up" | "down";
  chartData: { x: string; y: number }[];
  metric: string;
}

export const MetricsCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  percentage,
  trend,
  chartData,
  metric,
}) => {
  return (
    <div className={`card ${getBgColor(metric)}`}>
      <div className="card-body">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div
              className={`size-12 flex items-center justify-center rounded-md ${getIconColor(
                metric
              )}`}
            >
              {icon}
            </div>
          </div>
          <div className="flex-grow">
            <h5 className={`mb-1 text-16 font-medium ${getTextColor(metric)}`}>
              {title}
            </h5>
            <p className={`${getTextColor(metric)} opacity-80`}>{value}</p>
          </div>
          <div
            className={`flex-shrink-0 text-${
              trend === "up" ? "green" : "red"
            }-600 dark:text-${trend === "up" ? "green" : "red"}-300`}
          >
            <span className="text-16">{percentage}%</span>
            <i className={`ri-arrow-${trend}-line align-middle`}></i>
          </div>
        </div>
        <SmallAreaChart data={chartData} metric={metric} title={title} />
      </div>
    </div>
  );
};
