import type { Business, Category, BusinessHours, Product, ServiceItem, Review, Promotion, BusinessWithDetails, BusinessAttribute, AdminDashboardStats, BusinessDashboardStats, Banner, Lead, Notification, PaymentTransaction, Appointment } from '@/types/database'

const defaultAttributes: BusinessAttribute = {
  wifi: false, parking: false, delivery: false, accepts_pix: true,
  accepts_card: true, accepts_cash: true, accepts_vr: false,
  pet_friendly: false, accessibility: false, air_conditioning: false,
}

export const mockCategories: Category[] = [
  { id: '1', name: 'Alimentação', slug: 'alimentacao', icon: 'UtensilsCrossed', description: 'Restaurantes, lanchonetes, pizzarias e mais', parent_id: null, sort_order: 1, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
  { id: '2', name: 'Beleza & Estética', slug: 'beleza-estetica', icon: 'Sparkles', description: 'Salões, barbearias, clínicas de estética', parent_id: null, sort_order: 2, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
  { id: '3', name: 'Saúde', slug: 'saude', icon: 'Heart', description: 'Médicos, dentistas, fisioterapeutas', parent_id: null, sort_order: 3, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
  { id: '4', name: 'Moda & Vestuário', slug: 'moda-vestuario', icon: 'Shirt', description: 'Roupas, calçados, acessórios', parent_id: null, sort_order: 4, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
  { id: '5', name: 'Reparos & Manutenção', slug: 'reparos-manutencao', icon: 'Wrench', description: 'Eletricistas, encanadores, técnicos', parent_id: null, sort_order: 5, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
  { id: '6', name: 'Educação', slug: 'educacao', icon: 'GraduationCap', description: 'Escolas, cursos, aulas particulares', parent_id: null, sort_order: 6, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
  { id: '7', name: 'Tecnologia', slug: 'tecnologia', icon: 'Laptop', description: 'Informática, celulares, assistência técnica', parent_id: null, sort_order: 7, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
  { id: '8', name: 'Automotivo', slug: 'automotivo', icon: 'Car', description: 'Oficinas, autopeças, lava-jato', parent_id: null, sort_order: 8, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
  { id: '9', name: 'Casa & Decoração', slug: 'casa-decoracao', icon: 'Home', description: 'Móveis, decoração, materiais de construção', parent_id: null, sort_order: 9, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
  { id: '10', name: 'Esporte & Lazer', slug: 'esporte-lazer', icon: 'Dumbbell', description: 'Academias, esportes, entretenimento', parent_id: null, sort_order: 10, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
  { id: '11', name: 'Pet Shop & Veterinário', slug: 'pet-shop-veterinario', icon: 'PawPrint', description: 'Pets, banho e tosa, veterinários', parent_id: null, sort_order: 11, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
  { id: '12', name: 'Advocacia & Contabilidade', slug: 'advocacia-contabilidade', icon: 'Scale', description: 'Advogados, contadores, consultores', parent_id: null, sort_order: 12, is_active: true, seo_title: null, seo_description: null, created_at: '2024-01-01' },
]

function makeHours(businessId: string, sat = '09:00-13:00', sunClosed = true): BusinessHours[] {
  const weekday = { open: '08:00', close: '18:00' }
  const [satOpen, satClose] = sat.split('-')
  return [
    { id: `${businessId}-mon`, business_id: businessId, day_of_week: 'monday', open_time: weekday.open, close_time: weekday.close, is_closed: false },
    { id: `${businessId}-tue`, business_id: businessId, day_of_week: 'tuesday', open_time: weekday.open, close_time: weekday.close, is_closed: false },
    { id: `${businessId}-wed`, business_id: businessId, day_of_week: 'wednesday', open_time: weekday.open, close_time: weekday.close, is_closed: false },
    { id: `${businessId}-thu`, business_id: businessId, day_of_week: 'thursday', open_time: weekday.open, close_time: weekday.close, is_closed: false },
    { id: `${businessId}-fri`, business_id: businessId, day_of_week: 'friday', open_time: weekday.open, close_time: weekday.close, is_closed: false },
    { id: `${businessId}-sat`, business_id: businessId, day_of_week: 'saturday', open_time: satOpen, close_time: satClose, is_closed: false },
    { id: `${businessId}-sun`, business_id: businessId, day_of_week: 'sunday', open_time: '00:00', close_time: '00:00', is_closed: sunClosed },
  ]
}

export const mockBusinesses: BusinessWithDetails[] = [
  {
    id: '1', owner_id: 'user1', name: 'Restaurante Sabor da Terra', slug: 'restaurante-sabor-da-terra', type: 'store',
    description: 'O melhor da culinária caseira em Rio Bonito. Há mais de 15 anos servindo pratos feitos com ingredientes frescos e muito amor. Nosso buffet de almoço é referência na cidade, com mais de 30 opções diárias entre saladas, pratos quentes, grelhados e sobremesas.',
    short_description: 'Culinária caseira com buffet variado e pratos executivos',
    phone: '2126231234', whatsapp: '21999881234', email: 'contato@sabordaterra.com', website: null,
    instagram: '@sabordaterrarb', facebook: 'sabordaterrarb', tiktok: null,
    address: 'Rua Dr. Ari Teixeira da Costa, 150 - Centro', neighborhood: 'Centro',
    city: 'Rio Bonito', state: 'RJ', zip_code: '28800-000',
    latitude: -22.7112, longitude: -42.6267, logo_url: null, cover_url: null, photos: [],
    attributes: { ...defaultAttributes, wifi: true, parking: true, air_conditioning: true, accepts_vr: true, delivery: true },
    subscription_plan: 'premium', subscription_status: 'active', subscription_expires_at: '2026-12-31',
    is_featured: true, is_verified: true, is_active: true, is_approved: true,
    average_rating: 4.7, total_reviews: 48, total_views: 1248, total_whatsapp_clicks: 86, total_phone_clicks: 34,
    created_at: '2024-01-15', updated_at: '2024-03-01',
    categories: [mockCategories[0]],
    hours: makeHours('1'),
    products: [
      { id: 'p1', business_id: '1', category_id: null, name: 'Buffet Almoço', description: 'Buffet livre com mais de 30 pratos', price: 34.90, promotional_price: 29.90, image_url: null, is_featured: true, is_active: true, sort_order: 1, created_at: '2024-01-15', updated_at: '2024-01-15' },
      { id: 'p2', business_id: '1', category_id: null, name: 'Prato Executivo', description: 'Arroz, feijão, salada e proteína do dia', price: 22.90, promotional_price: null, image_url: null, is_featured: true, is_active: true, sort_order: 2, created_at: '2024-01-15', updated_at: '2024-01-15' },
      { id: 'p3', business_id: '1', category_id: null, name: 'Marmitex P', description: 'Marmita com arroz, feijão e 1 proteína', price: 15.00, promotional_price: null, image_url: null, is_featured: false, is_active: true, sort_order: 3, created_at: '2024-01-15', updated_at: '2024-01-15' },
      { id: 'p4', business_id: '1', category_id: null, name: 'Marmitex G', description: 'Marmita grande com 2 proteínas e salada', price: 22.00, promotional_price: null, image_url: null, is_featured: false, is_active: true, sort_order: 4, created_at: '2024-01-15', updated_at: '2024-01-15' },
    ],
    services: [],
    reviews: [
      { id: 'r1', business_id: '1', user_id: 'u1', user_name: 'Maria Silva', user_avatar: null, rating: 5, comment: 'Comida maravilhosa! Melhor buffet da cidade, sem dúvida.', reply: 'Obrigado, Maria! Volte sempre!', replied_at: '2024-02-15', is_reported: false, helpful_count: 12, created_at: '2024-02-10' },
      { id: 'r2', business_id: '1', user_id: 'u2', user_name: 'João Santos', user_avatar: null, rating: 4, comment: 'Boa comida, preço justo. Só o estacionamento que é apertado.', reply: null, replied_at: null, is_reported: false, helpful_count: 5, created_at: '2024-02-20' },
      { id: 'r3', business_id: '1', user_id: 'u10', user_name: 'Luciana Ferreira', user_avatar: null, rating: 5, comment: 'O marmitex é enorme e muito saboroso. Entrega rápida também!', reply: 'Obrigado, Luciana! Temos entrega todos os dias.', replied_at: '2024-03-02', is_reported: false, helpful_count: 8, created_at: '2024-03-01' },
    ],
    promotions: [
      { id: 'promo1', business_id: '1', title: '10% OFF no Buffet', description: 'Mencione o Catálogo Rio Bonito e ganhe 10% de desconto no buffet de almoço!', discount_type: 'percentage', discount_value: 10, coupon_code: 'CATALOGO10', starts_at: '2024-03-01', ends_at: '2026-12-31', is_active: true, total_views: 340, total_redemptions: 28, created_at: '2024-03-01' },
    ],
  },
  {
    id: '2', owner_id: 'user2', name: 'Studio Beleza Pura', slug: 'studio-beleza-pura', type: 'service_provider',
    description: 'Salão de beleza completo com profissionais experientes e especializados. Oferecemos cortes modernos, colorações, tratamentos capilares, manicure, pedicure, design de sobrancelhas e maquiagem profissional. Ambiente climatizado e agradável.',
    short_description: 'Salão de beleza completo com profissionais especializados',
    phone: '2126235678', whatsapp: '21999885678', email: 'studio@belezapura.com', website: null,
    instagram: '@studiobelezapurarb', facebook: null, tiktok: '@belezapurarb',
    address: 'Rua Getúlio Vargas, 320 - Centro', neighborhood: 'Centro',
    city: 'Rio Bonito', state: 'RJ', zip_code: '28800-000',
    latitude: -22.7098, longitude: -42.6283, logo_url: null, cover_url: null, photos: [],
    attributes: { ...defaultAttributes, wifi: true, air_conditioning: true, accessibility: true },
    subscription_plan: 'pro', subscription_status: 'active', subscription_expires_at: '2026-12-31',
    is_featured: true, is_verified: true, is_active: true, is_approved: true,
    average_rating: 4.9, total_reviews: 72, total_views: 2150, total_whatsapp_clicks: 156, total_phone_clicks: 45,
    created_at: '2024-01-10', updated_at: '2024-03-01',
    categories: [mockCategories[1]],
    hours: makeHours('2', '09:00-17:00'),
    products: [],
    services: [
      { id: 's1', business_id: '2', name: 'Corte Feminino', description: 'Corte com lavagem e secagem', price: 60, duration_minutes: 45, image_url: null, is_featured: true, is_active: true, sort_order: 1, created_at: '2024-01-10', updated_at: '2024-01-10' },
      { id: 's2', business_id: '2', name: 'Coloração', description: 'Coloração completa com produtos premium', price: 120, duration_minutes: 90, image_url: null, is_featured: true, is_active: true, sort_order: 2, created_at: '2024-01-10', updated_at: '2024-01-10' },
      { id: 's3', business_id: '2', name: 'Manicure + Pedicure', description: 'Combo manicure e pedicure completo', price: 50, duration_minutes: 60, image_url: null, is_featured: true, is_active: true, sort_order: 3, created_at: '2024-01-10', updated_at: '2024-01-10' },
      { id: 's4', business_id: '2', name: 'Escova Progressiva', description: 'Alisamento com produtos de alta qualidade', price: 200, duration_minutes: 120, image_url: null, is_featured: false, is_active: true, sort_order: 4, created_at: '2024-01-10', updated_at: '2024-01-10' },
      { id: 's5', business_id: '2', name: 'Design de Sobrancelhas', description: 'Design com henna ou tintura', price: 35, duration_minutes: 30, image_url: null, is_featured: false, is_active: true, sort_order: 5, created_at: '2024-01-10', updated_at: '2024-01-10' },
    ],
    reviews: [
      { id: 'r4', business_id: '2', user_id: 'u3', user_name: 'Ana Oliveira', user_avatar: null, rating: 5, comment: 'Melhor salão de Rio Bonito! A Carla é uma artista com as cores.', reply: 'Muito obrigada, Ana! Você arrasa!', replied_at: '2024-02-16', is_reported: false, helpful_count: 18, created_at: '2024-02-15' },
      { id: 'r5', business_id: '2', user_id: 'u11', user_name: 'Beatriz Martins', user_avatar: null, rating: 5, comment: 'Fiz minha progressiva lá e ficou perfeita. Ambiente lindo e super confortável.', reply: 'Obrigada, Bia! Ficou linda mesmo!', replied_at: '2024-02-28', is_reported: false, helpful_count: 10, created_at: '2024-02-27' },
    ],
    promotions: [
      { id: 'promo3', business_id: '2', title: 'Combo Noiva', description: 'Pacote completo para noivas: cabelo + maquiagem + manicure com 20% OFF', discount_type: 'percentage', discount_value: 20, coupon_code: null, starts_at: '2024-03-01', ends_at: '2026-12-31', is_active: true, total_views: 180, total_redemptions: 5, created_at: '2024-03-01' },
    ],
  },
  {
    id: '3', owner_id: 'user3', name: 'TechFix Assistência Técnica', slug: 'techfix-assistencia-tecnica', type: 'service_provider',
    description: 'Assistência técnica especializada em computadores, notebooks, celulares e tablets. Conserto rápido, peças originais e garantia em todos os serviços.',
    short_description: 'Assistência técnica para computadores e celulares',
    phone: '2126239012', whatsapp: '21999889012', email: 'techfix@email.com', website: null,
    instagram: '@techfixrb', facebook: null, tiktok: null,
    address: 'Av. Presidente Lincoln, 88 - Centro', neighborhood: 'Centro',
    city: 'Rio Bonito', state: 'RJ', zip_code: '28800-000',
    latitude: -22.7105, longitude: -42.6290, logo_url: null, cover_url: null, photos: [],
    attributes: { ...defaultAttributes, wifi: true },
    subscription_plan: 'basic', subscription_status: 'active', subscription_expires_at: '2026-12-31',
    is_featured: false, is_verified: true, is_active: true, is_approved: true,
    average_rating: 4.5, total_reviews: 31, total_views: 620, total_whatsapp_clicks: 48, total_phone_clicks: 22,
    created_at: '2024-02-01', updated_at: '2024-03-01',
    categories: [mockCategories[6]],
    hours: makeHours('3'),
    products: [],
    services: [
      { id: 's6', business_id: '3', name: 'Formatação de Notebook', description: 'Formatação com backup e instalação de programas', price: 80, duration_minutes: 120, image_url: null, is_featured: true, is_active: true, sort_order: 1, created_at: '2024-02-01', updated_at: '2024-02-01' },
      { id: 's7', business_id: '3', name: 'Troca de Tela (Celular)', description: 'Substituição de tela original com garantia', price: 150, duration_minutes: 60, image_url: null, is_featured: true, is_active: true, sort_order: 2, created_at: '2024-02-01', updated_at: '2024-02-01' },
      { id: 's8', business_id: '3', name: 'Limpeza de Vírus', description: 'Remoção completa de malware e otimização', price: 60, duration_minutes: 90, image_url: null, is_featured: false, is_active: true, sort_order: 3, created_at: '2024-02-01', updated_at: '2024-02-01' },
    ],
    reviews: [
      { id: 'r6', business_id: '3', user_id: 'u4', user_name: 'Carlos Mendes', user_avatar: null, rating: 5, comment: 'Consertou meu notebook em 1 dia! Excelente serviço.', reply: null, replied_at: null, is_reported: false, helpful_count: 7, created_at: '2024-02-25' },
    ],
    promotions: [],
  },
  {
    id: '4', owner_id: 'user4', name: 'Empório Sabores do Campo', slug: 'emporio-sabores-do-campo', type: 'store',
    description: 'Produtos naturais, orgânicos e artesanais direto do produtor rural. Frutas, legumes, queijos, geleias, pães artesanais e muito mais.',
    short_description: 'Produtos naturais, orgânicos e artesanais',
    phone: '2126233456', whatsapp: '21999883456', email: null, website: null,
    instagram: '@emporiosaboresdocampo', facebook: 'emporiosaboresdocampo', tiktok: null,
    address: 'Rua Nilo Peçanha, 205 - Centro', neighborhood: 'Centro',
    city: 'Rio Bonito', state: 'RJ', zip_code: '28800-000',
    latitude: -22.7120, longitude: -42.6275, logo_url: null, cover_url: null, photos: [],
    attributes: { ...defaultAttributes, parking: true, delivery: true },
    subscription_plan: 'premium', subscription_status: 'active', subscription_expires_at: '2026-12-31',
    is_featured: true, is_verified: true, is_active: true, is_approved: true,
    average_rating: 4.8, total_reviews: 56, total_views: 980, total_whatsapp_clicks: 72, total_phone_clicks: 18,
    created_at: '2024-01-20', updated_at: '2024-03-01',
    categories: [mockCategories[0]],
    hours: makeHours('4'),
    products: [
      { id: 'p5', business_id: '4', category_id: null, name: 'Cesta Orgânica Semanal', description: 'Frutas e verduras orgânicas selecionadas', price: 89.90, promotional_price: null, image_url: null, is_featured: true, is_active: true, sort_order: 1, created_at: '2024-01-20', updated_at: '2024-01-20' },
      { id: 'p6', business_id: '4', category_id: null, name: 'Queijo Minas Artesanal', description: 'Queijo minas curado artesanal - 500g', price: 35.00, promotional_price: null, image_url: null, is_featured: true, is_active: true, sort_order: 2, created_at: '2024-01-20', updated_at: '2024-01-20' },
      { id: 'p7', business_id: '4', category_id: null, name: 'Geleia de Goiaba Caseira', description: 'Geleia artesanal - 300g', price: 18.00, promotional_price: 15.00, image_url: null, is_featured: false, is_active: true, sort_order: 3, created_at: '2024-01-20', updated_at: '2024-01-20' },
    ],
    services: [],
    reviews: [
      { id: 'r7', business_id: '4', user_id: 'u5', user_name: 'Patrícia Lima', user_avatar: null, rating: 5, comment: 'Produtos fresquíssimos! A cesta orgânica é incrível.', reply: 'Obrigado, Patrícia! Nossos produtores ficam felizes!', replied_at: '2024-02-20', is_reported: false, helpful_count: 14, created_at: '2024-02-18' },
    ],
    promotions: [
      { id: 'promo2', business_id: '4', title: 'Primeira Cesta com 15% OFF', description: 'Na sua primeira compra de cesta orgânica, ganhe 15% de desconto!', discount_type: 'percentage', discount_value: 15, coupon_code: 'PRIMEIRA15', starts_at: '2024-03-01', ends_at: '2026-12-31', is_active: true, total_views: 210, total_redemptions: 15, created_at: '2024-03-01' },
    ],
  },
  {
    id: '5', owner_id: 'user5', name: 'Dr. Ricardo Almeida - Dentista', slug: 'dr-ricardo-almeida-dentista', type: 'service_provider',
    description: 'Odontologia geral, estética e implantes. Atendimento humanizado com tecnologia de ponta. Consultório moderno no coração de Rio Bonito.',
    short_description: 'Odontologia geral, estética e implantes dentários',
    phone: '2126237890', whatsapp: '21999887890', email: 'dr.ricardo@dentista.com', website: null,
    instagram: '@drricardodentista', facebook: null, tiktok: null,
    address: 'Rua Dr. Ari Teixeira da Costa, 450 - Centro', neighborhood: 'Centro',
    city: 'Rio Bonito', state: 'RJ', zip_code: '28800-000',
    latitude: -22.7108, longitude: -42.6260, logo_url: null, cover_url: null, photos: [],
    attributes: { ...defaultAttributes, wifi: true, air_conditioning: true, accessibility: true },
    subscription_plan: 'pro', subscription_status: 'active', subscription_expires_at: '2026-12-31',
    is_featured: true, is_verified: true, is_active: true, is_approved: true,
    average_rating: 4.9, total_reviews: 89, total_views: 3200, total_whatsapp_clicks: 210, total_phone_clicks: 95,
    created_at: '2024-01-05', updated_at: '2024-03-01',
    categories: [mockCategories[2]],
    hours: makeHours('5', '08:00-12:00'),
    products: [],
    services: [
      { id: 's9', business_id: '5', name: 'Consulta + Limpeza', description: 'Avaliação completa com limpeza e orientação', price: 120, duration_minutes: 40, image_url: null, is_featured: true, is_active: true, sort_order: 1, created_at: '2024-01-05', updated_at: '2024-01-05' },
      { id: 's10', business_id: '5', name: 'Clareamento Dental', description: 'Clareamento a laser em consultório', price: 800, duration_minutes: 60, image_url: null, is_featured: true, is_active: true, sort_order: 2, created_at: '2024-01-05', updated_at: '2024-01-05' },
      { id: 's11', business_id: '5', name: 'Extração Simples', description: 'Extração dentária com anestesia local', price: 150, duration_minutes: 30, image_url: null, is_featured: false, is_active: true, sort_order: 3, created_at: '2024-01-05', updated_at: '2024-01-05' },
    ],
    reviews: [
      { id: 'r8', business_id: '5', user_id: 'u6', user_name: 'Fernanda Costa', user_avatar: null, rating: 5, comment: 'Excelente profissional! Muito cuidadoso e atencioso.', reply: 'Obrigado pela confiança, Fernanda!', replied_at: '2024-02-22', is_reported: false, helpful_count: 22, created_at: '2024-02-21' },
    ],
    promotions: [],
  },
  {
    id: '6', owner_id: 'user6', name: 'Oficina do Seu Jorge', slug: 'oficina-do-seu-jorge', type: 'service_provider',
    description: 'Oficina mecânica com mais de 25 anos de experiência. Manutenção preventiva e corretiva, troca de óleo, alinhamento, balanceamento e diagnóstico computadorizado.',
    short_description: 'Mecânica automotiva com 25 anos de experiência',
    phone: '2126234567', whatsapp: '21999884567', email: null, website: null,
    instagram: null, facebook: 'oficinaseujorge', tiktok: null,
    address: 'Rua Barão de Inoã, 580 - Mangueira', neighborhood: 'Mangueira',
    city: 'Rio Bonito', state: 'RJ', zip_code: '28800-000',
    latitude: -22.7135, longitude: -42.6240, logo_url: null, cover_url: null, photos: [],
    attributes: { ...defaultAttributes, parking: true },
    subscription_plan: 'basic', subscription_status: 'active', subscription_expires_at: '2026-12-31',
    is_featured: false, is_verified: true, is_active: true, is_approved: true,
    average_rating: 4.6, total_reviews: 42, total_views: 450, total_whatsapp_clicks: 32, total_phone_clicks: 28,
    created_at: '2024-01-25', updated_at: '2024-03-01',
    categories: [mockCategories[7]],
    hours: makeHours('6'),
    products: [],
    services: [
      { id: 's12', business_id: '6', name: 'Troca de Óleo', description: 'Troca de óleo com filtro incluso', price: 120, duration_minutes: 30, image_url: null, is_featured: true, is_active: true, sort_order: 1, created_at: '2024-01-25', updated_at: '2024-01-25' },
      { id: 's13', business_id: '6', name: 'Alinhamento + Balanceamento', description: 'Computadorizado para todos os veículos', price: 100, duration_minutes: 60, image_url: null, is_featured: true, is_active: true, sort_order: 2, created_at: '2024-01-25', updated_at: '2024-01-25' },
    ],
    reviews: [
      { id: 'r9', business_id: '6', user_id: 'u7', user_name: 'Roberto Souza', user_avatar: null, rating: 5, comment: 'Seu Jorge é muito honesto e competente. Recomendo demais!', reply: null, replied_at: null, is_reported: false, helpful_count: 9, created_at: '2024-02-28' },
    ],
    promotions: [],
  },
  {
    id: '7', owner_id: 'user7', name: 'Moda Bella Boutique', slug: 'moda-bella-boutique', type: 'store',
    description: 'Boutique feminina com as últimas tendências da moda. Roupas, calçados, bolsas e acessórios para mulheres que gostam de estar sempre bem vestidas. Trabalhamos com marcas nacionais de qualidade a preços acessíveis.',
    short_description: 'Moda feminina com as últimas tendências',
    phone: '2126236789', whatsapp: '21999886789', email: null, website: null,
    instagram: '@modabellarb', facebook: 'modabellarb', tiktok: '@modabellarb',
    address: 'Rua Nilo Peçanha, 310 - Centro', neighborhood: 'Centro',
    city: 'Rio Bonito', state: 'RJ', zip_code: '28800-000',
    latitude: -22.7115, longitude: -42.6270, logo_url: null, cover_url: null, photos: [],
    attributes: { ...defaultAttributes, air_conditioning: true, accepts_pix: true },
    subscription_plan: 'premium', subscription_status: 'active', subscription_expires_at: '2026-12-31',
    is_featured: true, is_verified: true, is_active: true, is_approved: true,
    average_rating: 4.6, total_reviews: 35, total_views: 890, total_whatsapp_clicks: 68, total_phone_clicks: 12,
    created_at: '2024-02-05', updated_at: '2024-03-01',
    categories: [mockCategories[3]],
    hours: makeHours('7', '09:00-16:00'),
    products: [
      { id: 'p8', business_id: '7', category_id: null, name: 'Vestido Midi Floral', description: 'Vestido midi estampado - P ao GG', price: 129.90, promotional_price: 99.90, image_url: null, is_featured: true, is_active: true, sort_order: 1, created_at: '2024-02-05', updated_at: '2024-02-05' },
      { id: 'p9', business_id: '7', category_id: null, name: 'Bolsa Couro Eco', description: 'Bolsa de couro ecológico - várias cores', price: 89.90, promotional_price: null, image_url: null, is_featured: true, is_active: true, sort_order: 2, created_at: '2024-02-05', updated_at: '2024-02-05' },
    ],
    services: [],
    reviews: [
      { id: 'r10', business_id: '7', user_id: 'u8', user_name: 'Camila Rodrigues', user_avatar: null, rating: 5, comment: 'Roupas lindas e de ótima qualidade! A dona é super atenciosa.', reply: 'Obrigada, Camila! Vista-se com estilo!', replied_at: '2024-03-02', is_reported: false, helpful_count: 6, created_at: '2024-03-01' },
    ],
    promotions: [
      { id: 'promo4', business_id: '7', title: 'Outlet de Verão - até 40% OFF', description: 'Peças selecionadas da coleção verão com até 40% de desconto!', discount_type: 'percentage', discount_value: 40, coupon_code: null, starts_at: '2024-03-01', ends_at: '2026-06-30', is_active: true, total_views: 150, total_redemptions: 22, created_at: '2024-03-01' },
    ],
  },
  {
    id: '8', owner_id: 'user8', name: 'Academia Power Fit', slug: 'academia-power-fit', type: 'service_provider',
    description: 'Academia completa com musculação, crossfit, spinning, pilates e aulas de dança. Equipamentos modernos, personal trainers qualificados e ambiente motivador.',
    short_description: 'Academia completa com musculação e aulas coletivas',
    phone: '2126238901', whatsapp: '21999888901', email: 'powerfit@email.com', website: null,
    instagram: '@powerfitrb', facebook: null, tiktok: '@powerfitrb',
    address: 'Av. Presidente Lincoln, 200 - Centro', neighborhood: 'Centro',
    city: 'Rio Bonito', state: 'RJ', zip_code: '28800-000',
    latitude: -22.7100, longitude: -42.6255, logo_url: null, cover_url: null, photos: [],
    attributes: { ...defaultAttributes, wifi: true, parking: true, air_conditioning: true, accessibility: true },
    subscription_plan: 'pro', subscription_status: 'active', subscription_expires_at: '2026-12-31',
    is_featured: false, is_verified: true, is_active: true, is_approved: true,
    average_rating: 4.4, total_reviews: 28, total_views: 750, total_whatsapp_clicks: 55, total_phone_clicks: 20,
    created_at: '2024-02-10', updated_at: '2024-03-01',
    categories: [mockCategories[9]],
    hours: makeHours('8', '07:00-14:00', false),
    products: [],
    services: [
      { id: 's14', business_id: '8', name: 'Plano Mensal', description: 'Acesso completo - musculação + aulas', price: 89.90, duration_minutes: null, image_url: null, is_featured: true, is_active: true, sort_order: 1, created_at: '2024-02-10', updated_at: '2024-02-10' },
      { id: 's15', business_id: '8', name: 'Personal Trainer (hora)', description: 'Acompanhamento individual personalizado', price: 80, duration_minutes: 60, image_url: null, is_featured: true, is_active: true, sort_order: 2, created_at: '2024-02-10', updated_at: '2024-02-10' },
      { id: 's16', business_id: '8', name: 'Avaliação Física', description: 'Avaliação completa com bioimpedância', price: 50, duration_minutes: 45, image_url: null, is_featured: false, is_active: true, sort_order: 3, created_at: '2024-02-10', updated_at: '2024-02-10' },
    ],
    reviews: [
      { id: 'r11', business_id: '8', user_id: 'u9', user_name: 'Marcos Alves', user_avatar: null, rating: 4, comment: 'Boa academia, equipamentos novos. Poderia ter mais horários de aula.', reply: null, replied_at: null, is_reported: false, helpful_count: 4, created_at: '2024-03-05' },
    ],
    promotions: [],
  },
  {
    id: '9', owner_id: 'user9', name: 'Pet House Rio Bonito', slug: 'pet-house-rio-bonito', type: 'store',
    description: 'Tudo para seu pet! Ração, brinquedos, acessórios, banho e tosa com carinho. Veterinário disponível para consultas e vacinas. Seu melhor amigo merece o melhor!',
    short_description: 'Pet shop completo com banho, tosa e veterinário',
    phone: '2126232345', whatsapp: '21999882345', email: null, website: null,
    instagram: '@pethouserb', facebook: null, tiktok: null,
    address: 'Rua Getúlio Vargas, 150 - Centro', neighborhood: 'Centro',
    city: 'Rio Bonito', state: 'RJ', zip_code: '28800-000',
    latitude: -22.7095, longitude: -42.6278, logo_url: null, cover_url: null, photos: [],
    attributes: { ...defaultAttributes, parking: true, pet_friendly: true, air_conditioning: true },
    subscription_plan: 'premium', subscription_status: 'active', subscription_expires_at: '2026-12-31',
    is_featured: false, is_verified: true, is_active: true, is_approved: true,
    average_rating: 4.7, total_reviews: 38, total_views: 680, total_whatsapp_clicks: 45, total_phone_clicks: 30,
    created_at: '2024-02-15', updated_at: '2024-03-01',
    categories: [mockCategories[10]],
    hours: makeHours('9', '08:00-16:00'),
    products: [
      { id: 'p10', business_id: '9', category_id: null, name: 'Ração Premium Cães 15kg', description: 'Ração super premium para cães adultos', price: 189.90, promotional_price: 169.90, image_url: null, is_featured: true, is_active: true, sort_order: 1, created_at: '2024-02-15', updated_at: '2024-02-15' },
      { id: 'p11', business_id: '9', category_id: null, name: 'Kit Banho & Tosa', description: 'Banho, tosa higiênica e perfume', price: 60, promotional_price: null, image_url: null, is_featured: true, is_active: true, sort_order: 2, created_at: '2024-02-15', updated_at: '2024-02-15' },
    ],
    services: [
      { id: 's17', business_id: '9', name: 'Consulta Veterinária', description: 'Consulta com veterinário especializado', price: 100, duration_minutes: 30, image_url: null, is_featured: true, is_active: true, sort_order: 1, created_at: '2024-02-15', updated_at: '2024-02-15' },
    ],
    reviews: [
      { id: 'r12', business_id: '9', user_id: 'u12', user_name: 'Daniela Souza', user_avatar: null, rating: 5, comment: 'Tratam meu cachorro com muito carinho! Super profissionais.', reply: 'Obrigada, Dani! O Thor é um amor!', replied_at: '2024-03-01', is_reported: false, helpful_count: 11, created_at: '2024-02-28' },
    ],
    promotions: [],
  },
  {
    id: '10', owner_id: 'user10', name: 'Elétrica Raio', slug: 'eletrica-raio', type: 'service_provider',
    description: 'Eletricista profissional com 18 anos de experiência. Instalações residenciais e comerciais, manutenção elétrica, quadro de distribuição, iluminação LED e muito mais. Orçamento grátis!',
    short_description: 'Eletricista profissional - residencial e comercial',
    phone: null, whatsapp: '21999880123', email: null, website: null,
    instagram: null, facebook: null, tiktok: null,
    address: 'Rio Bonito - Atendimento a domicílio', neighborhood: null,
    city: 'Rio Bonito', state: 'RJ', zip_code: '28800-000',
    latitude: -22.7110, longitude: -42.6265, logo_url: null, cover_url: null, photos: [],
    attributes: defaultAttributes,
    subscription_plan: 'basic', subscription_status: 'active', subscription_expires_at: '2026-12-31',
    is_featured: false, is_verified: false, is_active: true, is_approved: true,
    average_rating: 4.8, total_reviews: 22, total_views: 310, total_whatsapp_clicks: 42, total_phone_clicks: 0,
    created_at: '2024-02-20', updated_at: '2024-03-01',
    categories: [mockCategories[4]],
    hours: makeHours('10', '08:00-12:00'),
    products: [],
    services: [
      { id: 's18', business_id: '10', name: 'Instalação de Tomada/Interruptor', description: 'Instalação ou troca de tomada/interruptor', price: 60, duration_minutes: 30, image_url: null, is_featured: true, is_active: true, sort_order: 1, created_at: '2024-02-20', updated_at: '2024-02-20' },
      { id: 's19', business_id: '10', name: 'Troca de Quadro Elétrico', description: 'Montagem completa do quadro de distribuição', price: 350, duration_minutes: 240, image_url: null, is_featured: true, is_active: true, sort_order: 2, created_at: '2024-02-20', updated_at: '2024-02-20' },
    ],
    reviews: [
      { id: 'r13', business_id: '10', user_id: 'u13', user_name: 'Antônio Pereira', user_avatar: null, rating: 5, comment: 'Profissional excelente, pontual e preço justo. Indicou melhorias na instalação sem cobrar a mais.', reply: null, replied_at: null, is_reported: false, helpful_count: 8, created_at: '2024-03-08' },
    ],
    promotions: [],
  },
]

// Helper functions
export function getBusinessBySlug(slug: string): BusinessWithDetails | undefined {
  return mockBusinesses.find((b) => b.slug === slug)
}

export function getBusinessesByCategory(categorySlug: string): BusinessWithDetails[] {
  const category = mockCategories.find((c) => c.slug === categorySlug)
  if (!category) return []
  return mockBusinesses.filter((b) => b.categories.some((c) => c.id === category.id))
}

export function searchBusinesses(query: string): BusinessWithDetails[] {
  const q = query.toLowerCase()
  return mockBusinesses.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.categories.some((c) => c.name.toLowerCase().includes(q)) ||
      b.products.some((p) => p.name.toLowerCase().includes(q)) ||
      b.services.some((s) => s.name.toLowerCase().includes(q))
  )
}

export function getFeaturedBusinesses(): BusinessWithDetails[] {
  return mockBusinesses.filter((b) => b.is_featured)
}

export function getStores(): BusinessWithDetails[] {
  return mockBusinesses.filter((b) => b.type === 'store')
}

export function getServiceProviders(): BusinessWithDetails[] {
  return mockBusinesses.filter((b) => b.type === 'service_provider')
}

// Admin mock data
export const mockAdminStats: AdminDashboardStats = {
  total_businesses: 10,
  active_businesses: 10,
  pending_approval: 2,
  total_users: 156,
  total_reviews: 89,
  monthly_revenue: 1850,
  active_subscriptions: 10,
  plan_distribution: { basic: 3, premium: 4, pro: 3 },
  new_businesses_this_month: 3,
  churn_rate: 2.5,
}

export const mockBanners: Banner[] = [
  { id: 'b1', title: 'Semana do Consumidor', image_url: '/banner-placeholder.jpg', link: '/buscar', position: 'home_hero', business_id: null, starts_at: '2024-03-10', ends_at: '2026-12-31', is_active: true, total_impressions: 4500, total_clicks: 320, created_at: '2024-03-10' },
]

export const mockLeads: Lead[] = [
  { id: 'l1', business_id: '1', name: 'Pedro Almeida', phone: '21999990001', email: 'pedro@email.com', message: 'Gostaria de saber se fazem delivery para o bairro Jardim.', source: 'whatsapp', status: 'new', created_at: '2024-03-15' },
  { id: 'l2', business_id: '1', name: 'Sandra Mello', phone: '21999990002', email: null, message: 'Vocês aceitam encomendas para eventos?', source: 'whatsapp', status: 'contacted', created_at: '2024-03-14' },
  { id: 'l3', business_id: '2', name: 'Juliana Torres', phone: '21999990003', email: 'ju@email.com', message: null, source: 'phone', status: 'converted', created_at: '2024-03-13' },
]

export const mockNotifications: Notification[] = [
  { id: 'n1', user_id: 'user1', type: 'review', title: 'Nova avaliação!', body: 'Luciana Ferreira deixou uma avaliação 5 estrelas.', data: { business_id: '1', review_id: 'r3' }, is_read: false, created_at: '2024-03-15T10:30:00' },
  { id: 'n2', user_id: 'user1', type: 'lead', title: 'Novo contato!', body: 'Pedro Almeida entrou em contato via WhatsApp.', data: { business_id: '1', lead_id: 'l1' }, is_read: false, created_at: '2024-03-15T09:15:00' },
  { id: 'n3', user_id: 'user1', type: 'subscription', title: 'Pagamento confirmado', body: 'Seu plano Premium foi renovado com sucesso.', data: null, is_read: true, created_at: '2024-03-01T08:00:00' },
]

export const mockPayments: PaymentTransaction[] = [
  { id: 'pay1', business_id: '1', amount: 150, status: 'paid', payment_method: 'pix', gateway_ref: 'PIX-2024-001', description: 'Plano Premium - Março/2024', created_at: '2024-03-01' },
  { id: 'pay2', business_id: '1', amount: 150, status: 'paid', payment_method: 'pix', gateway_ref: 'PIX-2024-002', description: 'Plano Premium - Fevereiro/2024', created_at: '2024-02-01' },
  { id: 'pay3', business_id: '2', amount: 250, status: 'paid', payment_method: 'credit_card', gateway_ref: 'CC-2024-003', description: 'Plano Profissional - Março/2024', created_at: '2024-03-01' },
]

export const mockBusinessDashboard: BusinessDashboardStats = {
  total_views: 1248,
  views_change: 12,
  whatsapp_clicks: 86,
  whatsapp_change: 8,
  phone_clicks: 34,
  phone_change: -2,
  total_reviews: 48,
  average_rating: 4.7,
  profile_completeness: 78,
  daily_views: [
    { date: '2024-03-09', views: 32 }, { date: '2024-03-10', views: 45 },
    { date: '2024-03-11', views: 38 }, { date: '2024-03-12', views: 52 },
    { date: '2024-03-13', views: 41 }, { date: '2024-03-14', views: 48 },
    { date: '2024-03-15', views: 56 },
  ],
}
