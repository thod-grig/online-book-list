const ENTER = 13;
link_str = 'https://reststop.randomhouse.com/resources/titles?search=';
const search_bar = document.getElementById('search-bar');
const results = document.createElement("ul");
const favs = document.createElement("ul");
favs.id = "favlist;"
const div1 = document.createElement("div");
const div2 = document.createElement("div");
const body = document.body
const rbutton = document.getElementById("refresh");
const fbutton = document.getElementById("favs");
var index = 0;
var books = [];

fbutton.addEventListener("click", e=> {
    console.log("Requesting favorites to show ");
    fetch('http://127.0.0.1:3000').catch(error => console.log("There is an error here.", error))
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(data => {
            showFavorites(data);
        })

})

rbutton.addEventListener("click", e => {
    console.log("DELETING ");
    link_str = 'https://reststop.randomhouse.com/resources/titles?search=';
    books = [];
    results.remove();
});

search_bar.addEventListener('keyup', (input) => {

    if (input.keyCode === ENTER) {
        console.log("Search requested: ", input.target.value);
        link_str = link_str.concat(input.target.value);
        console.log("query is: ", link_str);
        query();
    }
});

function query() {
    fetch(link_str, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(data => {
            showResults(data);
        })
        .catch(error => console.log("There is an error here.", error))
};

function showResults(data) {
    console.log("showing results" + data.title);
    body.append(div1);
    var index = 1;
    data.title.forEach(element => {
        var book = new Book(index, element.titleshort, element.author, element.workid);
        books.push(book);
        index++;
        results.append(createItem(element.titleshort, element.author, element.workid));
    })

    //console.log("books saved: ", books);
    body.append(results);
    register_buttons();
};

function showFavorites(data) {
    console.log("showing favorites",  data,  "  length ", data.length);
    body.append(div2);
    for(let i =0; i < data.length; i++) {
        favs.append(createFavorite(data[i].title, data[i].author, data[i].id))
    }
    body.append(favs);

}

function createItem(title, author, work_id) {
    var li = document.createElement('li');
    var b = "  by  ";
    title = title.concat(b);
    var result = title.concat(author);
    li.innerHTML = result + "<button id = \"heart\"><3</button>";
    return li;
}

function createFavorite(title, author, work_id) {
    var li = document.createElement('li');
    var b = "  by  ";
    title = title.concat(b);
    var result = title.concat(author);
    li.innerHTML = result + "<button id = \"delete\">remove</button>";
    return li;
}

function register_buttons() {
    var buttons = document.getElementsByTagName("button"); //returns a nodelist

    console.log("Registering buttons length ::  " + buttons.length);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            buttonsControl(this, i);
        }, false);
    }
}

function register_delete_favs() {
    var buttons = document.getElementsByTagName("button"); //returns a nodelist

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            favsControl(this, i);
        }, false);
    }
    
}



function buttonsControl(button, i) {
    if (button.id != "refresh") {
        console.log("Putting ", i, " in favorites");

        fetch('http://127.0.0.1:3000',
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
        },
            body: JSON.stringify(books[i])
        });
    }
}

function Book(index, title, author, id) {
    this.index = index;
    this.title = title;
    this.author = author;
    this.id = id;
}

function favsControl (button, i) {
    if(button.id != "refresh") {
        console.log("Removing favorite")
    }
}