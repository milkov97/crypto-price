import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ChartData,
} from "chart.js";

interface ChartProps {
  data?: ChartData<"line">;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const emptyChartData: ChartData<"line"> = {
    labels: [],
    datasets: []
}

const Chart = ({ data }: ChartProps) => {
  return (
    <Line
      data={data || emptyChartData}
      options={{
        indexAxis: "x",
        responsive: true,
        aspectRatio: 2,
        maintainAspectRatio: true,
      }}
    />
  );
};

export default Chart;
