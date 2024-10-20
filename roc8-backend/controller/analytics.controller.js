import Analytics from "../model/analytics.model.js";

function convertToUTCDate(dateString) {
  const [day, month, year] = dateString.split("/").map(Number);
  // Create a new Date object in UTC
  return new Date(Date.UTC(year, month - 1, day)); // Month is 0-indexed
}

export const updateData = async (data) => {
  const transformedData = data?.map((item) => ({
    ...item,
    Day: convertToUTCDate(item.Day), // Convert Day field
  }));
  await Analytics.insertMany(transformedData);
  return "updated the data";
};

export const getData = async (
  gender = null,
  startDate = null,
  endDate = null,
  age=null
) => {
  try {
    let matchConditions = {}
    if(gender){
      matchConditions.Gender=gender 
    }
    if(age){
      matchConditions.Age=age 
    }
    if (startDate || endDate) {
      const dateConditions = {};
      if (startDate) {
        dateConditions.$gte = new Date(startDate);
      }
      if (endDate) {
        dateConditions.$lte = new Date(endDate);
      }
      matchConditions.Day = dateConditions;
    }

    const result = await Analytics.aggregate([
      {
        $match: matchConditions,
      },
      {
        $group: {
          _id: "$Day",
          totalA: { $sum: "$A" }, 
          totalB: { $sum: "$B" }, 
          totalC: { $sum: "$C" },
          totalD: { $sum: "$D" },
          totalE: { $sum: "$E" }, 
          totalF: { $sum: "$F" },
        },
      },
      {
        $group: {
          _id: null,
          totalsByDate: {
            $push: {
              date: "$_id",
              totalA: "$totalA",
              totalB: "$totalB",
              totalC: "$totalC",
              totalD: "$totalD",
              totalE: "$totalE",
              totalF: "$totalF",
            },
          },
          overallTotalA: { $sum: "$totalA" }, 
          overallTotalB: { $sum: "$totalB" }, 
          overallTotalC: { $sum: "$totalC" }, 
          overallTotalD: { $sum: "$totalD" }, 
          overallTotalE: { $sum: "$totalE" }, 
          overallTotalF: { $sum: "$totalF" },
        },
      },
    ]);

    return result;
  } catch (error) {
    console.error("Error during aggregation:", error);
    throw error; // Rethrow the error if needed
  }
};
