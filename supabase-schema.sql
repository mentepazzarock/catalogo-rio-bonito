-- ============================================
-- Catálogo Rio Bonito - Schema Completo
-- Supabase (PostgreSQL)
-- Versão 3.1 - 2026-03-25
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- User Profiles (extends Supabase Auth)
-- ============================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'consumer' CHECK (role IN ('admin', 'business_owner', 'consumer')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_email ON user_profiles(email);

-- ============================================
-- Categories
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT 'Store',
  description TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);

-- ============================================
-- Businesses (Stores & Service Providers)
-- ============================================
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('store', 'service_provider')),
  description TEXT NOT NULL DEFAULT '',
  short_description TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  website TEXT,
  instagram TEXT,
  facebook TEXT,
  tiktok TEXT,
  address TEXT NOT NULL DEFAULT '',
  neighborhood TEXT,
  city TEXT NOT NULL DEFAULT 'Rio Bonito',
  state TEXT NOT NULL DEFAULT 'RJ',
  zip_code TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  logo_url TEXT,
  cover_url TEXT,
  photos TEXT[] DEFAULT '{}',
  attributes JSONB DEFAULT '{}',
  subscription_plan TEXT NOT NULL DEFAULT 'basic' CHECK (subscription_plan IN ('basic', 'premium', 'pro')),
  subscription_status TEXT NOT NULL DEFAULT 'trial' CHECK (subscription_status IN ('active', 'inactive', 'trial')),
  subscription_expires_at TIMESTAMPTZ,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  average_rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  total_views INTEGER NOT NULL DEFAULT 0,
  total_whatsapp_clicks INTEGER NOT NULL DEFAULT 0,
  total_phone_clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_businesses_slug ON businesses(slug);
CREATE INDEX idx_businesses_owner ON businesses(owner_id);
CREATE INDEX idx_businesses_type ON businesses(type);
CREATE INDEX idx_businesses_city ON businesses(city);
CREATE INDEX idx_businesses_active ON businesses(is_active);
CREATE INDEX idx_businesses_featured ON businesses(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_businesses_search ON businesses USING gin(name gin_trgm_ops);

-- ============================================
-- Business Categories (many-to-many)
-- ============================================
CREATE TABLE business_categories (
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (business_id, category_id)
);

CREATE INDEX idx_bc_category ON business_categories(category_id);

-- ============================================
-- Business Hours
-- ============================================
CREATE TABLE business_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
  open_time TIME NOT NULL,
  close_time TIME NOT NULL,
  is_closed BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE(business_id, day_of_week)
);

CREATE INDEX idx_hours_business ON business_hours(business_id);

-- ============================================
-- Products (for stores)
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  category_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  promotional_price NUMERIC(10,2),
  image_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_business ON products(business_id);

-- ============================================
-- Service Items (for service providers)
-- ============================================
CREATE TABLE service_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  duration_minutes INTEGER,
  image_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_service_items_business ON service_items(business_id);

-- ============================================
-- Reviews
-- ============================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL DEFAULT '',
  user_avatar TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  reply TEXT,
  replied_at TIMESTAMPTZ,
  is_reported BOOLEAN NOT NULL DEFAULT FALSE,
  helpful_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_business ON reviews(business_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE UNIQUE INDEX idx_reviews_unique ON reviews(business_id, user_id);

-- ============================================
-- Promotions
-- ============================================
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed', 'coupon')),
  discount_value NUMERIC(10,2),
  coupon_code TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  total_views INTEGER NOT NULL DEFAULT 0,
  total_redemptions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_promotions_business ON promotions(business_id);
CREATE INDEX idx_promotions_active ON promotions(is_active, end_date);

-- ============================================
-- Favorites
-- ============================================
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, business_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_business ON favorites(business_id);

-- ============================================
-- Business Views / Analytics
-- ============================================
CREATE TABLE business_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL DEFAULT 'view',
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_views_business ON business_views(business_id);
CREATE INDEX idx_views_created ON business_views(created_at);

-- ============================================
-- Leads
-- ============================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'form' CHECK (source IN ('whatsapp', 'phone', 'form', 'booking')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_business ON leads(business_id);

-- ============================================
-- Banners
-- ============================================
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link TEXT,
  position TEXT NOT NULL DEFAULT 'home_hero' CHECK (position IN ('home_hero', 'home_middle', 'search_top', 'category_top')),
  business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
  starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ends_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  total_impressions INTEGER NOT NULL DEFAULT 0,
  total_clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- Payment Transactions
-- ============================================
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  gateway_ref TEXT,
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_business ON payment_transactions(business_id);

-- ============================================
-- Notifications
-- ============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'system',
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  data JSONB,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);

-- ============================================
-- Search Analytics
-- ============================================
CREATE TABLE search_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  query TEXT NOT NULL,
  results_count INTEGER NOT NULL DEFAULT 0,
  category_filter TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- Triggers
-- ============================================

-- Auto-update average_rating on review changes
CREATE OR REPLACE FUNCTION update_business_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE businesses SET
    average_rating = COALESCE((
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM reviews
      WHERE business_id = COALESCE(NEW.business_id, OLD.business_id)
    ), 0),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE business_id = COALESCE(NEW.business_id, OLD.business_id)
    ),
    updated_at = NOW()
  WHERE id = COALESCE(NEW.business_id, OLD.business_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_rating
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_business_rating();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_businesses_updated_at
BEFORE UPDATE ON businesses
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_service_items_updated_at
BEFORE UPDATE ON service_items
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create user_profile on auth signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'consumer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- User Profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON user_profiles FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Service role can insert profiles"
  ON user_profiles FOR INSERT
  WITH CHECK (TRUE);

-- Businesses
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active businesses"
  ON businesses FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Owners can view own inactive businesses"
  ON businesses FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can update their own business"
  ON businesses FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Authenticated users can insert businesses"
  ON businesses FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Business owners can manage products"
  ON products FOR ALL
  USING (business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid()));

