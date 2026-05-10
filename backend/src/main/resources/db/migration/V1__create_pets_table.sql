CREATE TABLE pets (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description TEXT,
    image_url TEXT,
    available BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO pets (id, name, type, price, description, image_url, available) VALUES
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Bella', 'dog', 450.00, 'Friendly Labrador retriever.', 'https://images.unsplash.com/photo-1558788353-f76d92427f16', TRUE),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'Whiskers', 'cat', 150.00, 'Playful house cat looking for a home.', 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131', TRUE),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunny', 'bird', 75.00, 'Colorful parakeet with a gentle voice.', 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6', TRUE),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d482', 'Goldie', 'fish', 25.00, 'Golden fish ideal for first-time pet owners.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', TRUE);
