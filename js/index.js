let planets = [
    { name: "Меркурий", size: 4879, distance: 57.9, image: "https://img.icons8.com/color-glass/48/mercury-planet.png"},
    { name: "Венера", size: 12104, distance: 108.2, image: "https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/external-venus-space-tulpahn-outline-color-tulpahn.png" },
    { name: "Земля", size: 12742, distance: 149.6, image: "https://img.icons8.com/emoji/48/globe-showing-europe-africa-emoji.png" },
    { name: "Марс", size: 6779, distance: 227.9, image: "https://img.icons8.com/external-tulpahn-flat-tulpahn/64/external-mars-space-tulpahn-flat-tulpahn.png" },
    { name: "Юпитер", size: 139820, distance: 778.6, image: "https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/external-jupiter-space-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png" },
    { name: "Сатурн", size: 116460, distance: 1433.5, image: "https://img.icons8.com/color/48/saturn-planet.png" },
    { name: "Уран", size: 50724, distance: 2872.5, image: "https://img.icons8.com/officel/80/planet.png" },
    { name: "Нептун", size: 49528, distance: 4495.1, image: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-neptune-astrology-flaticons-lineal-color-flat-icons.png" }
];

let quote_spicok = [
    {quote: '"Мы — это способ, которым вселенная осознаёт себя." ', author: '@Карл Саган'},
    {quote: '"Мы живём в удивительном мире, и наша судьба — стать исследователями космоса." ', author: '@Стивен Хокинг '},
    {quote: '"Космос — это не просто место, где мы живем. Это место, которое наполняет нас любопытством и вдохновляет на поиски." ', author: '@Нил Деграсс Тайсон'},
    {quote: '"Космос — это не место для людей, а место для открытий и приключений." ', author: '@Алан Бин'},
    {quote: '"Когда ты выходишь в космос, ты понимаешь, как чудо — это всё, что окружает нас." ', author: '@Марк Салли'},
]

var planetContainer = document.getElementById("planetContainer");
var fliter_big = document.getElementById("major");
var reset = document.getElementById("reset");
var quote = document.getElementById("quote");
var add = document.getElementById("add");
var form = document.getElementById("searchForm")
var searchbth = document.getElementById("searchbth")
var sort_planets = document.getElementById("sort-planets");
const content_bth = document.getElementById("content");

planetContainer.addEventListener("click", showPlanets);
fliter_big.addEventListener("click", fliter);
reset.addEventListener("click", Reset);
quote.addEventListener("click", Reset_Quote);
add.addEventListener("click", Add_planet);
searchbth.addEventListener("click", Form);
sort_planets.addEventListener("click", sortPlanets);
content_bth.addEventListener("click", Content);

function showPlanets() {
    planetContainer.innerHTML = ""; 

    planets.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;

        const h2 = document.createElement("h2");
        h2.textContent = item.name;

        const size = document.createElement("p");
        size.textContent = "Размер: " + item.size;

        const distance = document.createElement("p");
        distance.textContent = "Дистанция: " + item.distance;

        card.appendChild(img);
        card.appendChild(h2);
        card.appendChild(distance);
        card.appendChild(size);

        planetContainer.appendChild(card);

        card.style.opacity = "0";
        card.style.transform = "scale(0.5)";
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
            card.style.transition = "opacity 0.8s ease, transform 0.5s ease";
        }, index * 300); 
    });
}

function fliter() { 
    const filteredPlanets = planets.filter(el => el.size > 10000);
    
    planetContainer.innerHTML = ""; 
    filteredPlanets.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;

        const h2 = document.createElement("h2");
        h2.textContent = item.name;

        const size = document.createElement("p");
        size.textContent = "Размер: " + item.size;

        const distance = document.createElement("p");
        distance.textContent = "Дистанция: " + item.distance;

        card.appendChild(img);
        card.appendChild(h2);
        card.appendChild(distance);
        card.appendChild(size);

        planetContainer.appendChild(card);
    });
}

function Reset() { 
    showPlanets();
}

let typingInProgress = false;

function Reset_Quote() {
    if (typingInProgress)  {
        return;
    }

    typingInProgress = true; 

    const randomIndex = Math.floor(Math.random() * quote_spicok.length);
    const randomQuoteObj = quote_spicok[randomIndex];
    const randomQuote = randomQuoteObj.quote + " " + randomQuoteObj.author;
    const random_p = document.getElementById("random-p");

    random_p.textContent = ""; 

    let i = 0;
    function typeWriter() {
        if (i < randomQuote.length) {
            random_p.textContent += randomQuote[i];
            i++;
            setTimeout(typeWriter, 50);
        } else {
            typingInProgress = false; 
        }
    }
    typeWriter();
}

function Add_planet() {
    const name_planet = prompt("Введите название планеты");
    const size_planet = prompt("Введите размер планеты");
    const distance_planet = prompt("Введите расстояние планеты");

    const newPlanet = {
        name: name_planet,
        size: size_planet,
        distance: distance_planet, 
    };
    planets.push(newPlanet); 
    showPlanets();
}

function Form() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const planetCards = document.querySelectorAll("#planetContainer .card");
    let found = false;

    planetCards.forEach(card => {
        const planetName = card.querySelector("h2").textContent.toLowerCase();

        if (planetName.includes(search)) {
            card.style.border = "3px solid white";
            found = true;
        } else {
            card.style.border = "none";
        }
    });

    if (!found) {
        alert("Планета не найдена!");
    }
}

function counting_planets(planets, callback) { 
    const count = planets.reduce((accumulator) => {
        return accumulator + 1; 
    }, 0); 
    
    callback(count);
}

counting_planets(planets, function(count) {
    const quantity = document.getElementById("quantity");
    quantity.textContent = "Количество планет: " + count;
});

showPlanets();

function Content() { 
    const div = document.querySelector(".bth-input"); 
    document.body.classList.toggle("white-body");
    div.classList.toggle("white-body"); 
}

function sortPlanets() {
    const sortedPlanets = planets.sort((a, b) => a.distance - b.distance);
    planetContainer.innerHTML = "";

    sortedPlanets.forEach((planet, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <img src="${planet.image}" alt="${planet.name}">
        <h2>${planet.name}</h2>
        <p>Размер: ${planet.size}</p>
        <p>Дистанция: ${planet.distance}</p>`;

        if (index === 0) {
            card.style.border = "3px solid white"; 
        }

        planetContainer.appendChild(card);
    });
}

