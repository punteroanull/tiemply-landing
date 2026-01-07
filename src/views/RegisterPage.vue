<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { companyService } from '@/services/api'

const route = useRoute()
const router = useRouter()

// Steps
const currentStep = ref(1)
const totalSteps = 3

// Plans
const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Gratis',
    description: 'Hasta 5 empleados',
    features: ['Fichaje básico', 'Informes básicos', 'Soporte email'],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '4,99€',
    priceNote: '/empleado/mes',
    description: 'Empleados ilimitados',
    features: ['Todo de Starter', 'Geolocalización', 'Gestión ausencias', 'Soporte prioritario'],
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Personalizado',
    description: 'Grandes organizaciones',
    features: ['Todo de Professional', 'API personalizada', 'SLA garantizado', 'Gestor dedicado'],
  },
]

// Form data
const formData = ref({
  // Step 1: Plan selection
  selectedPlan: route.query.plan || 'professional',

  // Step 2: Company data
  companyName: '',
  companyTaxId: '',
  companyEmail: '',
  companyContactPerson: '',
  companyPhone: '',
  companyAddress: '',

  // Step 3: Admin data
  applicantName: '',
  applicantEmail: '',
  applicantPhone: '',
  applicantPassword: '',
  applicantPasswordConfirmation: '',
  acceptTerms: false,
})

// Validation errors
const errors = ref({})

// UI state
const isSubmitting = ref(false)
const submitError = ref('')

// Validation
const validateStep = (step) => {
  errors.value = {}

  if (step === 2) {
    if (!formData.value.companyName) errors.value.companyName = 'El nombre de la empresa es obligatorio'
    if (!formData.value.companyTaxId) errors.value.companyTaxId = 'El CIF/NIF es obligatorio'
    if (!formData.value.companyEmail) errors.value.companyEmail = 'El email de la empresa es obligatorio'
    if (!formData.value.companyContactPerson) errors.value.companyContactPerson = 'La persona de contacto es obligatoria'
    if (!formData.value.companyPhone) errors.value.companyPhone = 'El teléfono es obligatorio'
    if (!formData.value.companyAddress) errors.value.companyAddress = 'La dirección es obligatoria'
  }

  if (step === 3) {
    if (!formData.value.applicantName) errors.value.applicantName = 'El nombre es obligatorio'
    if (!formData.value.applicantEmail) errors.value.applicantEmail = 'El email es obligatorio'
    if (!formData.value.applicantPassword) {
      errors.value.applicantPassword = 'La contraseña es obligatoria'
    } else if (formData.value.applicantPassword.length < 8) {
      errors.value.applicantPassword = 'La contraseña debe tener al menos 8 caracteres'
    }
    if (formData.value.applicantPassword !== formData.value.applicantPasswordConfirmation) {
      errors.value.applicantPasswordConfirmation = 'Las contraseñas no coinciden'
    }
    if (!formData.value.acceptTerms) {
      errors.value.acceptTerms = 'Debes aceptar los términos y condiciones'
    }
  }

  return Object.keys(errors.value).length === 0
}

