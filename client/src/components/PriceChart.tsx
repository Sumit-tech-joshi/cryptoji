// client/src/components/PriceChart.tsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import chartLoader from "../assets/loader-chart.webm";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

interface PriceChartProps {
  coinId: string; // e.g. 'bitcoin'
  title: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ coinId, title }) => {
  const [selectedRange, setSelectedRange] = useState("1"); // '1', '30', '365', 'max'
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const rangeMap: Record<string, string> = {
    "1": "1 Day",
    "30": "30 Days",
    "365": "1 Year",
    "400": "All Time",
  };

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://cryptoji.onrender.com/api/chart/${coinId}?days=${selectedRange}`
      );
      const prices = response.data.prices;

      const labels = prices.map((entry: any) => {
        const date = new Date(entry[0]);
        return selectedRange === "1"
          ? date.toLocaleTimeString()
          : date.toLocaleDateString();
      });

      const data = {
        labels,
        datasets: [
          {
            label: `${coinId.toUpperCase()} Price`,
            data: prices.map((entry: any) => entry[1]),
            fill: false,
            borderColor: "#ffa500",
            tension: 0.3,
          },
        ],
      };

      setChartData(data);
    } catch (error) {
      console.error("Chart Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedRange, coinId]);


  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="chart-filters">
          {Object.keys(rangeMap).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedRange(key)}
              className={`filter-btn ${selectedRange === key ? "active" : ""}`}
            >
              {rangeMap[key]}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="coin-loader-wrapper">
        <video src={chartLoader} autoPlay loop muted width="120" />
        </div>
      ) : (
        chartData && <Line key={selectedRange} data={chartData} />
      )}
    </div>
  );
};

export default PriceChart;
