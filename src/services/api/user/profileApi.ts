import axiosBase from "@/services/axiosBase";
import { getCookie } from "@/libs/cookies";

const getProfile = async () => {
  const response = await axiosBase.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${getCookie("company_token")}`,
    },
  });
  return response.data;
};

export default {
  getProfile,
};