import axios from 'axios'

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const adminLogin = async ({ email, password }) => {
	const response = await apiClient.post('/auth/admin/login', {
		email,
		password,
	})

	return response.data
}

const getAuthConfig = (token) => {
	const authToken = token || localStorage.getItem('adminToken')
	return {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	}
}

export const getAllDoctors = async (token) => {
	const response = await apiClient.get('/doctors', getAuthConfig(token))
	return response.data
}

export const getAllPatients = async (token) => {
	const response = await apiClient.get('/patients', getAuthConfig(token))
	return response.data
}

export const getAllAppointments = async (token) => {
	const response = await apiClient.get('/appointments', getAuthConfig(token))
	return response.data
}

export const createDoctor = async (payload, token) => {
	const response = await apiClient.post(
		'/doctors',
		{
			...payload,
			role: 'doctor',
		},
		getAuthConfig(token)
	)
	return response.data
}

export const createPatient = async (payload, token) => {
	const response = await apiClient.post(
		'/patients',
		{
			...payload,
			role: 'patient',
		},
		getAuthConfig(token)
	)
	return response.data
}

export const createAppointment = async (payload, token) => {
	const response = await apiClient.post('/appointments', payload, getAuthConfig(token))
	return response.data
}

const api = {
	adminLogin,
	getAllDoctors,
	getAllPatients,
	getAllAppointments,
	createDoctor,
	createPatient,
	createAppointment,
}

export default api
