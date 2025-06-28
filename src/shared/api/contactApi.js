import axiosInstance from "../utils/axios";

const contactApi = {
  // Gửi email liên hệ
  sendContactEmail: async (contactData) => {
    try {
      const response = await axiosInstance.post('api/contact/send-email', contactData)
      return response.data
    } catch (error) {
      console.error('Lỗi gửi email liên hệ:', error)
      throw error
    }
  }
}

export default contactApi
