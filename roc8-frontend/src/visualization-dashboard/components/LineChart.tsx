import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { colorCodes } from '../constant';

type LineChartPropType ={
  graphData:any
  selectedLabel:string
}
const LineChartComponent = (props:LineChartPropType) => {
  const {graphData,selectedLabel} = props
  const lineGraphData = useMemo(() => {
    return graphData?.[0]?.totalsByDate?.map((totalByDate:any) => ({
      name: totalByDate?.date?.split('T')[0],
      value: totalByDate?.[`total${selectedLabel}`]
    }));
  }, [graphData,selectedLabel]);

  const formatXAxis = (tickItem:any) => {
    // Formatting the date as  "Jan 01"
    const date = new Date(tickItem);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={lineGraphData}
     
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={70}
          interval="preserveStartEnd"
          tickFormatter={formatXAxis}
          label={{ value: 'Day', position: 'insideBottomRight', offset: 0 }}
        />
        <YAxis 
          label={{ value: 'Time Spent', angle: -90, position: 'insideLeft', offset: 10 }}
          tickFormatter={(value) => new Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' }).format(value)}
        />
        <Tooltip />
  
        <Line type="monotone" dataKey="value" stroke={colorCodes.GRAPH} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;