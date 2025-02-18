import axiosBase from "@/services/axiosBase";

const getContact = async () => {
  const response = await axiosBase.get("/contacts");
  return response.data;
}

export default {
  getContact
}