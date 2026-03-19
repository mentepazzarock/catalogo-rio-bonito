export const SITE_NAME = 'Catálogo Rio Bonito'
export const SITE_DESCRIPTION = 'O maior guia de lojas e profissionais de Rio Bonito, RJ. Encontre tudo que precisa perto de você.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://catalogoriobonito.com.br'
export const CITY = 'Rio Bonito'
export const STATE = 'RJ'
export const WHATSAPP_BUSINESS = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS || '5521999999999'

export const SUBSCRIPTION_PLANS = {
  basic: {
    name: 'Básico',
    price: 100,
    maxProducts: 10,
    maxPhotos: 5,
    features: [
      'Perfil completo com fotos',
      'Até 10 produtos/serviços',
      'Horário de funcionamento',
      'Link do WhatsApp',
      'Geolocalização no mapa',
    ],
    color: 'slate',
  },
  premium: {
    name: 'Premium',
    price: 150,
    maxProducts: 30,
    maxPhotos: 15,
    features: [
      'Tudo do plano Básico',
      'Até 30 produtos/serviços',
      'Destaque nas buscas',
      'Promoções e cupons',
      'Selo de verificado',
      'Estatísticas de visitas',
    ],
    color: 'primary',
  },
  pro: {
    name: 'Profissional',
    price: 250,
    maxProducts: 999,
    maxPhotos: 50,
    features: [
      'Tudo do plano Premium',
      'Produtos/serviços ilimitados',
      'Destaque na página inicial',
      'Agendamento online',
      'Gerenciamento de leads',
      'Suporte prioritário',
    ],
    color: 'warm',
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
  { key: 'monday', label: 'Segunda-feira', short: 'Seg' },
  { key: 'tuesday', label: 'Terça-feira', short: 'Ter' },
  { key: 'wednesday', label: 'Quarta-feira', short: 'Qua' },
  { key: 'thursday', label: 'Quinta-feira', short: 'Qui' },
  { key: 'friday', label: 'Sexta-feira', short: 'Sex' },
  { key: 'saturday', label: 'Sábado', short: 'Sáb' },
  { key: 'sunday', label: 'Domingo', short: 'Dom' },
] as const

export const BUSINESS_ATTRIBUTES_LABELS: Record<string, string> = {
  wifi: 'Wi-Fi',
  parking: 'Estacionamento',
  delivery: 'Delivery',
  accepts_pix: 'Aceita Pix',
  accepts_card: 'Aceita Cartão',
  accepts_cash: 'Aceita Dinheiro',
  accepts_vr: 'Aceita VR/VA',
  pet_friendly: 'Pet Friendly',
  accessibility: 'Acessível',
  air_conditioning: 'Climatizado',
}

export const BUSINESS_ATTRIBUTES_ICONS: Record<string, string> = {
  wifi: 'Wifi',
  parking: 'ParkingCircle',
  delivery: 'Truck',
  accepts_pix: 'QrCode',
  accepts_card: 'CreditCard',
  accepts_cash: 'Banknote',
  accepts_vr: 'Ticket',
  pet_friendly: 'PawPrint',
  accessibility: 'Accessibility',
  air_conditioning: 'Snowflake',
}
