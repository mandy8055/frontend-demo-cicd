import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import { axiosRequestHelper } from 'src/app/common/utils';

const axiosBaseQuery: BaseQueryFn<
  { url: string; method: 'get' | 'post'; data?: unknown },
  unknown,
  unknown
> = async ({ url, method, data }) => {
  try {
    const result = await axiosRequestHelper(method, url, data);
    return { data: result };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data || error.message };
    } else {
      return { error: 'An unknown error occurred' };
    }
  }
};

export default axiosBaseQuery;
