-- Create regions table
CREATE TABLE IF NOT EXISTS regions (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  multiplier DECIMAL(3,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  base_rate INTEGER NOT NULL,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create seniority levels table
CREATE TABLE IF NOT EXISTS seniority_levels (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  multiplier DECIMAL(3,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create workload options table
CREATE TABLE IF NOT EXISTS workload_options (
  id VARCHAR(50) PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  percentage INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create duration options table
CREATE TABLE IF NOT EXISTS duration_options (
  id VARCHAR(50) PRIMARY KEY,
  label VARCHAR(50) NOT NULL,
  months INTEGER NOT NULL,
  discount INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create currencies table
CREATE TABLE IF NOT EXISTS currencies (
  code VARCHAR(3) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  symbol VARCHAR(10) NOT NULL,
  exchange_rate DECIMAL(10,6) DEFAULT 1.0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create quotes table for tracking sent quotes
CREATE TABLE IF NOT EXISTS quotes (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  company VARCHAR(100),
  calculator_type VARCHAR(50) NOT NULL,
  role_id VARCHAR(50) NOT NULL,
  seniority_id VARCHAR(50) NOT NULL,
  region_id VARCHAR(50),
  workload_id VARCHAR(50),
  duration_id VARCHAR(50),
  currency VARCHAR(3) NOT NULL,
  base_rate INTEGER NOT NULL,
  final_rate INTEGER NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
