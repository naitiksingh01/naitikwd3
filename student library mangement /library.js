
const express = require("express");
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Computer Science" },
    { id: 2, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", category: "Autobiography" },
    { id: 3, title: "Engineering Mathematics", author: "B.S. Grewal", category: "Mathematics" }
];
let id = 4;


app.post("/add", (req, res) => {
    const { title, author, category } = req.body;

    if (!title || !author || !category) {
        return res.status(400).send("title, author and category are required");
    }

    const book = { id: id++, title, author, category };
    books.push(book);
    res.send("Book added successfully");
});


app.get("/books", (req, res) => {
    res.json(books);
});


app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) return res.status(404).send("Book not found");

    res.json(book);
});

// UPDATE - update a book
app.put("/update/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) return res.status(404).send("Book not found");

    book.title = req.body.title ?? book.title;
    book.author = req.body.author ?? book.author;
    book.category = req.body.category ?? book.category;

    res.send("Book updated successfully");
});

// DELETE - delete a book
app.delete("/delete/:id", (req, res) => {
    const exists = books.some(b => b.id == req.params.id);

    if (!exists) return res.status(404).send("Book not found");

    books = books.filter(b => b.id != req.params.id);
    res.send("Book deleted successfully");
});

app.listen(3000, () => {
    console.log("Library server running on port 3000");
});
