import useSWR from "swr"
import { UserAuthStore } from "@/store/userAuthStore";
import { API_DASHBOARD } from "@/api/api";
import { DashboardService } from "@/service/dashboard/DashboardService";
export const useGetListDashboard = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_DASHBOARD, dataFilter] : null, ([_, params]) => DashboardService.getDashboard(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        dashboards: data,
        isLoading,
        isValidating,
        error,
        refreshDashboard: mutate,
    };
}

