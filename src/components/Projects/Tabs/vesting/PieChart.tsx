'use client';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

const initialData = [
	{
		name: 'sector 1',
		value: 35,
	},
	{
		name: 'sector 2',
		value: 30,
	},
];

const Chart: React.FC<{ percentClaimed: number }> = ({ percentClaimed }) => {
	const [chartData, setChartData] = useState(initialData);

	useEffect(() => {
		setChartData([
			{
				name: 'sector 1',
				value: 100 - percentClaimed,
			},
			{
				name: 'sector 2',
				value: percentClaimed,
			},
		]);
	}, [percentClaimed]);

	return (
		<PieChart
			id="test"
			width={300} // Reduced width to make the chart smaller
			height={300} // Reduced height to make the chart smaller
			className="absolute left-1/2 top-1/2 -translate-x-1/2 rotate-90 bg-transparent"
		>
			<defs>
				<linearGradient id="blueGrad" x1="1" y1="1" x2="0" y2="0">
					<stop offset="0%" stopColor="#F2F2F2" stopOpacity={1} />
					<stop offset="95%" stopColor="#F2F2F2" stopOpacity={1} />
				</linearGradient>
				<linearGradient id="grayGrad" x1="1" y1="1" x2="0" y2="0">
					<stop offset="40%" stopColor="#9E98EB" stopOpacity={1} />
					<stop offset="90%" stopColor="#9E98EB" stopOpacity={1} />
				</linearGradient>
			</defs>
			<Pie
				dataKey="value"
				data={chartData}
				cx="50%" // Keep it centered within the smaller chart
				cy="50%" // Keep it centered within the smaller chart
				innerRadius={110} // Reduced inner radius for smaller chart
				outerRadius={120} // Reduced outer radius for smaller chart
				paddingAngle={5}
				cornerRadius={20}
				legendType="none"
				labelLine={false}
				strokeWidth={0}
				strokeOpacity={0}
				isAnimationActive={true}
			>
				<Cell fill="url(#blueGrad)" />
				<Cell fill="url(#grayGrad)" />
			</Pie>
		</PieChart>
	);
};

export default Chart;
