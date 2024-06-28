import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// If interceptors are required they can be placed here

// axios instance helper
async function axiosRequestHelper(
  method: 'get' | 'post',
  url: string,
  data?: unknown,
) {
  const config = {
    url,
    method,
    withCredentials: method === 'get',
    data,
  };

  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unknown error occurred');
  }
}

export default axiosRequestHelper;
