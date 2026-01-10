import { ref, computed } from 'vue'
import { plansService } from '@/services/api'

// Planes de fallback cuando la API no está disponible
const FALLBACK_PLANS = [
  {
    id: '54314c62-a348-41b7-8f75-709cdb103873',
    name: 'Free',
    slug: 'free',
    price_monthly: '0.00',
    price_yearly: '0.00',
    yearly_discount_percentage: 0,
    max_employees: 2,
    max_managers: 1,
    allows_company_logo: false,
    features: [
      'Hasta 2 empleados',
      '1 manager',
      'Registro de entrada/salida',
      'Gestión de ausencias básica',
      'Reportes básicos de trabajo',
      'Gestión de departamentos (CRUD)',
      'Solicitudes de vacaciones',
    ],
    is_free: true,
  },
  {
    id: 'a92d2265-caee-4a64-9236-0316768b1d0e',
    name: 'Plus',
    slug: 'plus',
    price_monthly: '19.00',
    price_yearly: '182.40',
    yearly_discount_percentage: 20,
    max_employees: 10,
    max_managers: 1,
    allows_company_logo: false,
    features: [
      'Hasta 10 empleados',
      '1 manager',
      'Gestión de horas extra',
      'Geolocalización',
      'Exportación de reportes PDF',
    ],
    is_free: false,
  },
  {
    id: 'bd657f2b-ff3e-46e1-88d3-b7c10456161b',
    name: 'Pro',
    slug: 'pro',
    price_monthly: '49.00',
    price_yearly: '470.40',
    yearly_discount_percentage: 20,
    max_employees: 30,
    max_managers: 3,
    allows_company_logo: true,
    features: [
      'Hasta 30 empleados',
      'Hasta 3 managers',
      'Logo de empresa personalizado',
      'Departamentos avanzado',
      'Horarios de empleados',
      'Acceso API',
    ],
    is_free: false,
  },
  {
    id: 'ddd06702-73e4-444f-9ca2-b39533050273',
    name: 'Premium',
    slug: 'premium',
    price_monthly: '99.00',
    price_yearly: '950.40',
    yearly_discount_percentage: 20,
    max_employees: null,
    max_managers: 999,
    allows_company_logo: true,
    features: [
      'Empleados ilimitados',
      'Managers ilimitados',
      'Turnos de guardia',
      'Integraciones personalizadas',
      'Soporte prioritario 24/7',
      'Dispositivos NFC',
    ],
    is_free: false,
  },
]

// Estado compartido entre componentes
const plans = ref([])
const isLoading = ref(false)
const error = ref(null)
const hasFetched = ref(false)
const usingFallback = ref(false)

/**
 * Composable para gestionar los planes de suscripción
 */
export function usePlans() {
  /**
   * Transforma un plan de la API al formato de la UI
   * @param {Object} apiPlan - Plan de la API
   * @param {number} index - Índice del plan en el array
   * @param {number} total - Total de planes
   */
  const transformPlan = (apiPlan, index, total) => {
    const priceMonthly = parseFloat(apiPlan.price_monthly) || 0
    const priceYearly = parseFloat(apiPlan.price_yearly) || 0

    // El plan "featured" es el del medio (generalmente el más popular)
    // Si hay 3 planes, el índice 1 es el featured
    const isFeatured = total === 3 ? index === 1 : index === Math.floor(total / 2)

    return {
      id: apiPlan.slug,
      uuid: apiPlan.id,
      name: apiPlan.name,
      slug: apiPlan.slug,
      description: buildDescription(apiPlan),
      price: {
        monthly: priceMonthly,
        yearly: priceYearly,
      },
      priceNote: !apiPlan.is_free ? '/mes' : null,
      yearlyDiscount: apiPlan.yearly_discount_percentage || 0,
      features: apiPlan.features || [],
      limitations: [],
      maxEmployees: apiPlan.max_employees,
      maxManagers: apiPlan.max_managers,
      allowsCompanyLogo: apiPlan.allows_company_logo,
      isFree: apiPlan.is_free,
      featured: isFeatured,
      cta: getCTA(apiPlan),
    }
  }

  /**
   * Construye la descripción del plan basada en límites
   */
  const buildDescription = (apiPlan) => {
    if (apiPlan.max_employees === null) {
      return 'Empleados ilimitados'
    }
    return `Hasta ${apiPlan.max_employees} empleados`
  }

  /**
   * Obtiene el texto del CTA según el tipo de plan
   */
  const getCTA = (apiPlan) => {
    if (apiPlan.is_free) return 'Empezar gratis'
    return 'Empezar prueba gratis'
  }

  /**
   * Carga los planes desde la API con fallback a datos estáticos
   */
  const fetchPlans = async (force = false) => {
    if (hasFetched.value && !force) return

    isLoading.value = true
    error.value = null
    usingFallback.value = false

    try {
      const response = await plansService.getAll()
      if (response.success && response.data && response.data.length > 0) {
        const total = response.data.length
        plans.value = response.data.map((plan, index) => transformPlan(plan, index, total))
        hasFetched.value = true
      } else {
        throw new Error('No se recibieron datos de la API')
      }
    } catch (err) {
      console.warn('API de planes no disponible, usando datos de fallback:', err.message)
      const total = FALLBACK_PLANS.length
      plans.value = FALLBACK_PLANS.map((plan, index) => transformPlan(plan, index, total))
      usingFallback.value = true
      hasFetched.value = true
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Obtiene el precio formateado para un período
   */
  const formatPrice = (plan, period = 'monthly') => {
    const price = plan.price[period]
    if (price === 0) return 'Gratis'
    return `${price.toFixed(2).replace('.', ',')}€`
  }

  /**
   * Obtiene el precio para mostrar en la UI compacta (RegisterPage)
   */
  const getDisplayPrice = (plan) => {
    if (plan.isFree) return 'Gratis'
    return `${plan.price.monthly.toFixed(2).replace('.', ',')}€`
  }

  /**
   * Encuentra un plan por su slug
   */
  const getPlanBySlug = (slug) => {
    return plans.value.find(p => p.slug === slug || p.id === slug)
  }

  /**
   * Plans ordenados (ya vienen ordenados de la API por sort_order y price)
   */
  const sortedPlans = computed(() => plans.value)

  return {
    plans,
    sortedPlans,
    isLoading,
    error,
    usingFallback,
    fetchPlans,
    formatPrice,
    getDisplayPrice,
    getPlanBySlug,
  }
}
