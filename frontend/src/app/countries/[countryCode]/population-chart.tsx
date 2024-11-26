"use client";

import { type FC } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";

const chartConfig = {
  population: {
    label: "Population",
    color: "#000",
  },
} satisfies ChartConfig;

type Props = {
  population: {
    year: number;
    value: number;
  }[];
};

export const PopulationChart: FC<Props> = ({ population }) => {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={population}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="value"
          type="natural"
          strokeWidth={2}
          stroke={chartConfig.population.color}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};
