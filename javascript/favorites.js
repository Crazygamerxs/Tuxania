document.addEventListener('DOMContentLoaded', (event) => {
    loadFavoriteLinks();
    makeLinksDraggable();
});

function openModal() {
    requestAnimationFrame(() => {
        document.getElementById('addLinkModal').style.display = 'block';
    });
}

function closeModal() {
    document.getElementById('addLinkModal').style.display = 'none';
}

function addFavoriteLink() {
    const linkName = document.getElementById('newLinkName').value;
    let linkURL = document.getElementById('newLinkURL').value;
    if (linkName && linkURL) {
        // Check if the URL starts with http:// or https://, if not, add http://
        if (!linkURL.startsWith('http://') && !linkURL.startsWith('https://')) {
            linkURL = 'http://' + linkURL;
        }
        let links = JSON.parse(localStorage.getItem('favoriteLinks')) || [];
        links.push({ name: linkName, url: linkURL });
        localStorage.setItem('favoriteLinks', JSON.stringify(links));
        renderFavoriteLinks();
        closeModal();
    }
}

function loadFavoriteLinks() {
    const links = JSON.parse(localStorage.getItem('favoriteLinks')) || [];
    renderFavoriteLinks();
}

function renderFavoriteLinks() {
    const list = document.getElementById('favorite-links-list');
    list.innerHTML = '';
    const links = JSON.parse(localStorage.getItem('favoriteLinks')) || [];
    links.forEach((link, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'sidebar-accordion-menu';
        listItem.setAttribute('draggable', 'true');
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
            <div class="menu-title-flex">
            <span>⋮⋮ </span><a href="${link.url}" target="_blank" class="menu-title">${link.name}</a>
            <button class="trash-icon-btn" onclick="removeLink(${index})">
                <img src="../Images/trash-icon.png" alt="Trash Icon" class="trash-icon">
            </button>
        </div>
        `;
        list.appendChild(listItem);
    });
    makeLinksDraggable();
}

function removeLink(index) {
    let links = JSON.parse(localStorage.getItem('favoriteLinks')) || [];
    links.splice(index, 1);
    localStorage.setItem('favoriteLinks', JSON.stringify(links));
    renderFavoriteLinks();
}

function makeLinksDraggable() {
    const list = document.getElementById('favorite-links-list');
    let draggedItem = null;

    list.addEventListener('dragstart', function(event) {
        draggedItem = event.target;
        event.dataTransfer.setData('text/plain', event.target.dataset.index);
        event.target.classList.add('dragging');
    });

    list.addEventListener('dragover', function(event) {
        event.preventDefault();
        const afterElement = getDragAfterElement(list, event.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            list.appendChild(draggedItem);
        } else {
            list.insertBefore(draggedItem, afterElement);
        }
    });

    list.addEventListener('dragend', function() {
        draggedItem.classList.remove('dragging');
        const newLinksOrder = Array.from(list.children).map((item) => {
            return JSON.parse(localStorage.getItem('favoriteLinks'))[item.dataset.index];
        });
        localStorage.setItem('favoriteLinks', JSON.stringify(newLinksOrder));
        renderFavoriteLinks();
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.sidebar-accordion-menu:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}