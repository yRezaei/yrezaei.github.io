class Gallery {
    constructor(container, data, createCard, maxItems = 0) {
        this.container = container;
        this.data = data;
        this.createCard = createCard;
        this.maxItems = maxItems;
        this.isExpanded = false;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const totalItems = this.maxItems === 0 ? this.data.length : this.maxItems;
        const firstItemCount = Math.min(1, totalItems);
        const additionalItemCount = totalItems - firstItemCount;

        this.container.innerHTML = `
        <div class="gallery-container">
          <div class="first-item"></div>
          <button class="toggle-btn" aria-expanded="false" aria-controls="expandable-items" style="display: ${additionalItemCount > 0 ? 'block' : 'none'}">
            <img class="arrow" src="assets/icons/arrow-down.svg" alt="Toggle items">
          </button>
          <div id="expandable-items" class="expandable-items" aria-hidden="true">
            <div class="additional-items"></div>
          </div>
        </div>
      `;

        // Display first item
        const firstItemContainer = this.container.querySelector('.first-item');
        firstItemContainer.appendChild(this.createCard(this.data[0]));

        // Create additional items
        const additionalItemsContainer = this.container.querySelector('.additional-items');
        const additionalItems = this.data.slice(1, totalItems);
        additionalItems.forEach(item => {
            additionalItemsContainer.appendChild(this.createCard(item));
        });
    }

    setupEventListeners() {
        const toggleBtn = this.container.querySelector('.toggle-btn');
        toggleBtn.addEventListener('click', () => {
            this.isExpanded = !this.isExpanded;
            this.toggleExpansion();
        });
    }

    toggleExpansion() {
        const toggleBtn = this.container.querySelector('.toggle-btn');
        const additionalItems = this.container.querySelector('.expandable-items');
        const arrow = this.container.querySelector('.arrow');

        if (this.isExpanded) {
            additionalItems.classList.add('expanded');
            toggleBtn.setAttribute('aria-expanded', 'true');
            additionalItems.setAttribute('aria-hidden', 'false');
            arrow.style.transform = 'rotate(180deg)';
        } else {
            additionalItems.classList.remove('expanded');
            toggleBtn.setAttribute('aria-expanded', 'false');
            additionalItems.setAttribute('aria-hidden', 'true');
            arrow.style.transform = 'rotate(0deg)';
        }
    }

}

function createGalleryCard(item) {
    const card = document.createElement('div');
    card.className = item.image ? 'book-card' : 'post-card';

    // Dynamically construct HTML based on available fields
    let cardContent = '';

    if (item.image) {
        cardContent += `
        <div class="book-cover">
            <img src="${item.image}" alt="${item.title || 'Image'}" loading="lazy">
        </div>`;
    }

    cardContent += `
    <div class="${item.image ? 'book-info' : 'post-info'}">
        ${item.title ? `<h2>${item.title}</h2>` : ''}
        ${item.author ? `<h3>${item.author}</h3>` : ''}
        ${item.description ? `<p>${item.description}</p>` : ''}
        ${item.link ? `<a href="${item.link}" target="_blank">Learn more</a>` : ''}
    </div>`;

    card.innerHTML = cardContent;
    return card;
}


async function createGalleryFromData(dataFile, containerId) {
    const container = document.getElementById(containerId);
    try {
        const response = await fetch(dataFile);
        if (!response.ok) throw new Error(`Failed to fetch ${dataFile}`);
        
        const data = await response.json(); // Now directly an array
        console.log(`${dataFile} Data:`, data); // Debugging output
        
        const gallery = new Gallery(container, data, createGalleryCard, 3);
        gallery.init();
    } catch (error) {
        console.error(`Error loading ${dataFile}:`, error);
        container.innerHTML = `<p>Failed to load data for ${containerId}</p>`;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createGalleryFromData('assets/data/posts_info.json', 'postsGallery');
    createGalleryFromData('assets/data/projects_info.json', 'projectsGallery');
    createGalleryFromData('assets/data/articles_info.json', 'articlesGallery');
    createGalleryFromData('assets/data/books_info.json', 'booksGallery');
});