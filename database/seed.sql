-- Sample users
INSERT INTO users (id, name, email, password, role) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Alice Johnson', 'alice@example.com', '$2b$10$example_hash_1', 'user'),
('550e8400-e29b-41d4-a716-446655440001', 'Bob Smith', 'bob@example.com', '$2b$10$example_hash_2', 'user'),
('550e8400-e29b-41d4-a716-446655440002', 'Admin User', 'admin@example.com', '$2b$10$example_hash_3', 'admin')
ON CONFLICT DO NOTHING;

-- Sample events
INSERT INTO events (id, title, description, category, closes_at, status) VALUES
('650e8400-e29b-41d4-a716-446655440000', 'Bitcoin Price Movement', 'Will BTC price go up or down today?', 'crypto', NOW() + INTERVAL '24 hours', 'open'),
('650e8400-e29b-41d4-a716-446655440001', 'Stock Market', 'Will S&P 500 close higher today?', 'stocks', NOW() + INTERVAL '48 hours', 'open'),
('650e8400-e29b-41d4-a716-446655440002', 'Weather Prediction', 'Will it rain tomorrow?', 'weather', NOW() + INTERVAL '12 hours', 'open')
ON CONFLICT DO NOTHING;
