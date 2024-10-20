import axios from "axios";
import { emailListDataType, filters } from "../constant";
import { getUserActivities } from "./indexedDB";

export const filterEmails = (list: emailListDataType[], filterKey: filters) => {
  return list?.filter((emailData) => emailData?.statuses?.includes(filterKey));
};

export const formatTimeStamp = (timestamp: number) => {
  const date = new Date(timestamp);

  // Format the date to dd/MM/yyyy hh:mm
 const formattedDate =date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

 return formattedDate.replace(',', '');
};

export const getEmails = async (
  pageNumber: number,
  filterKey: filters | null,
  limit?: number
) => {
  // #TODO
  //Hardcoded for now as limit is not applicable on the api
  limit = 10;
  //currently did not add the pagination on api , as api has constrains on filter
  const emails = await axios.get(`https://flipkart-email-mock.now.sh`);
  console.log({emails})
  const userActivityData = await getUserActivities();

  let list = emails?.data?.list?.map((emailData: emailListDataType) => {
    emailData.statuses = [];
    if (userActivityData?.Favorites?.includes(emailData?.id)) {
      emailData?.statuses?.push("Favorites");
    }
    if (userActivityData?.Read?.includes(emailData?.id)) {
      emailData?.statuses?.push("Read");
    } else {
      emailData?.statuses?.push("Unread");
    }
   emailData.formattedDate = formatTimeStamp(emailData?.date)
    return emailData;
  });
  if (filterKey) {
    list = filterEmails(list, filterKey);
  }
  return list?.splice((pageNumber - 1) * limit, limit * pageNumber);
};


export const getEmailDetails = async (id?:string) =>{
  const email = await axios.get(`https://flipkart-email-mock.now.sh/?id=${id}`);

  return email?.data?.body ?? ''
}