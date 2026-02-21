import { API_DASHBOARD } from "@/api/api"
import axiosClient from "../axiosClient"

export const DashboardService = {
    getDashboard: async (params) => {
        try {
            const res = await axiosClient.get(API_DASHBOARD, { params })
            if (res.status === 200) {
                return res
            }
        } catch (error) {
            throw error
        }
    }
}