import axiosBase from "@/services/axiosBase";

const getDescription = async () => {
  const response = await axiosBase.get("/descriptions");
  return response.data;
};

export default {
  getDescription,
}