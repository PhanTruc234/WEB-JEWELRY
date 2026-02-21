import useSWR from "swr"
import { UserAuthStore } from "@/store/userAuthStore";
import { API_GET_ONTIME_PRODUCT } from "@/api/api";
import { ProductService } from "@/service/product/ProductService";
export const useGetListOnTime = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_GET_ONTIME_PRODUCT, dataFilter] : null, ([_, params]) => ProductService.getOntime(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        productOnTimes: data,
        isLoading,
        isValidating,
        error,
        refreshOnTime: mutate,
    };
}

