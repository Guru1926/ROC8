const BASE_URL= 'https://roc8-backend.vercel.app'
import axios from "axios";

export const signup = async (email: string, password: string, name: string) => {
  const signupResponse = await axios.post(`${BASE_URL}/user/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
  return signupResponse.data;
};

export const login = async (email: string, password: string) => {
  const loginResponse = await axios.post(
    `${BASE_URL}/user/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return loginResponse.data;
};

export const verifyJWTToken = async (token?: string) => {
  try {
    const verficationResponse = await axios.get(
      `${BASE_URL}/user/verify`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return verficationResponse.status === 200;
  } catch (err) {
    console.log("Token verification failed");
    return false;
  }
};

export const getAnalyticalData = async (
  filters: any,
  token?: string | null
) => {
  try {
    let url = `${BASE_URL}/analytics/list?`;
    Object.keys(filters ?? {}).forEach((filter: any) => {
      if (filters?.[filter]) {
        url += `&${filter}=${filters?.[filter]}`;
      }
    });
    const analyticsResponse = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return analyticsResponse?.data;
  } catch (err) {
    console.log("Failed to fetch data");
    return {};
  }
};
