import { axiosRequestHelper } from 'src/app/common/utils';

export default async function welcomePageLoader() {
  const response = await axiosRequestHelper('get', '/api/welcome');
  return response;
}
