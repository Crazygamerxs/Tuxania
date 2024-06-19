const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector(".search-field");
const dropdownContent = document.getElementById("dropdown-content");
const noResultsMessage = document.getElementById("no-results-message"); // Assuming you have a message element

let links = [];

searchInput.addEventListener("input", e => {
    const value = e.target.value.trim().toLowerCase();
    dropdownContent.innerHTML = "";
    let foundResults = false;
    
    links.forEach(link => {
        if (link.name.toLowerCase().includes(value)) {
            const a = document.createElement("a");
            a.href = link.url;
            a.textContent = link.name;
            dropdownContent.appendChild(a);
            foundResults = true;
        }
    });

    if (foundResults) {
        dropdownContent.classList.add("show");
        noResultsMessage.style.display = "none";
    } else {
        dropdownContent.classList.remove("show");
        noResultsMessage.style.display = "block"; // Display message if no results found
    }
});

fetch("../javascript/links.json")
    .then(res => res.json())
    .then(data => {
        links = data.links.map(link => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            header.textContent = link.name;
            header.href = link.url;
            userCardContainer.append(card);
            return { name: link.name, url: link.url, element: card };
        });
    });

window.onclick = function(event) {
    if (!event.target.matches('.search-field')) {
        dropdownContent.classList.remove('show');
    }
}
