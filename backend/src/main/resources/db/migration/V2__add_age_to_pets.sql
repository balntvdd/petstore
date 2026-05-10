ALTER TABLE pets ADD COLUMN age INTEGER NOT NULL DEFAULT 1;

UPDATE pets SET age = 3 WHERE name = 'Bella';
UPDATE pets SET age = 2 WHERE name = 'Whiskers';
UPDATE pets SET age = 1 WHERE name = 'Sunny';
UPDATE pets SET age = 1 WHERE name = 'Goldie';
