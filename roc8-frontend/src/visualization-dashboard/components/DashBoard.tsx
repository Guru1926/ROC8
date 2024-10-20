import styled from "styled-components";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { colorCodes } from "../constant";
import DateRangePickerComponent from "./DateRangePicker";
import CustomDropdown from "./SelectionDropdown";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContextProvider";
import { getAnalyticalData } from "../api/axios";
import Loader from "./Loader";

const DashBoard = () => {
  const authContext = useContext(AuthContext);
  const [loading,setLoading]=useState<boolean>(false)

  const [filters,setFilters] = useState({
    gender:null,
    age:null,
    startDate:null,
    endDate:null
  })

  const [graphData,setGraphData]=useState<any>({})
  const [selectedLabel,setSelectedLabel]=useState<string>('A')

const fetchGraphData = async()=>{
  const data=await getAnalyticalData(filters,authContext?.state?.token)
setGraphData(data)
setLoading(false)

}
  useEffect(()=>{
    setLoading(true)
    fetchGraphData()
    
  },[filters])



  return (
    <DashboardPageContainer>
      <FilterContainer>
        <DateRangePickerComponent setFilters={setFilters}/>
        <CustomDropdown
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          onSelect={(props: any) => {
            setFilters((prev) => ({...prev,gender:props?.label}))
          }}
        />
        <CustomDropdown
          options={[
            { value: "15-25", label: "15-25" },
            { value: ">25", label: ">25" },
          ]}
          onSelect={(props: any) => {
            setFilters((prev) => ({...prev,age:props?.label}))
          }}
        />
        <LogoutButton onClick={authContext?.userLogout}>Logout</LogoutButton>
      </FilterContainer>
{loading ?  <Loader/> :
      <GraphContainer>
        <ChartContainer>
          <BarChart graphData={graphData} setSelectedLabel={setSelectedLabel}/>
        </ChartContainer>
        <ChartContainer>
          <LineChart graphData={graphData} selectedLabel={selectedLabel}/>
        </ChartContainer>
      </GraphContainer>}
    </DashboardPageContainer>
  );
};

export default DashBoard;

const DashboardPageContainer = styled.div`
  background-color: ${colorCodes.BACKGROUND};
  padding: 2rem 0rem;
  height: 100vh;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  box-sizing: border-box;
`;

const FilterContainer = styled.div`
  margin: auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-end;
  column-gap: 2rem;
  align-items: center;
`;

const GraphContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  width: 100%;
  margin: auto;
`;

const ChartContainer = styled.div`
  width: 60%;
  margin: 1rem;
  height: 500px;
`;


const LogoutButton = styled.button`
padding: 0.7rem;
background-color: ${colorCodes.GRAPH};
color: white;
border: none;
border-radius: 0.5rem;
cursor: pointer;

&:hover {
  background-color: #0056b3;
}
`;