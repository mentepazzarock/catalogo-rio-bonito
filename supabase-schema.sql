-- ============================================
-- Catálogo Rio Bonito - Database Schema
-- Supabase (PostgreSQL)
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search

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
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);

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
  address TEXT NOT NULL,
  neighborhood TEXT,
  city TEXT NOT NULL DEFAULT 'Rio Bonito',
  state TEXT NOT NULL DEFAULT 'RJ',
  zip_code TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  logo_url TEXT,
  cover_url TEXT,
  photos TEXT[] DEFAULT '{}',
  subscription_plan TEXT NOT NULL DEFAULT 'basic' CHECK (subscription_plan IN ('basic', 'premium', 'pro')),
  subscription_status TEXT NOT NULL DEFAULT 'trial' CHECK (subscription_status IN ('active', 'inactive', 'trial')),
  subscription_expires_at TIMESTAMPTZ,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  average_rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  total_reviews INTEGER NOT NULL DEFAULT 0,
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
-- Services (for service providers)
-- ============================================
CREATE TABLE services (
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

CREATE INDEX idx_services_business ON services(business_id);

-- ============================================
-- Reviews
-- ============================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  reply TEXT,
  replied_at TIMESTAMPTZ,
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
  description TEXT NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed', 'coupon')),
  discount_value NUMERIC(10,2),
  coupon_code TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_promotions_business ON promotions(business_id);
CREATE INDEX idx_promotions_active ON promotions(is_active, ends_at);

-- ============================================
-- Auto-update average_rating on review changes
-- ============================================
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

-- ============================================
-- Auto-update updated_at on business changes
-- ============================================
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

CREATE TRIGGER trigger_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Businesses: anyone can read active, only owner can update
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active businesses"
  ON businesses FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Owners can update their own business"
  ON businesses FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Authenticated users can insert businesses"
  ON businesses FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Products: public read, owner write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Business owners can manage products"
  ON products FOR ALL
  USING (
    business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

-- Services: public read, owner write
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Business owners can manage services"
  ON services FOR ALL
  USING (
    business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

-- Reviews: public read, authenticated write
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Business owners can reply to reviews"
  ON reviews FOR UPDATE
  USING (
    business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

-- Business Hours: public read, owner write
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view business hours"
  ON business_hours FOR SELECT
  USING (TRUE);

CREATE POLICY "Business owners can manage hours"
  ON business_hours FOR ALL
  USING (
    business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

-- Categories: public read
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (TRUE);

-- Promotions: public read active, owner write
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active promotions"
  ON promotions FOR SELECT
  USING (is_active = TRUE AND ends_at > NOW());

CREATE POLICY "Business owners can manage promotions"
  ON promotions FOR ALL
  USING (
    business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

-- ============================================
-- Seed initial categories
-- ============================================
INSERT INTO categories (name, slug, icon, description) VALUES
  ('Alimentação', 'alimentacao', 'UtensilsCrossed', 'Restaurantes, lanchonetes, pizzarias e mais'),
  ('Beleza & Estética', 'beleza-estetica', 'Sparkles', 'Salões, barbearias, clínicas de estética'),
  ('Saúde', 'saude', 'Heart', 'Médicos, dentistas, fisioterapeutas'),
  ('Moda & Vestuário', 'moda-vestuario', 'Shirt', 'Roupas, calçados, acessórios'),
  ('Reparos & Manutenção', 'reparos-manutencao', 'Wrench', 'Eletricistas, encanadores, técnicos'),
  ('Educação', 'educacao', 'GraduationCap', 'Escolas, cursos, aulas particulares'),
  ('Tecnologia', 'tecnologia', 'Laptop', 'Informática, celulares, assistência técnica'),
  ('Automotivo', 'automotivo', 'Car', 'Oficinas, autopeças, lava-jato'),
  ('Casa & Decoração', 'casa-decoracao', 'Home', 'Móveis, decoração, materiais de construção'),
  ('Esporte & Lazer', 'esporte-lazer', 'Dumbbell', 'Academias, esportes, entretenimento'),
  ('Pet Shop & Veterinário', 'pet-shop-veterinario', 'PawPrint', 'Pets, banho e tosa, veterinários'),
  ('Advocacia & Contabilidade', 'advocacia-contabilidade', 'Scale', 'Advogados, contadores, consultores'),
  ('Construção Civil', 'construcao-civil', 'HardHat', 'Engenheiros, pedreiros, arquitetos'),
  ('Fotografia & Eventos', 'fotografia-eventos', 'Camera', 'Fotógrafos, buffets, decoração'),
  ('Supermercados & Conveniência', 'supermercados-conveniencia', 'ShoppingCart', 'Mercados, mercearias, conveniências');
