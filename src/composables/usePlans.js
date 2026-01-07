import { ref, computed } from 'vue'
import { plansService } from '@/services/api'

// Estado compartido entre componentes
const plans = ref([])
const isLoading = ref(false)
const error = ref(null)
const hasFetched = ref(false)

/**
 * Composable para gestionar los planes de suscripción
 */
export function usePlans() {
  /**
   * Transforma un plan de la API al formato de la UI
   */
  const transformPlan = (apiPlan) => {
    const priceMonthly = parseFloat(apiPlan.price_monthly) || 0
    const priceYearly = parseFloat(apiPlan.price_yearly) || 0
    const isEnterprise = apiPlan.slug === 'enterprise' || priceMonthly === 0 && !apiPlan.is_free

    return {
      id: apiPlan.slug,
      uuid: apiPlan.id,
      name: apiPlan.name,
      slug: apiPlan.slug,
      description: buildDescription(apiPlan),
      price: {
        monthly: apiPlan.is_free ? 0 : (isEnterprise ? null : priceMonthly),
        yearly: apiPlan.is_free ? 0 : (isEnterprise ? null : priceYearly),
      },
      priceText: isEnterprise ? 'Personalizado' : null,
      priceNote: !apiPlan.is_free && !isEnterprise ? 'por empleado/mes' : null,
      yearlyDiscount: apiPlan.yearly_discount_percentage || 0,
      features: apiPlan.features || [],
      limitations: [],
      maxEmployees: apiPlan.max_employees,
      maxManagers: apiPlan.max_managers,
      allowsCompanyLogo: apiPlan.allows_company_logo,
      isFree: apiPlan.is_free,
      featured: apiPlan.is_featured || false,
      cta: getCTA(apiPlan),
    }
  }

  /**
   * Construye la descripción del plan
   */
  const buildDescription = (apiPlan) => {
    if (apiPlan.max_employees === null || apiPlan.max_employees === -1) {
      return 'Empleados ilimitados'
    }
    return `Hasta ${apiPlan.max_employees} empleados`
  }

  /**
   * Obtiene el texto del CTA según el tipo de plan
   */
  const getCTA = (apiPlan) => {
    if (apiPlan.is_free) return 'Empezar gratis'
    if (apiPlan.slug === 'enterprise') return 'Contactar ventas'
    return 'Empezar prueba gratis'
  }

  /**
   * Carga los planes desde la API
   */
  const fetchPlans = async (force = false) => {
    if (hasFetched.value && !force) return

    isLoading.value = true
    error.value = null

    try {
      const response = await plansService.getAll()
      if (response.success && response.data) {
        plans.value = response.data.map(transformPlan)
        hasFetched.value = true
      }
    } catch (err) {
      error.value = err.message || 'Error al cargar los planes'
      console.error('Error fetching plans:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Obtiene el precio formateado
   */
  const formatPrice = (plan, period = 'monthly') => {
    if (plan.priceText) return plan.priceText
    const price = plan.price[period]
    if (price === null) return 'Personalizado'
    if (price === 0) return 'Gratis'
    return `${price.toFixed(2).replace('.', ',')}€`
  }

  /**
   * Obtiene el precio para mostrar en la UI compacta
   */
  const getDisplayPrice = (plan) => {
    if (plan.isFree) return 'Gratis'
    if (plan.priceText) return plan.priceText
    return `${plan.price.monthly?.toFixed(2).replace('.', ',')}€`
  }

  /**
   * Encuentra un plan por su slug
   */
  const getPlanBySlug = (slug) => {
    return plans.value.find(p => p.slug === slug || p.id === slug)
  }

  /**
   * Plans ordenados con el featured primero en desktop
   */
  const sortedPlans = computed(() => {
    return [...plans.value].sort((a, b) => {
      if (a.isFree && !b.isFree) return -1
      if (!a.isFree && b.isFree) return 1
      if (a.featured && !b.featured) return 0
      if (!a.featured && b.featured) return 0
      return 0
    })
  })

  return {
    plans,
    sortedPlans,
    isLoading,
    error,
    fetchPlans,
    formatPrice,
    getDisplayPrice,
    getPlanBySlug,
  }
}
