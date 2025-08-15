CREATE TABLE queryResults (
id SERIAL PRIMARY KEY,  
 users_id UUID NOT NULL,  
 query TEXT NOT NULL,  
 results TEXT[],  
 update_count INT DEFAULT 0,  
 saved_cards TEXT[],  
 created_at TIMESTAMPTZ DEFAULT NOW(),  
 updated_at TIMESTAMPTZ DEFAULT NOW(),  
 CONSTRAINT fk_users FOREIGN KEY (users_id)  
 REFERENCES users(id) ON DELETE CASCADE  
);

CREATE OR REPLACE FUNCTION increment_update_count()
RETURNS TRIGGER AS $$
BEGIN
NEW.update_count := NEW.update_count + 1;
NEW.updated_at := NOW();
RETURN NEW;
END;

$$
LANGUAGE plpgsql;

CREATE TRIGGER trg_increment_update_count
BEFORE UPDATE ON queryResults
FOR EACH ROW
EXECUTE FUNCTION increment_update_count();
$$
