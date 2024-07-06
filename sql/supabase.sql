-- Users table
CREATE TABLE Profiles (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50),
  email VARCHAR(100) UNIQUE NOT NULL,
  profile_picture TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
