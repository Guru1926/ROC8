import { useState } from "react";
import DatePicker from "react-multi-date-picker";


type DatePickerPropsType ={
  setFilters: React.Dispatch<React.SetStateAction<{
    gender: null;
    age: null;
    startDate: null;
    endDate: null;
}>>
}
const DatePickerComponent = (props:DatePickerPropsType) => {
  const {setFilters} =props
  const [value, setValue] = useState<any>(null);

  const formatDate = (date: any) => {
    if (!date) return '';
    const year = date.year;
    const month = String(date.month).padStart(2, '0'); 
    const day = String(date.day).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  };

  const handleChange = (props: any) => {
    const formattedDates = props.map((date: any) => formatDate(date));
    const startDate=formattedDates?.[0] ?? null
    const endDate =formattedDates?.[1] ?? null
     setFilters((prev)=>({...prev,startDate,endDate}))
    setValue(props); 
  };

  return (
    <DatePicker
      value={value}
      onChange={handleChange}
      range={true}
      arrow={false}
      placeholder="Select Date"
      style={{ width: '200px', padding: '7px', marginRight: '0px' }}
    />
  );
};

export default DatePickerComponent;