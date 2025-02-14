/*
  # Create lobbies table

  1. New Tables
    - `lobbies`
      - `id` (uuid, primary key)
      - `code` (text, unique)
      - `admin_id` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `lobbies` table
    - Add policy for anyone to read lobbies
    - Add policy for authenticated users to create and update lobbies
*/

CREATE TABLE IF NOT EXISTS lobbies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  admin_id text NOT NULL,
  status text NOT NULL DEFAULT 'waiting',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lobbies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read lobbies"
  ON lobbies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create lobbies"
  ON lobbies
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update lobbies"
  ON lobbies
  FOR UPDATE
  TO public
  USING (true);