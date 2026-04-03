-- Add active column to students table
ALTER TABLE students ADD COLUMN active BOOLEAN DEFAULT true NOT NULL;

-- Update existing students to be active (if any exist)
UPDATE students SET active = true WHERE active IS NULL;

-- Add comment to the column
COMMENT ON COLUMN students.active IS 'Indicates if the student is currently active/enrolled in the school';