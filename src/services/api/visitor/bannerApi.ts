import axiosBase from "@/services/axiosBase"

const getBanner = async () => {
  const response = await axiosBase.get("/banners")
  return response.data
}

export default {
  getBanner
}