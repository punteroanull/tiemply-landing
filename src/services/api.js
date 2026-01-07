import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://admin.tiemply.com/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 422) {
      // Validation errors
      const errors = error.response.data.errors || {}
      return Promise.reject({
        type: 'validation',
        errors,
        message: error.response.data.message || 'Error de validación'
      })
    }

    return Promise.reject({
      type: 'error',
      message: error.response?.data?.message || 'Ha ocurrido un error inesperado'
    })
  }
)

export const companyService = {
  /**
   * Registrar una nueva empresa
   * @param {Object} data - Datos del registro
   * @returns {Promise}
   */
  async register(data) {
    const response = await api.post('/company-registration-requests', {
      // Datos del solicitante (administrador de la empresa)
      applicant_name: data.applicantName,
      applicant_email: data.applicantEmail,
      applicant_password: data.applicantPassword,
      applicant_password_confirmation: data.applicantPasswordConfirmation,
      applicant_identification_number: data.applicantIdNumber || null,
      applicant_phone: data.applicantPhone || null,
      applicant_address: data.applicantAddress || null,

      // Datos de la empresa
      company_name: data.companyName,
      company_tax_id: data.companyTaxId,
      company_contact_email: data.companyEmail,
      company_contact_person: data.companyContactPerson,
      company_phone: data.companyPhone,
      company_address: data.companyAddress,

      // Plan seleccionado (para procesar después)
      selected_plan: data.selectedPlan || 'starter',
    })

    return response.data
  },

  /**
   * Consultar estado de una solicitud de registro
   * @param {string} requestId - ID de la solicitud
   * @returns {Promise}
   */
  async getRequestStatus(requestId) {
    const response = await api.get(`/company-registration-requests/${requestId}`)
    return response.data
  },
}

export default api