// Navigation
const nextStep = () => {
  if (validateStep(currentStep.value)) {
    if (currentStep.value < totalSteps) {
      currentStep.value++
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    errors.value = {}
  }
}

const selectPlan = (planId) => {
  formData.value.selectedPlan = planId
}

// Submit
const handleSubmit = async () => {
  if (!validateStep(3)) return

  isSubmitting.value = true
  submitError.value = ''

  try {
    const response = await companyService.register(formData.value)

    // Redirect to success page
    router.push({
      name: 'RegisterSuccess',
      query: { requestId: response.data.request_id }
    })
  } catch (error) {
    if (error.type === 'validation') {
      // Map backend errors to form fields
      Object.keys(error.errors).forEach(key => {
        const mappedKey = key.replace('applicant_', 'applicant').replace('company_', 'company')
        errors.value[mappedKey] = error.errors[key][0]
      })
    } else {
      submitError.value = error.message
    }
  } finally {
    isSubmitting.value = false
  }
}

// Progress
const progressWidth = computed(() => `${(currentStep.value / totalSteps) * 100}%`)

onMounted(() => {
  setTimeout(() => {
    if (window.feather) window.feather.replace()
  }, 100)
})

watch(currentStep, () => {
  setTimeout(() => {
    if (window.feather) window.feather.replace()
  }, 100)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="container-custom">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-dark mb-4">
          Crea tu cuenta de empresa
        </h1>
        <p class="text-gray-600">
          Completa los siguientes pasos para empezar tu prueba gratuita de 14 días
        </p>
      </div>

      <!-- Progress Bar -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-600">Paso {{ currentStep }} de {{ totalSteps }}</span>
          <span class="text-sm text-gray-500">
            {{ currentStep === 1 ? 'Selecciona plan' : currentStep === 2 ? 'Datos empresa' : 'Tu cuenta' }}
          </span>
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
            :style="{ width: progressWidth }"
          ></div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <!-- Step 1: Plan Selection -->
        <div v-if="currentStep === 1">
          <h2 class="text-xl font-bold text-dark mb-6">Selecciona tu plan</h2>
          <div class="space-y-4">
            <div
              v-for="plan in plans"
              :key="plan.id"
              @click="selectPlan(plan.id)"
              class="p-6 border-2 rounded-xl cursor-pointer transition-all duration-200"
              :class="[
                formData.selectedPlan === plan.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              ]"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center">
                    <h3 class="font-bold text-dark">{{ plan.name }}</h3>
                    <span
                      v-if="plan.featured"
                      class="ml-2 px-2 py-0.5 bg-primary-500 text-white text-xs font-medium rounded-full"
                    >
                      Recomendado
                    </span>
                  </div>
                  <p class="text-gray-500 text-sm mt-1">{{ plan.description }}</p>
                  <ul class="mt-3 space-y-1">
                    <li
                      v-for="feature in plan.features"
                      :key="feature"
                      class="text-sm text-gray-600 flex items-center"
                    >
                      <i data-feather="check" class="w-4 h-4 text-teal-500 mr-2"></i>
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                <div class="text-right ml-4">
                  <div class="text-2xl font-bold text-dark">{{ plan.price }}</div>
                  <div v-if="plan.priceNote" class="text-xs text-gray-500">{{ plan.priceNote }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Company Data -->
        <div v-else-if="currentStep === 2">
          <h2 class="text-xl font-bold text-dark mb-6">Datos de la empresa</h2>
          <div class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">Nombre de la empresa *</label>
                <input
                  v-model="formData.companyName"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.companyName }"
                  placeholder="Empresa S.L."
                />
                <p v-if="errors.companyName" class="form-error">{{ errors.companyName }}</p>
              </div>
              <div>
                <label class="form-label">CIF/NIF *</label>
                <input
                  v-model="formData.companyTaxId"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.companyTaxId }"
                  placeholder="B12345678"
                />
                <p v-if="errors.companyTaxId" class="form-error">{{ errors.companyTaxId }}</p>
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">Email de la empresa *</label>
                <input
                  v-model="formData.companyEmail"
                  type="email"
                  class="form-input"
                  :class="{ 'error': errors.companyEmail }"
                  placeholder="info@empresa.com"
                />
                <p v-if="errors.companyEmail" class="form-error">{{ errors.companyEmail }}</p>
              </div>
              <div>
                <label class="form-label">Persona de contacto *</label>
                <input
                  v-model="formData.companyContactPerson"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.companyContactPerson }"
                  placeholder="Nombre Apellidos"
                />
                <p v-if="errors.companyContactPerson" class="form-error">{{ errors.companyContactPerson }}</p>
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">Teléfono *</label>
                <input
                  v-model="formData.companyPhone"
                  type="tel"
                  class="form-input"
                  :class="{ 'error': errors.companyPhone }"
                  placeholder="912345678"
                />
                <p v-if="errors.companyPhone" class="form-error">{{ errors.companyPhone }}</p>
              </div>
              <div>
                <label class="form-label">Dirección *</label>
                <input
                  v-model="formData.companyAddress"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.companyAddress }"
                  placeholder="Calle, número, ciudad"
                />
                <p v-if="errors.companyAddress" class="form-error">{{ errors.companyAddress }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Admin Account -->
        <div v-else-if="currentStep === 3">
          <h2 class="text-xl font-bold text-dark mb-6">Tu cuenta de administrador</h2>
          <div class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">Tu nombre *</label>
                <input
                  v-model="formData.applicantName"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.applicantName }"
                  placeholder="Tu nombre completo"
                />
                <p v-if="errors.applicantName" class="form-error">{{ errors.applicantName }}</p>
              </div>
              <div>
                <label class="form-label">Tu email *</label>
                <input
                  v-model="formData.applicantEmail"
                  type="email"
                  class="form-input"
                  :class="{ 'error': errors.applicantEmail }"
                  placeholder="tu@email.com"
                />
                <p v-if="errors.applicantEmail" class="form-error">{{ errors.applicantEmail }}</p>
              </div>
            </div>
            <div>
              <label class="form-label">Teléfono (opcional)</label>
              <input
                v-model="formData.applicantPhone"
                type="tel"
                class="form-input"
                placeholder="612345678"
              />
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">Contraseña *</label>
                <input
                  v-model="formData.applicantPassword"
                  type="password"
                  class="form-input"
                  :class="{ 'error': errors.applicantPassword }"
                  placeholder="Mínimo 8 caracteres"
                />
                <p v-if="errors.applicantPassword" class="form-error">{{ errors.applicantPassword }}</p>
              </div>
              <div>
                <label class="form-label">Confirmar contraseña *</label>
                <input
                  v-model="formData.applicantPasswordConfirmation"
                  type="password"
                  class="form-input"
                  :class="{ 'error': errors.applicantPasswordConfirmation }"
                  placeholder="Repite la contraseña"
                />
                <p v-if="errors.applicantPasswordConfirmation" class="form-error">{{ errors.applicantPasswordConfirmation }}</p>
              </div>
            </div>
            <div>
              <label class="flex items-start">
                <input
                  v-model="formData.acceptTerms"
                  type="checkbox"
                  class="mt-1 mr-3 h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span class="text-sm text-gray-600">
                  Acepto los <a href="#" class="text-primary-500 hover:underline">términos y condiciones</a>
                  y la <a href="#" class="text-primary-500 hover:underline">política de privacidad</a> *
                </span>
              </label>
              <p v-if="errors.acceptTerms" class="form-error mt-1">{{ errors.acceptTerms }}</p>
            </div>
          </div>
        </div>

        <!-- Error message -->
        <div v-if="submitError" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <i data-feather="alert-circle" class="w-5 h-5 inline mr-2"></i>
          {{ submitError }}
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between mt-8 pt-6 border-t">
          <button
            v-if="currentStep > 1"
            @click="prevStep"
            type="button"
            class="btn border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <i data-feather="arrow-left" class="w-5 h-5 mr-2"></i>
            Anterior
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < totalSteps"
            @click="nextStep"
            type="button"
            class="btn btn-primary"
          >
            Siguiente
            <i data-feather="arrow-right" class="w-5 h-5 ml-2"></i>
          </button>
          <button
            v-else
            @click="handleSubmit"
            type="button"
            :disabled="isSubmitting"
            class="btn btn-teal"
          >
            <span v-if="isSubmitting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creando cuenta...
            </span>
            <span v-else>
              Crear cuenta
              <i data-feather="check" class="w-5 h-5 ml-2"></i>
            </span>
          </button>
        </div>
      </div>

      <!-- Login link -->
      <p class="text-center text-gray-600 mt-6">
        ¿Ya tienes cuenta?
        <a href="https://app.tiemply.com" class="text-primary-500 hover:underline font-medium">
          Inicia sesión
        </a>
      </p>
    </div>
  </div>
</template>
