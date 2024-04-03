import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataset,
  ChartData,
  LayoutPosition,
  TooltipItem,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

type PieChartProps = {
  labels: Array<string>;
  datasets: ChartDataset<'pie', number[]>;
  legendPosition?: LayoutPosition;
  labelFormatter?: (context: TooltipItem<'pie'>) => string;
};

export const PieChart = ({
  labels,
  datasets,
  legendPosition,
  labelFormatter,
}: PieChartProps) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data: ChartData<'pie', number[], string> = {
    labels: labels,
    datasets: [datasets],
  };

  return (
    <>
      <Pie
        data={data}
        options={{
          plugins: {
            legend: {
              position: legendPosition,
            },
            tooltip: {
              callbacks: {
                label: labelFormatter,
              },
            },
          },
        }}
      />
    </>
  );
};
