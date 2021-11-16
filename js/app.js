const library = document.querySelector('table');
const form = document.querySelector('form');

let myLibrary = [
    {
        title: "You Don't Know JS: Up & Going",
        author: "Kyle Simpson",
        pages: 72,
        read: "Read"
    },
    {
        title: "The Principles of Object-Oriented JavaScript",
        author: "Nicholas C. Zakas",
        pages: 120,
        read: "Not Yet"
    },
    {
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        pages: 464,
        read: "Not Yet"
    },
    {
        title: "Can't Hurt Me: Master Your Mind and Defy the Odds",
        author: "David Goggins",
        pages: 366,
        read: "Read"
    },
    {
        title: "Javascript Allongé",
        author: "Reginald Braithwaite",
        pages: 280,
        read: "Read"
    }
];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read ? "Read" : "Not Yet");
    myLibrary.push(book);
    displayLibrary();
}

function displayLibrary() {
    library.innerHTML = `<tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Pages</th>
                            <th>Status</th>
                        </tr>`;

    myLibrary.forEach((book, i) => {
        let newBook = document.createElement('tr');
        newBook.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td>${book.read}</td>
                        <td><button class="removeBook" data-index="${i}"">Remove</button></td>`;
        library.appendChild(newBook);
    });
}

function removeBookFromLibrary() {

}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    addBookToLibrary(form.title.value, form.author.value, form.pages.value, form.read.checked);

    form.reset();
});

library.addEventListener('click', function(e) {
    if (e.target.className == "removeBook") {
        let index = e.target.getAttribute('data-index');
        myLibrary.splice(index,1);
        displayLibrary();
    }
});

displayLibrary();