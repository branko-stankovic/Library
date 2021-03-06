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
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    saveStorage();
    displayLibrary();
}

function buildTableHeader() {
    library.innerHTML = `<tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Pages</th>
                            <th>Status</th>
                        </tr>`;
}

function displayLibrary() {
    buildTableHeader();

    myLibrary.forEach((book, i) => {
        let newBook = document.createElement('tr');
        newBook.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td class="readStatus">${book.read ? "&#9989;" : "&#10060;"}</td>
                        <td class="removeBook">&#x1F5D1;</td>`;
        newBook.dataset.index = i;
        library.appendChild(newBook);
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    addBookToLibrary(form.title.value, 
                    form.author.value, 
                    parseInt(form.pages.value), 
                    form.read.checked);
    form.reset();
});

library.addEventListener('click', function(e) {
    if (e.target.className == "removeBook") {
        let index = e.target.parentNode.getAttribute('data-index');
        myLibrary.splice(index,1);

        saveStorage();
        displayLibrary();
    } else if (e.target.className === "readStatus") {
        let index = e.target.parentNode.getAttribute('data-index');
        myLibrary[index].read = !myLibrary[index].read;
        
        saveStorage();
        displayLibrary();
    }
});

function loadStorage() {
    if (localStorage.getItem('myStoredBooks')) {
        myLibrary = JSON.parse(localStorage.getItem('myStoredBooks'));
    }
}

function saveStorage() {
    localStorage.setItem('myStoredBooks', JSON.stringify(myLibrary));
}

loadStorage();
displayLibrary();