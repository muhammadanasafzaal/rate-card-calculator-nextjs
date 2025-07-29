-- Insert regions
INSERT INTO regions (id, name, multiplier) VALUES
('euro-asia', 'Euro Asia', 1.00),
('middle-east', 'Middle East', 1.15),
('europe', 'Europe', 1.30),
('north-america', 'North America', 1.40)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  multiplier = EXCLUDED.multiplier;

-- Insert roles
INSERT INTO roles (id, name, base_rate, category) VALUES
('database-developer', 'Database Developer', 8000, 'Development'),
('full-stack-developer', 'Full Stack Developer', 10000, 'Development'),
('frontend-developer', 'Frontend Developer', 9000, 'Development'),
('backend-developer', 'Backend Developer', 9500, 'Development'),
('mobile-developer', 'Mobile Developer', 9500, 'Development'),
('devops-engineer', 'DevOps Engineer', 11000, 'Infrastructure'),
('quality-assurance', 'Quality Assurance', 7000, 'Testing'),
('ui-ux-designer', 'UI/UX Designer', 8500, 'Design'),
('project-manager', 'Project Manager', 12000, 'Management'),
('business-analyst', 'Business Analyst', 9000, 'Analysis')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  base_rate = EXCLUDED.base_rate,
  category = EXCLUDED.category;

-- Insert seniority levels
INSERT INTO seniority_levels (id, name, multiplier) VALUES
('intermediate', 'Intermediate', 1.00),
('advanced', 'Advanced', 1.25),
('expert', 'Expert', 1.60)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  multiplier = EXCLUDED.multiplier;

-- Insert workload options
INSERT INTO workload_options (id, label, percentage) VALUES
('2-days', '2 days/week (40%)', 40),
('3-days', '3 days/week (60%)', 60),
('4-days', '4 days/week (80%)', 80),
('full-time', 'Full-time (100%)', 100)
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  percentage = EXCLUDED.percentage;

-- Insert duration options
INSERT INTO duration_options (id, label, months, discount) VALUES
('1-month', '1 month', 1, 0),
('2-months', '2 months', 2, 5),
('3-months', '3 months', 3, 10),
('4-months', '4 months', 4, 15),
('5-months', '5 months', 5, 15),
('6-months', '6 months', 6, 15),
('12-months', '12 months', 12, 15)
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  months = EXCLUDED.months,
  discount = EXCLUDED.discount;

-- Insert currencies
INSERT INTO currencies (code, name, symbol, exchange_rate) VALUES
('AED', 'UAE Dirham', 'د.إ', 1.000000),
('USD', 'US Dollar', '$', 0.270000),
('EUR', 'Euro', '€', 0.250000),
('GBP', 'British Pound', '£', 0.210000),
('PKR', 'Pakistani Rupee', '₨', 76.500000)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  symbol = EXCLUDED.symbol,
  exchange_rate = EXCLUDED.exchange_rate,
  last_updated = CURRENT_TIMESTAMP;
