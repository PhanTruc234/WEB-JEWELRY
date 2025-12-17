import { API_LOGOUT, API_SIGN_IN, API_SIGN_UP } from "@/api/api"
import axiosClient from "../axiosClient"

export const userService = {
    signUp: async (fullName, email, password) => {
        try {
            const res = await axiosClient.post(API_SIGN_UP, { fullName, email, password })
            if (res.status === 201) {
                return res;
            }
        } catch (error) {
            return error.response.data.message
        }
    },
    login: async (email, password) => {
        try {
            const res = await axiosClient.post(API_SIGN_IN, { email, password })
            if (res.status === 200) {
                return res
            }
        } catch (error) {
            return error.response.data.message
        }
    },
    logout: async () => {
        try {
            const res = await axiosClient.get(API_LOGOUT)
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    }
}