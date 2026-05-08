-- ═══════════════════════════════════════════════════════════════════════════
-- Roots of Rise — Complete Database Schema
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── ENUM Types ──────────────────────────────────────────────────────────────

CREATE TYPE user_role AS ENUM ('member', 'volunteer_coordinator', 'editor', 'admin', 'super_admin');
CREATE TYPE application_status AS ENUM ('pending', 'under_review', 'accepted', 'rejected', 'waitlisted');
CREATE TYPE project_status AS ENUM ('planning', 'active', 'completed', 'on_hold');
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE opportunity_type AS ENUM ('volunteer', 'internship', 'fellowship', 'event');
CREATE TYPE opportunity_status AS ENUM ('open', 'closed', 'draft');
CREATE TYPE project_category AS ENUM ('education', 'environment', 'social_welfare');
CREATE TYPE message_status AS ENUM ('new', 'read', 'replied', 'archived');
CREATE TYPE member_status AS ENUM ('active', 'inactive');

-- ─── Users Table (extends auth.users) ────────────────────────────────────────

CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'member',
  is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- ─── Profiles ─────────────────────────────────────────────────────────────────

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  age INTEGER CHECK (age >= 13 AND age <= 120),
  gender TEXT,
  occupation TEXT,
  institution TEXT,
  education_level TEXT,
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  availability TEXT,
  bio TEXT CHECK (LENGTH(bio) <= 500),
  profile_photo TEXT,
  social_link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Opportunities ────────────────────────────────────────────────────────────

CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type opportunity_type NOT NULL DEFAULT 'volunteer',
  description TEXT NOT NULL,
  category TEXT,
  location TEXT,
  requirements TEXT,
  responsibilities TEXT,
  status opportunity_status NOT NULL DEFAULT 'open',
  deadline DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Volunteer Applications ───────────────────────────────────────────────────

CREATE TABLE public.volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  age INTEGER,
  gender TEXT,
  occupation TEXT,
  institution TEXT,
  education_level TEXT,
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  availability TEXT NOT NULL,
  motivation TEXT NOT NULL CHECK (LENGTH(motivation) >= 50),
  experience TEXT,
  preferred_program TEXT,
  social_link TEXT,
  agree_to_terms BOOLEAN NOT NULL DEFAULT FALSE,
  status application_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  reviewed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_applications_user_id ON public.volunteer_applications(user_id);
CREATE INDEX idx_applications_status ON public.volunteer_applications(status);
CREATE INDEX idx_applications_created_at ON public.volunteer_applications(created_at DESC);

-- ─── Projects ─────────────────────────────────────────────────────────────────

CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category project_category NOT NULL DEFAULT 'education',
  short_description TEXT NOT NULL,
  full_description TEXT,
  problem TEXT,
  solution TEXT,
  impact TEXT,
  cover_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  location TEXT,
  date DATE,
  status project_status NOT NULL DEFAULT 'planning',
  impact_metrics JSONB DEFAULT '{}',
  sdg_tags TEXT[] DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_category ON public.projects(category);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_featured ON public.projects(featured);

-- ─── Programs ─────────────────────────────────────────────────────────────────

CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  description TEXT NOT NULL,
  activities TEXT[] DEFAULT '{}',
  impact_goals TEXT[] DEFAULT '{}',
  cover_image TEXT,
  related_project_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Team Members ─────────────────────────────────────────────────────────────

CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  photo TEXT,
  linkedin TEXT,
  facebook TEXT,
  email TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status member_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_team_display_order ON public.team_members(display_order);

-- ─── Blog Posts ───────────────────────────────────────────────────────────────

CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'General',
  author TEXT NOT NULL DEFAULT 'Roots of Rise',
  status post_status NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_status ON public.blog_posts(status);
CREATE INDEX idx_blog_category ON public.blog_posts(category);

-- ─── Testimonials ─────────────────────────────────────────────────────────────

CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  quote TEXT NOT NULL,
  photo TEXT,
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Gallery Images ───────────────────────────────────────────────────────────

CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  category TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Contact Messages ─────────────────────────────────────────────────────────

CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status message_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON public.contact_messages(status);
CREATE INDEX idx_contact_created_at ON public.contact_messages(created_at DESC);

-- ─── Site Settings ────────────────────────────────────────────────────────────

CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Newsletter Subscribers ───────────────────────────────────────────────────

CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- TRIGGERS & FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════════════

-- Auto-create user + profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Mark email verified when Supabase confirms
CREATE OR REPLACE FUNCTION public.handle_email_confirmed()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    UPDATE public.users
    SET is_email_verified = TRUE, updated_at = NOW()
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_email_confirmed
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_email_confirmed();

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.volunteer_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_team_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_blog_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON public.gallery_images FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON public.contact_messages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ═══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ── users policies
CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.users WHERE id = auth.uid()));
CREATE POLICY "users_admin_select_all" ON public.users FOR SELECT USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'volunteer_coordinator')
);

-- ── profiles policies
CREATE POLICY "profiles_select_public" ON public.profiles FOR SELECT USING (TRUE);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- ── opportunities policies
CREATE POLICY "opportunities_select_open" ON public.opportunities FOR SELECT USING (status = 'open' OR (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'editor', 'volunteer_coordinator'));
CREATE POLICY "opportunities_write_admin" ON public.opportunities FOR ALL USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'volunteer_coordinator')
);

-- ── applications policies
CREATE POLICY "applications_select" ON public.volunteer_applications FOR SELECT USING (
  auth.uid() = user_id OR
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'volunteer_coordinator')
);
CREATE POLICY "applications_insert_own" ON public.volunteer_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "applications_update_admin" ON public.volunteer_applications FOR UPDATE USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'volunteer_coordinator')
);

-- ── projects policies
CREATE POLICY "projects_select_public" ON public.projects FOR SELECT USING (TRUE);
CREATE POLICY "projects_write_admin" ON public.projects FOR ALL USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'editor')
);

-- ── programs policies
CREATE POLICY "programs_select_public" ON public.programs FOR SELECT USING (TRUE);
CREATE POLICY "programs_write_admin" ON public.programs FOR ALL USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'editor')
);

-- ── team policies
CREATE POLICY "team_select_active" ON public.team_members FOR SELECT USING (status = 'active' OR (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'editor'));
CREATE POLICY "team_write_admin" ON public.team_members FOR ALL USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'editor')
);

-- ── blog policies
CREATE POLICY "blog_select_published" ON public.blog_posts FOR SELECT USING (status = 'published' OR (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'editor'));
CREATE POLICY "blog_write_admin" ON public.blog_posts FOR ALL USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'editor')
);

-- ── testimonials policies
CREATE POLICY "testimonials_select_approved" ON public.testimonials FOR SELECT USING (approved = TRUE OR (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin'));
CREATE POLICY "testimonials_write_admin" ON public.testimonials FOR ALL USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin')
);

-- ── gallery policies
CREATE POLICY "gallery_select_public" ON public.gallery_images FOR SELECT USING (TRUE);
CREATE POLICY "gallery_write_admin" ON public.gallery_images FOR ALL USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin', 'editor')
);

-- ── contact_messages policies
CREATE POLICY "contact_insert_public" ON public.contact_messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "contact_select_admin" ON public.contact_messages FOR SELECT USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin')
);
CREATE POLICY "contact_update_admin" ON public.contact_messages FOR UPDATE USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin')
);

-- ── site_settings policies
CREATE POLICY "settings_select_public" ON public.site_settings FOR SELECT USING (TRUE);
CREATE POLICY "settings_write_admin" ON public.site_settings FOR ALL USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin')
);

