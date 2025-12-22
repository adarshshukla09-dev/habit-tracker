import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function HabitGraph({ data, setGraphRange }) {
const chartData = {
  labels: data.map((d) => d.date),
  datasets: [
    {
      label: "Habits Completed",
      data: data.map((d) => d.count),
      tension: 0.4,
      borderColor: "oklch(76.8% 0.233 130.85)",
      backgroundColor: "oklch(76.8% 0.233 130.85 / 0.3)",
      pointBackgroundColor: "oklch(76.8% 0.233 130.85)",
      
    },
  ],
};


  const options = {
  responsive: true,
  layout: {
    padding: {
      top: 20, // extra space above chart
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#000000", // dark black legend text
      },
    },
  },
  scales: {
    x: {
      border: {
        color: "#000000", // dark black axis line
        width: 2,
      },
      ticks: {
        color: "#000000", // dark black labels
      },
      grid: {
        color: "rgba(0, 0, 0, 0.15)",
      },
    },
    y: {
      beginAtZero: true,
      grace: "10%", // 👈 adds extra space at top of Y-axis
      border: {
        color: "#000000",
        width: 2,
      },
      ticks: {
        stepSize: 1,
        color: "#000000",
      },
      grid: {
        color: "rgba(0, 0, 0, 0.15)",
      },
    },
  },
};



  return (
    <div className="mt-6 p-4 bg-white/40 rounded-lg shadow">
      <div className="flex justify-end">
        <button
          className="border rounded-md mx-5 hover:bg-black hover:text-white"
          onClick={() => setGraphRange(7)}
        >
          7 Days
        </button>
        <button
          className="border rounded-md mx-5 hover:bg-black hover:text-white"
          onClick={() => setGraphRange(31)}
        >
          31 Days
        </button>
      </div>
      <Line className="text-oklch(76.8% 0.233 130.85)" data={chartData} options={options} />
    
    </div>
  );
}
