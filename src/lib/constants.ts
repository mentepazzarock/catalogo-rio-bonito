export const SITE_NAME = 'Catálogo Rio Bonito'
export const SITE_DESCRIPTION = 'O maior guia de lojas e profissionais de Rio Bonito, RJ. Encontre tudo que precisa perto de você.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://catalogoriobonito.com.br'
export const CITY = 'Rio Bonito'
export const STATE = 'RJ'

export const SUBSCRIPTION_PLANS = {
  basic: {
    name: 'Básico',
    price: 100,
    features: [
      'Perfil completo com fotos',
      'Até 10 produtos/serviços',
      'Horário de funcionamento',
      'Link do WhatsApp',
      'Geolocalização no mapa',
    ],
  },
  premium: {
    name: 'Premium',
    price: 150,
    features: [
      'Tudo do plano Básico',
      'Até 30 produtos/serviços',
      'Destaque nas buscas',
      'Promoções e cupons',
      'Selo de verificado',
      'Estatísticas de visitas',
    ],
  },
  pro: {
    name: 'Profissional',
    price: 250,
    features: [
      'Tudo do plano Premium',
      'Produtos/serviços ilimitados',
      'Destaque na página inicial',
      'Agendamento online',
      'Gerenciamento de leads',
      'Suporte prioritário',
    ],
  },
} as const

export const CATEGORIES_DATA = [
  { name: 'Alimentação', slug: 'alimentacao', icon: 'UtensilsCrossed' },
  { name: 'Beleza & Estética', slug: 'beleza-estetica', icon: 'Sparkles' },
  { name: 'Saúde', slug: 'saude', icon: 'Heart' },
  { name: 'Moda & Vestuário', slug: 'moda-vestuario', icon: 'Shirt' },
  { name: 'Reparos & Manutenção', slug: 'reparos-manutencao', icon: 'Wrench' },
  { name: 'Educação', slug: 'educacao', icon: 'GraduationCap' },
  { name: 'Tecnologia', slug: 'tecnologia', icon: 'Laptop' },
  { name: 'Automotivo', slug: 'automotivo', icon: 'Car' },
  { name: 'Casa & Decoração', slug: 'casa-decoracao', icon: 'Home' },
  { name: 'Esporte & Lazer', slug: 'esporte-lazer', icon: 'Dumbbell' },
  { name: 'Advocacia & Contabilidade', slug: 'advocacia-contabilidade', icon: 'Scale' },
  { name: 'Pet Shop & Veterinário', slug: 'pet-shop-veterinario', icon: 'PawPrint' },
  { name: 'Construção Civil', slug: 'construcao-civil', icon: 'HardHat' },
  { name: 'Fotografia & Eventos', slug: 'fotografia-eventos', icon: 'Camera' },
  { name: 'Supermercados & Conveniência', slug: 'supermercados-conveniencia', icon: 'ShoppingCart' },
] as const

export const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Segunda-feira' },
  { key: 'tuesday', label: 'Terça-feira' },
  { key: 'wednesday', label: 'Quarta-feira' },
  { key: 'thursday', label: 'Quinta-feira' },
  { key: 'friday', label: 'Sexta-feira' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
] as const
