import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { colorCodes } from '../constant';

type BarChartPropType ={
  graphData:any
  setSelectedLabel:React.Dispatch<React.SetStateAction<string>>
}

const BarChartComponent = (props:BarChartPropType) => {
  const {graphData,setSelectedLabel} = props

  const barGraphData=useMemo(()=>{
    const catagories =['A','B','C','D','E','F']
   return  catagories?.map((category)=>{
   return  { name: category, value: graphData?.[0]?.[`overallTotal${category}`] }
    })

  },[graphData])


  const handleClick = (data:any) => {
    console.log(`Clicked on bar with label: ${data.name}`);
    setSelectedLabel(data?.name ?? 'A')

  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        layout="vertical"
        data={barGraphData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number"   label={{ value: 'Time Spent', position: 'insideBottomRight', offset: 0 }} />
        
        <YAxis dataKey="name" type="category"  label={{ value: 'Features', angle: -90, position: 'insideLeft', offset: 10 }}/>
        <Tooltip />
        <Bar dataKey="value" fill={colorCodes.GRAPH} onClick={handleClick} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;