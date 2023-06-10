import axiosInstance, { AxiosError } from "axios";

import { WEATHER_PROVIDER } from "../common/constants";
import { ApiErrorResponse } from "../common/interfaces";

export const axios = axiosInstance.create({
    baseURL: `https://${WEATHER_PROVIDER.BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": WEATHER_PROVIDER.API_KEY,
        "X-RapidAPI-Host": WEATHER_PROVIDER.BASE_URL
    },
});

axios.interceptors.response.use(function(response) {
    return response
}, function (error) {
    const err = error as AxiosError;
    const status = err?.response?.status || 0;
    const errorData = err?.response?.data as ApiErrorResponse;

    if (status !== 200 && errorData.error) {
        return Promise.reject(errorData.error.message)
    }
    return Promise.reject(err)
})