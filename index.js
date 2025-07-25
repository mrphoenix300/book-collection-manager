import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
// Fill with your own user data 
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "booknote",
    password: "",
    port: 5432,
});

db.connect();

let books = [];
let coversmall, covermedium;

async function getBooks() {
    const result = await db.query("SELECT * FROM books");
    return result.rows;
}

async function getBookById(bookId) {
    const result = await db.query("SELECT * FROM books AS b WHERE b.id = $1", [bookId]);
    return result.rows;
}

async function addBook(book) {
    await db.query("INSERT INTO books (title, isbn, rating, review, status, dateread, author, currentpage, coversmall, covermedium, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", 
        [book.title, book.isbn, book.rating, book.review, book.status, book.dateread, book.author, book.currentpage, book.coversmall, book.covermedium, book.note]);
    books = await getBooks();
}

async function editBookById(book) {
    await db.query("UPDATE books SET rating = $1, review = $2, status = $3, dateread = $4, currentpage = $5 WHERE id = $6", [book.rating, book.review, book.status, book.dateread, book.currentPage, book.id]);
    books = await getBooks();
}

async function removeBookById(bookId) {
    await db.query("DELETE FROM books WHERE id = $1", [bookId]);
    books = await getBooks();
}

async function editNotesByBookId(book) {
    await db.query("UPDATE books SET notes = $1 WHERE id = $2", [book.notes, book.id]);
    books = await getBooks();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    books = await getBooks();

    res.redirect('/sort?sort=title');
});

app.get("/add", async (req, res) => {
    res.render("add.ejs");
});

app.get("/book/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await getBookById(id);
    res.render("book.ejs", {
        book: book[0],
    });
});

app.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const book = await getBookById(id);
    res.render("edit.ejs", {
        book: book[0],
    });
});

app.get("/book/:id/notes/add", (req,res) => {
    const id = req.params.id;
    const book = books.find(b => b.id == id);

    res.render("add_notes.ejs", {
        book: book,
    });
});

app.get('/sort', async (req, res) => {
  const sortBy = req.query.sort;

  let orderByClause = 'ORDER BY title ASC'; // default

  if (sortBy === 'rating') {
    orderByClause = 'ORDER BY rating DESC NULLS LAST';
  } else if (sortBy === 'dateread') {
    orderByClause = 'ORDER BY dateread DESC NULLS LAST';
  }

  try {
    const result = await db.query(`SELECT * FROM books ${orderByClause}`);
    res.render("index.ejs", {
        books: result.rows,
        sort: sortBy,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sorting books.');
  }
});


app.post("/add-book", async (req, res) => {
    const isbn = req.body.isbn;
    const response = await axios.get(`https://openlibrary.org/search.json?isbn=${isbn}&fields=title,author_name&limit=1`);
    const result = response.data;
    const title = result.docs[0].title;
    const rating = typeof req.body.rating === 'undefined' ? null : parseInt(req.body.rating);
    const review = typeof req.body.review === 'undefined' ? null : req.body.review;
    const status = typeof req.body.status === 'undefined' ? null : req.body.status;
    const dateread = typeof req.body.dateread === 'undefined' ? null : req.body.dateread;
    const author = result.docs[0].author_name[0];
    const currentpage = isNaN(parseInt(req.body.currentPage)) ? null : parseInt(req.body.currentPage);
    coversmall = `https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`;
    covermedium = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    const note = typeof req.body.notes === 'undefined' ? null : req.body.notes;

    await addBook({ title: title, isbn: isbn, rating: rating, review: review, status: status, dateread: dateread, author: author, currentpage: currentpage, coversmall: coversmall, covermedium: covermedium, note: note });

    res.redirect("/");
});

app.post("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const title =  req.body.title || (books.find(b => b.id == id)).title;
    const rating = req.body.rating || (books.find(b => b.id == id)).rating;
    const review = req.body.review || (books.find(b => b.id == id)).review;
    const status = req.body.status || (books.find(b => b.id == id)).status;
    const currentPage = req.body.currentpage || (books.find(b => b.id == id)).currentpage;
    const dateread = req.body.dateRead || (books.find(b => b.id == id)).dateread;

    await editBookById({ title: title, rating: rating, review: review, status: status, currentPage: currentPage, dateread: dateread, id: id });
    res.redirect(`/book/${id}`);
});

app.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await removeBookById(id);

    res.redirect("/");
});

app.post("/book/:id/notes/add", async (req, res) => {
    const id = req.params.id;
    const notes = req.body.note || (books.find(b => b.id == id)).notes;

    editNotesByBookId({ notes: notes, id: id });

    res.redirect(`/book/${id}`);
});

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});