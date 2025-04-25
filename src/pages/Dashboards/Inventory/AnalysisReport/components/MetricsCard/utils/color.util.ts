// Define background colors for different metrics
export const getBgColor = (metricType: string) => {
  const colors = {
    totalInventory: "bg-purple-500/10 dark:bg-purple-500/20",
    totalValue: "bg-green-500/10 dark:bg-green-500/20",
    newArrivals: "bg-blue-500/10 dark:bg-blue-500/20",
    returns: "bg-red-500/10 dark:bg-red-500/20",
  };
  return (
    colors[metricType as keyof typeof colors] ||
    "bg-custom-500/10 dark:bg-custom-500/20"
  );
};

// Define text colors for different metrics
export const getTextColor = (metricType: string) => {
  const colors = {
    totalInventory: "text-purple-600 dark:text-purple-300",
    totalValue: "text-green-600 dark:text-green-300",
    newArrivals: "text-blue-600 dark:text-blue-300",
    returns: "text-red-600 dark:text-red-300",
  };
  return (
    colors[metricType as keyof typeof colors] ||
    "text-custom-600 dark:text-custom-300"
  );
};

// Define icon colors for different metrics
export const getIconColor = (metricType: string) => {
  const colors = {
    totalInventory:
      "bg-purple-500/20 text-purple-600 dark:bg-purple-500/30 dark:text-purple-300",
    totalValue:
      "bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-300",
    newArrivals:
      "bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-blue-300",
    returns: "bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-300",
  };
  return (
    colors[metricType as keyof typeof colors] ||
    "bg-custom-500/20 text-custom-600 dark:bg-custom-500/30 dark:text-custom-300"
  );
};

// Add a new function to get chart colors
export const getChartColors = (metricType: string) => {
  const colors = {
    totalInventory: {
      stroke: "#9333EA", // purple-600
      fill: "#A855F7", // purple-500
      dark: {
        stroke: "#C084FC", // purple-400
        fill: "#A855F7", // purple-500
      },
    },
    totalValue: {
      stroke: "#16A34A", // green-600
      fill: "#22C55E", // green-500
      dark: {
        stroke: "#4ADE80", // green-400
        fill: "#22C55E", // green-500
      },
    },
    newArrivals: {
      stroke: "#2563EB", // blue-600
      fill: "#3B82F6", // blue-500
      dark: {
        stroke: "#60A5FA", // blue-400
        fill: "#3B82F6", // blue-500
      },
    },
    returns: {
      stroke: "#DC2626", // red-600
      fill: "#EF4444", // red-500
      dark: {
        stroke: "#F87171", // red-400
        fill: "#EF4444", // red-500
      },
    },
  };
  return (
    colors[metricType as keyof typeof colors] || {
      stroke: "#0284C7", // sky-600
      fill: "#0EA5E9", // sky-500
      dark: {
        stroke: "#38BDF8", // sky-400
        fill: "#0EA5E9", // sky-500
      },
    }
  );
};