-- ── newsletter policies
CREATE POLICY "newsletter_insert_public" ON public.newsletter_subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "newsletter_select_admin" ON public.newsletter_subscribers FOR SELECT USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) IN ('admin', 'super_admin')
);

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED: Site Settings
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO public.site_settings (key, value) VALUES
  ('org_name', 'Roots of Rise'),
  ('org_motto', 'Educate. Empower. Elevate.'),
  ('org_email', 'info@rootsofrise.org'),
  ('org_phone', '+880 1XXX-XXXXXX'),
  ('org_address', 'Dhaka, Bangladesh'),
  ('org_facebook', 'https://www.facebook.com/RootsofRise'),
  ('org_linkedin', 'https://www.linkedin.com/company/roots-of-rise/posts/?feedView=all'),
  ('impact_volunteers', '100'),
  ('impact_projects', '10'),
  ('impact_communities', '5'),
  ('impact_lives', '500'),
  ('impact_programs', '3'),
  ('hero_heading', 'Educate. Empower. Elevate.'),
  ('hero_subtext', 'Roots of Rise is a youth-led nonprofit working to create meaningful impact through education, social welfare, and environmental sustainability.'),
  ('footer_text', 'Growing change from the ground up. Join us in building a sustainable and just future.')
ON CONFLICT (key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED: Team Members
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO public.team_members (name, role, bio, linkedin, facebook, display_order, status) VALUES
  ('Shibly Ahmed', 'Founder & Executive Director', 'Passionate youth leader driving change through education and community empowerment. Founded Roots of Rise to organize youth action into lasting social impact.', 'https://linkedin.com', 'https://facebook.com/RootsofRise', 1, 'active'),
  ('Anika Rahman', 'Co-Founder & Program Director', 'Dedicated to building sustainable programs that create lasting change. Leads all three pillars of impact at Roots of Rise.', 'https://linkedin.com', 'https://facebook.com', 2, 'active'),
  ('Mehedi Hasan', 'Environmental Lead', 'Environmental advocate leading tree plantation drives, clean-up campaigns, and sustainability awareness programs.', 'https://linkedin.com', 'https://facebook.com', 3, 'active'),
  ('Tasnim Islam', 'Education Coordinator', 'Education specialist designing mentorship programs and learning support initiatives for underprivileged youth.', 'https://linkedin.com', 'https://facebook.com', 4, 'active'),
  ('Rafid Khan', 'Social Welfare Lead', 'Community champion organizing food drives, clothing distribution, and welfare support for vulnerable families.', 'https://linkedin.com', 'https://facebook.com', 5, 'active'),
  ('Nusrat Jahan', 'Media & Communications', 'Creative storyteller documenting the impact of Roots of Rise through compelling content and social media.', 'https://linkedin.com', 'https://facebook.com', 6, 'active'),
  ('Imtiaz Ahmed', 'Volunteer Coordinator', 'Manages volunteer recruitment, training, and deployment across all programs and projects.', 'https://linkedin.com', 'https://facebook.com', 7, 'active'),
  ('Sadia Akter', 'Research & Documentation', 'Tracks impact metrics, documents project outcomes, and prepares organizational reports.', 'https://linkedin.com', 'https://facebook.com', 8, 'active')
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED: Projects
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO public.projects (title, slug, category, short_description, full_description, problem, solution, impact, location, date, status, featured, sdg_tags) VALUES
  (
    'Learning Support Campaign',
    'learning-support-campaign',
    'education',
    'Providing free tutoring, learning materials, and educational support to underprivileged students in urban communities.',
    'Our Learning Support Campaign was launched to bridge the educational gap faced by economically disadvantaged students in urban Dhaka. Through weekly tutoring sessions, we provide free access to quality education that many students cannot afford.',
    'Millions of children in Bangladesh lack access to quality education due to economic barriers, leading to high dropout rates and limited future opportunities.',
    'We deployed trained youth volunteers as tutors across community centers, providing free weekly sessions in core subjects including Math, English, and Science. We also distributed learning materials and connected families with additional resources.',
    'Supported 150+ students with free tutoring, distributed 500+ learning materials, and achieved a 40% improvement in academic performance among participants.',
    'Dhaka, Bangladesh',
    '2024-01-15',
    'active',
    TRUE,
    ARRAY['SDG 4: Quality Education', 'SDG 10: Reduced Inequalities']
  ),
  (
    'Clean & Green Community Drive',
    'clean-green-community-drive',
    'environment',
    'A comprehensive environmental initiative combining tree plantation, waste management, and community awareness campaigns.',
    'Our flagship environmental program combines tree plantation with community clean-up drives and sustainability education to create a cleaner, greener future.',
    'Rapid urbanization has led to severe environmental degradation in Bangladesh, with deforestation, plastic pollution, and lack of green spaces becoming critical issues.',
    'We organized monthly clean-up drives in collaboration with local municipalities, planted over 200 trees in community areas, and conducted awareness workshops on waste management and recycling.',
    'Planted 200+ trees, cleaned 15+ community areas, reached 2,000+ community members with environmental awareness, and established 3 community waste management committees.',
    'Dhaka & Surroundings',
    '2024-03-10',
    'active',
    TRUE,
    ARRAY['SDG 13: Climate Action', 'SDG 15: Life on Land', 'SDG 11: Sustainable Cities']
  ),
  (
    'Winter Support Initiative',
    'winter-support-initiative',
    'social_welfare',
    'Distributing warm clothing, blankets, and essential supplies to vulnerable communities during winter months.',
    'Every winter, thousands of vulnerable families in Bangladesh suffer from the cold without adequate warm clothing. Our initiative mobilizes volunteers to collect and distribute winter supplies.',
    'Economic hardship prevents many families from affording warm clothing during Bangladesh winters, particularly affecting children, the elderly, and daily wage workers.',
    'We mobilized volunteers to collect donations, sorted and packaged warm clothing and blankets, and organized distribution drives in low-income communities across Dhaka.',
    'Distributed warm clothing and blankets to 500+ families, reached 1,200+ individuals, and partnered with 5 local community organizations.',
    'Dhaka, Bangladesh',
    '2023-12-01',
    'completed',
    TRUE,
    ARRAY['SDG 1: No Poverty', 'SDG 3: Good Health and Well-being']
  ),
  (
    'Youth Awareness Sessions',
    'youth-awareness-sessions',
    'education',
    'Interactive workshops on mental health, leadership, digital literacy, and civic responsibility for youth.',
    'We run monthly awareness sessions empowering youth with essential life skills and knowledge, from mental health literacy to digital skills and responsible citizenship.',
    'Young people in Bangladesh often lack exposure to critical topics like mental health awareness, digital literacy, and civic engagement.',
    'We designed interactive workshop curricula and delivered monthly sessions at schools, colleges, and community centers, facilitated by trained youth volunteers.',
    'Delivered 20+ workshops, reached 1,000+ youth participants, and trained 30 youth facilitators.',
    'Multiple Locations, Bangladesh',
    '2024-02-20',
    'active',
    FALSE,
    ARRAY['SDG 4: Quality Education', 'SDG 3: Good Health']
  ),
  (
    'Tree Plantation Drive',
    'tree-plantation-drive',
    'environment',
    'Mass tree plantation events to combat deforestation and increase urban green cover across communities.',
    'Our quarterly tree plantation drives engage hundreds of volunteers in planting native tree species across schools, parks, and community areas.',
    'Bangladesh faces serious deforestation challenges, with urban green cover declining rapidly due to development pressures.',
    'We coordinated with local government and schools to identify planting sites, procured native tree saplings, and organized mass planting events with community participation.',
    'Planted 500+ native trees, engaged 300+ volunteers, and established long-term maintenance commitments with local institutions.',
    'Dhaka Metropolitan Area',
    '2024-04-22',
    'active',
    FALSE,
    ARRAY['SDG 13: Climate Action', 'SDG 15: Life on Land']
  ),
  (
    'Community Support Drive',
    'community-support-drive',
    'social_welfare',
    'Food distribution and essential supplies for families in need across urban slum communities.',
    'Regular food distribution drives providing essential nutrition support to the most vulnerable urban communities.',
    'Food insecurity affects millions in Bangladesh, with urban slum communities particularly vulnerable to hunger and malnutrition.',
    'We mobilized volunteer teams to prepare and distribute food packages to vulnerable families, in partnership with local mosques and community leaders.',
    'Distributed food to 300+ families, reached 1,500+ individuals, and built lasting partnerships with 8 community organizations.',
    'Dhaka Slum Communities',
    '2024-05-01',
    'active',
    FALSE,
    ARRAY['SDG 2: Zero Hunger', 'SDG 1: No Poverty']
  )
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED: Programs
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO public.programs (title, slug, tagline, description, activities, impact_goals) VALUES
  (
    'Education Program',
    'education',
    'Empowering Minds, Building Futures',
    'Our Education Program works to expand access to quality education for underprivileged youth through mentorship, tutoring support, awareness campaigns, and skill development workshops. We believe every young person deserves the opportunity to learn, grow, and succeed.',
    ARRAY['Free tutoring sessions', 'Learning material distribution', 'Career guidance workshops', 'Digital literacy training', 'Youth awareness sessions', 'School support initiatives'],
    ARRAY['Support 500+ students annually', 'Train 50+ youth tutors', 'Partner with 10+ institutions', 'Improve academic performance by 30%']
  ),
  (
    'Environmental Sustainability Program',
    'environment',
    'Protecting Our Planet, Together',
    'Our Environmental Sustainability Program mobilizes youth to take concrete action for the planet. From tree plantation drives to clean-up campaigns, we build environmental awareness and inspire sustainable practices in communities across Bangladesh.',
    ARRAY['Tree plantation drives', 'Community clean-up campaigns', 'Environmental awareness workshops', 'Waste management training', 'Green school initiatives', 'Climate advocacy'],
    ARRAY['Plant 1,000+ trees annually', 'Conduct 12+ clean-up events', 'Reach 5,000+ with awareness', 'Partner with 5+ municipalities']
  ),
  (
    'Social Welfare Program',
    'social-welfare',
    'Compassion in Action',
    'Our Social Welfare Program directly supports vulnerable communities through food distribution, clothing drives, and essential welfare initiatives. We work to ensure that no community is left behind, providing dignity and support to those who need it most.',
    ARRAY['Food distribution drives', 'Winter clothing campaigns', 'Emergency relief support', 'Community health awareness', 'Support for elderly', 'Child welfare initiatives'],
    ARRAY['Reach 2,000+ vulnerable individuals', 'Conduct 6+ welfare drives', 'Partner with 10+ NGOs', 'Build 5 community welfare networks']
  )
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED: Testimonials
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO public.testimonials (name, role, quote, approved) VALUES
  ('Arif Hossain', 'Volunteer, Education Program', 'Joining Roots of Rise changed my perspective completely. I realized that youth can make a real difference when we are organized and committed. Tutoring those students was one of the most rewarding experiences of my life.', TRUE),
  ('Fatema Khanam', 'Community Member, Dhaka', 'The Learning Support Campaign helped my daughter so much. She was struggling in school, but after the tutoring sessions, she is now one of the top students in her class. I am so grateful to these young volunteers.', TRUE),
  ('Tanvir Rahman', 'Environmental Volunteer', 'I never thought planting trees could feel this meaningful. Being part of the Green Drive showed me that small actions, done together, can create real environmental impact. Roots of Rise is doing something truly special.', TRUE),
  ('Salma Begum', 'Welfare Program Beneficiary', 'During last winter, I did not know how my children would stay warm. The Roots of Rise team came to our community and distributed warm clothes and blankets. Their compassion and care touched my heart deeply.', TRUE),
  ('Nabil Ahmed', 'Team Member', 'Roots of Rise is not just an organization — it is a family of young people who genuinely care. Working here has helped me grow as a leader and as a person. I am proud to be part of this movement.', TRUE),
  ('Rima Sultana', 'Education Volunteer', 'The youth awareness sessions gave me a platform to talk about mental health in my community. It is rare to find an organization that trusts young people to lead important conversations. Roots of Rise does exactly that.', TRUE)
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED: Opportunities
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO public.opportunities (title, slug, type, description, category, location, requirements, responsibilities, status, deadline) VALUES
  (
    'Education Program Volunteer',
    'education-program-volunteer',
    'volunteer',
    'Join our Education team as a volunteer tutor and mentor. Help underprivileged students with their studies and inspire them to reach their potential.',
    'Education',
    'Dhaka, Bangladesh',
    'Minimum HSC level education. Passion for teaching and mentoring youth. Available on weekends.',
    'Conduct weekly tutoring sessions, distribute learning materials, maintain student progress records, participate in team meetings.',
    'open',
    '2025-12-31'
  ),
  (
    'Environmental Sustainability Volunteer',
    'environmental-volunteer',
    'volunteer',
    'Be part of our green team. Participate in tree plantation drives, clean-up campaigns, and environmental awareness programs.',
    'Environmental Sustainability',
    'Dhaka Metropolitan Area',
    'Passion for the environment. Ability to participate in outdoor activities. Team player.',
    'Participate in monthly clean-up drives, assist with tree plantation events, help conduct awareness sessions, coordinate with community members.',
    'open',
    '2025-12-31'
  ),
  (
    'Social Welfare Volunteer',
    'social-welfare-volunteer',
    'volunteer',
    'Make a direct impact on vulnerable communities. Help organize and execute food drives, clothing campaigns, and community support initiatives.',
    'Social Welfare',
    'Dhaka, Bangladesh',
    'Compassionate personality. Ability to work with diverse communities. Physical ability to assist with distribution activities.',
    'Assist with food and clothing distribution, help identify vulnerable families, coordinate with community leaders, document impact.',
    'open',
    '2025-12-31'
  )
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED: Blog Posts
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO public.blog_posts (title, slug, excerpt, content, category, author, status, featured) VALUES
  (
    'How Youth Volunteers Are Transforming Education in Dhaka',
    'youth-volunteers-transforming-education-dhaka',
    'Our Learning Support Campaign is proving that young people with a passion for teaching can bridge the educational gap in underserved communities.',
    '# How Youth Volunteers Are Transforming Education in Dhaka

Every Saturday morning, a group of energetic young people gathers at a community center in Mirpur, Dhaka. They carry textbooks, stationery, and an infectious enthusiasm for learning. They are the youth volunteers of Roots of Rise, and they are changing lives — one tutoring session at a time.

## The Problem We Set Out to Solve

In Bangladesh, millions of children face significant barriers to quality education. Economic hardship forces many families to choose between school fees and basic necessities. As a result, dropout rates remain high, and academic performance suffers.

## Our Approach

The Roots of Rise Learning Support Campaign takes a simple but powerful approach: connect trained youth volunteers with students who need support. Volunteers — many of whom are university students themselves — provide free weekly tutoring in core subjects, distribute learning materials, and offer mentorship to struggling students.

## The Impact So Far

Since launching the campaign, we have supported over 150 students across three community centers in Dhaka. Academic performance has improved significantly, and parents report that their children are more motivated and confident in school.

## What Is Next

We are expanding to two new locations and training 20 additional volunteer tutors. If you believe in the power of education to transform lives, join us.',
    'Education',
    'Roots of Rise Team',
    'published',
    TRUE
  ),
  (
    'Planting Seeds of Change: Our Green Drive Story',
    'planting-seeds-of-change-green-drive',
    'Two hundred trees, fifteen community locations, and hundreds of passionate volunteers — our Clean and Green Community Drive is making Dhaka a little greener every month.',
    '# Planting Seeds of Change: Our Green Drive Story

On a warm April morning, 80 volunteers from Roots of Rise gathered at a school in Mohammadpur with shovels, saplings, and big dreams. By noon, they had planted 50 native trees — a small but meaningful addition to Dhaka''s urban green cover.

## Why Trees Matter in Dhaka

Dhaka is one of the world''s most densely populated cities, and rapid development has come at the cost of its green spaces. Air quality has deteriorated, temperatures have risen, and communities suffer the consequences of deforestation. Trees are not just beautiful — they are essential.

## The Green Drive in Action

Our Clean and Green Community Drive combines tree plantation with community clean-up campaigns. Each month, volunteer teams gather at designated sites, collect litter, and plant native tree saplings selected for their resilience and ecological value.

## Building Community Ownership

What makes our approach unique is the emphasis on community ownership. We do not just plant trees and leave. We work with schools, mosques, and local organizations to ensure that planted trees are maintained and protected long after our volunteers go home.

## Join the Green Movement

You do not need to be an environmental expert to make a difference. All you need is a willingness to show up and get your hands dirty. Join our next planting drive and be part of the green revolution.',
    'Environment',
    'Roots of Rise Environmental Team',
    'published',
    FALSE
  ),
  (
    'Voices from the Winter Drive: Stories of Warmth and Compassion',
    'voices-winter-drive-stories-warmth',
    'Behind every bundle of warm clothes is a story of compassion. Our Winter Support Initiative volunteers share their experiences from this year''s distribution drive.',
    '# Voices from the Winter Drive: Stories of Warmth and Compassion

Bangladesh winters can be unforgiving, especially for families in low-income communities who cannot afford warm clothing. This year, Roots of Rise mobilized 40 volunteers over two weeks to reach over 500 families with warm clothes, blankets, and essential winter supplies.

## A Volunteer''s Perspective

"I remember handing a warm jacket to an elderly man who was shivering outside his tin-roofed home," recalls Nabil, one of our social welfare volunteers. "He looked at the jacket, then at me, and his eyes filled with tears. That moment reminded me why we do this work."

## The Scale of Need

Our team spent weeks before the drive collecting donations from generous community members and local businesses. Sorting through hundreds of pieces of clothing, packaging bundles for different age groups, and planning the distribution logistics — it was a coordinated effort that required every volunteer''s full commitment.

## What We Learned

This year''s Winter Drive taught us that the impact of social welfare work goes beyond the material. The conversations our volunteers had with community members — learning about their lives, their struggles, and their hopes — created bonds that no policy can replicate.

## Looking Ahead

We are already planning next year''s Winter Drive with expanded reach and better logistics. If you want to be part of this compassionate mission, join our Social Welfare volunteer team.',
    'Social Welfare',
    'Roots of Rise Social Welfare Team',
    'published',
    FALSE
  )
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED: Gallery Images
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO public.gallery_images (image_url, caption, category) VALUES
  ('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop', 'Volunteers working together at a community event', 'Community'),
  ('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop', 'Youth tutoring session at a community center', 'Education'),
  ('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop', 'Tree plantation drive in action', 'Environment'),
  ('https://images.unsplash.com/photo-1542601906-fd8e7ad8b065?w=800&h=600&fit=crop', 'Environmental awareness campaign', 'Environment'),
  ('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop', 'Food distribution for vulnerable families', 'Social Welfare'),
  ('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop', 'Community gathering and teamwork', 'Community'),
  ('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop', 'Youth leadership workshop', 'Education'),
  ('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', 'Team meeting and planning session', 'Team'),
  ('https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=600&fit=crop', 'Volunteers in action during an event', 'Community'),
  ('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop', 'Children benefiting from education programs', 'Education')
ON CONFLICT DO NOTHING;
