-- Add age column if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='pets' AND column_name='age'
  ) THEN
    ALTER TABLE pets ADD COLUMN age INTEGER NOT NULL DEFAULT 1;
  END IF;
END $$;

-- Update ages for initial pets if they exist and age is still default
UPDATE pets SET age = 3 WHERE name = 'Bella' AND age = 1;
UPDATE pets SET age = 2 WHERE name = 'Whiskers' AND age = 1;
UPDATE pets SET age = 1 WHERE name = 'Sunny' AND age = 1;
UPDATE pets SET age = 1 WHERE name = 'Goldie' AND age = 1;
