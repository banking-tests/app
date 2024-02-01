import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function PieChartComponent(props) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <>
      <ResponsiveContainer width={"100%"} height={200}>
        <PieChart>
          <Pie
            data={props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {props.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
