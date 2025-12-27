'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

type Props = Readonly<{
  data: ReadonlyArray<
    Readonly<{
      dateLabel: string;
      total: number;
    }>
  >;
}>;

export function SalesChart({ data }: Props) {
  const isSinglePoint = data.length === 1;

  const chartData: Array<{ dateLabel: string; total: number }> = data.map(
    ({ dateLabel, total }) => ({ dateLabel, total })
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      {isSinglePoint ? (
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateLabel" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#f97316" radius={[6, 6, 0, 0]} />
        </BarChart>
      ) : (
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateLabel" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}
