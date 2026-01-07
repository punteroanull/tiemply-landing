import { ref, computed } from 'vue'
import { plansService } from '@/services/api'

// Planes de fallback cuando la API no está disponible
const FALLBACK_PLANS = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Gratuito',
    slug: 'gratuito',
    price_monthly: '0.00',
    price_yearly: '0.00',
    yearly_discount_percentage: 0,
    max_employees: 5,
    max_managers: 1,
    allows_company_logo: false,
    features: [
      'Registro de jornada',
      'Informes básicos',
    ],
    is_free: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Profesional',
    slug: 'profesional',
    price_monthly: '9.99',
    price_yearly: '99.99',
    yearly_discount_percentage: 16.68,
    max_employees: 25,
    max_managers: 3,
    allows_company_logo: true,
    features: [
      'Registro de jornada',
      'Informes avanzados',
      'Gestión de ausencias',
      'Soporte por email',
    ],
    is_free: false,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Empresa',
    slug: 'empresa',
    price_monthly: '29.99',
    price_yearly: '299.99',
    yearly_discount_percentage: 16.68,
    max_employees: null,
    max_managers: null,
    allows_company_logo: true,
    features: [
      'Empleados ilimitados',
      'Todas las funcionalidades',
      'Dispositivos NFC',
      'Soporte prioritario',
      'API access',
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
