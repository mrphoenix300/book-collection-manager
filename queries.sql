CREATE DATABASE booknote;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  isbn VARCHAR(20),
  coversmall TEXT,
  covermedium TEXT,
  rating VARCHAR(1),
  review TEXT,
  notes TEXT,
  status VARCHAR(50),
  currentpage INTEGER,
  dateread VARCHAR(10)
);

-- Example book data
INSERT INTO books (title, author, isbn, rating, review, status, currentpage, dateread)
VALUES 
('Nineteen Eighty-Four', 'George Orwell', '9780451524935', 4, 'A timeless dystopian masterpiece', 'completed', 328, '2023-07-15'),
('To Kill a Mockingbird', 'Harper Lee', '9780446310789', 5, 'Powerful exploration of racial injustice', 'completed', 281, '2023-06-22'),
('The Catcher in the Rye', 'J.D. Salinger', '9780316769488', 3, 'Classic coming-of-age story', 'completed', 234, '2023-07-05');
