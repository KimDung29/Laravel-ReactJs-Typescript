import axios from 'axios';

const axiosClient = axios.create({
	baseURL: `${import.meta.env.VITE_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('ACCESS_TOKEN');
	const userId = localStorage.getItem('CURRENT_USER_ID')

	config.headers.Authorization = `Bearer ${token}`;
	config.headers['X-Id'] = userId;
	config.headers['Content-Type'] = 'multipart/form-data';
	
	return config;
})

axiosClient.interceptors.response.use((response) => {
	console.log('response axios: ', response)
	return response;
}, (error) => {

	if(error.response.status === 401){
		localStorage.removeItem('ACCESS_TOKEN');
	}
	else if(error.response.status === 404) {
		return 'Not Found';
	}
	else if(error.response.status === 422) {
		return error.response
	}

	throw error;
})

export default axiosClient;