-- Service Items
ALTER TABLE service_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active service items"
  ON service_items FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Business owners can manage service items"
  ON service_items FOR ALL
  USING (business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid()));

-- Reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Business owners can reply to reviews"
  ON reviews FOR UPDATE
  USING (business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid()));

-- Business Hours
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view business hours"
  ON business_hours FOR SELECT USING (TRUE);

CREATE POLICY "Business owners can manage hours"
  ON business_hours FOR ALL
  USING (business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid()));

-- Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT USING (TRUE);

-- Business Categories
ALTER TABLE business_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view business categories"
  ON business_categories FOR SELECT USING (TRUE);

CREATE POLICY "Business owners can manage business categories"
  ON business_categories FOR ALL
  USING (business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid()));

-- Promotions
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active promotions"
  ON promotions FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Business owners can manage promotions"
  ON promotions FOR ALL
  USING (business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid()));

-- Favorites
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites"
  ON favorites FOR ALL
  USING (auth.uid() = user_id);

-- Business Views
ALTER TABLE business_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert views"
  ON business_views FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Business owners can view their analytics"
  ON business_views FOR SELECT
  USING (business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid()));

-- Leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create leads"
  ON leads FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Business owners can view their leads"
  ON leads FOR SELECT
  USING (business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid()));

-- Banners
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active banners"
  ON banners FOR SELECT
  USING (is_active = TRUE);

-- Payment Transactions
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business owners can view their payments"
  ON payment_transactions FOR SELECT
  USING (business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid()));

-- Notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- Seed: Categories (15 categorias)
-- ============================================
INSERT INTO categories (name, slug, icon, description, sort_order, is_active) VALUES
  ('Alimentação', 'alimentacao', 'UtensilsCrossed', 'Restaurantes, lanchonetes, pizzarias e mais', 1, TRUE),
  ('Beleza & Estética', 'beleza-estetica', 'Sparkles', 'Salões, barbearias, clínicas de estética', 2, TRUE),
  ('Saúde', 'saude', 'Heart', 'Médicos, dentistas, fisioterapeutas', 3, TRUE),
  ('Moda & Vestuário', 'moda-vestuario', 'Shirt', 'Roupas, calçados, acessórios', 4, TRUE),
  ('Reparos & Manutenção', 'reparos-manutencao', 'Wrench', 'Eletricistas, encanadores, técnicos', 5, TRUE),
  ('Educação', 'educacao', 'GraduationCap', 'Escolas, cursos, aulas particulares', 6, TRUE),
  ('Tecnologia', 'tecnologia', 'Laptop', 'Informática, celulares, assistência técnica', 7, TRUE),
  ('Automotivo', 'automotivo', 'Car', 'Oficinas, autopeças, lava-jato', 8, TRUE),
  ('Casa & Decoração', 'casa-decoracao', 'Home', 'Móveis, decoração, materiais de construção', 9, TRUE),
  ('Esporte & Lazer', 'esporte-lazer', 'Dumbbell', 'Academias, esportes, entretenimento', 10, TRUE),
  ('Pet Shop & Veterinário', 'pet-shop-veterinario', 'PawPrint', 'Pets, banho e tosa, veterinários', 11, TRUE),
  ('Advocacia & Contabilidade', 'advocacia-contabilidade', 'Scale', 'Advogados, contadores, consultores', 12, TRUE),
  ('Construção Civil', 'construcao-civil', 'HardHat', 'Engenheiros, pedreiros, arquitetos', 13, TRUE),
  ('Fotografia & Eventos', 'fotografia-eventos', 'Camera', 'Fotógrafos, buffets, decoração de festas', 14, TRUE),
  ('Supermercados & Conveniência', 'supermercados-conveniencia', 'ShoppingCart', 'Mercados, mercearias, conveniências', 15, TRUE);
