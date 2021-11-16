const library = document.querySelector('table');
const form = document.querySelector('form');

let myLibrary = [
    {
        title: "You Don't Know JS: Up & Going",
        author: "Kyle Simpson",
        pages: 72,
        read: true
    },
    {
        title: "The Principles of Object-Oriented JavaScript",
        author: "Nicholas C. Zakas",
        pages: 120,
        read: false
    },
    {
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        pages: 464,
        read: false
    },
    {
        title: "Can't Hurt Me: Master Your Mind and Defy the Odds",
        author: "David Goggins",
        pages: 366,
        read: true
    },
    {
        title: "Javascript Allongé",
        author: "Reginald Braithwaite",
        pages: 280,
        read: false
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
    let book = new Book(title, author, pages, read);
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
                        <td>${book.read ? "&#9989;" : "&#10060;"}</td>
                        <td><button class="removeBook" data-index="${i}"">&#x1F5D1;</button></td>`;
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