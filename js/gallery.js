export class BatchGallery {
    constructor(container, data, createCard, batchSize = 3) {
        this.container = container;
        this.data = data;
        this.createCard = createCard;
        this.batchSize = batchSize;

        // We'll keep track of the current page index
        // (starting from 0 for convenience).
        this.currentPage = 0;

        // Initialize the gallery
        this.init();
    }

    init() {
        this.render();             // Build initial HTML structure
        this.setupEventListeners(); // Hook up buttons
        this.updateNavButtons();   // Update button states
    }

    // Create the gallery layout and the nav buttons (Next / Prev)
    render() {
        // Clear any existing content in the container
        this.container.innerHTML = `
            <div class="batch-items"></div>
            <div class="pagination-controls">
                <button class="prev-page">Previous</button>
                <span class="page-info"></span>
                <button class="next-page">Next</button>
            </div>
        `;

        // Store references for re-use
        this.itemsContainer = this.container.querySelector('.batch-items');
        this.prevBtn = this.container.querySelector('.prev-page');
        this.nextBtn = this.container.querySelector('.next-page');
        this.pageInfo = this.container.querySelector('.page-info');

        // Display the items for the current page
        this.displayCurrentPage();
    }

    displayCurrentPage() {
        // Clear out old items
        this.itemsContainer.innerHTML = '';

        // Calculate the slice of data for the current page
        const startIndex = this.currentPage * this.batchSize;
        const endIndex = startIndex + this.batchSize;
        const pageItems = this.data.slice(startIndex, endIndex);

        // Render each item with your provided createCard function
        pageItems.forEach(item => {
            const cardElement = this.createCard(item);
            this.itemsContainer.appendChild(cardElement);
        });

        // Update page info text
        this.pageInfo.textContent = `Page ${this.currentPage + 1} of ${this.totalPages}`;
    }

    // Set up clicks for next and previous
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());
    }

    // Move to next page if it exists
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.displayCurrentPage();
            this.updateNavButtons();
        }
    }

    // Move to previous page if it exists
    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.displayCurrentPage();
            this.updateNavButtons();
        }
    }

    // Disable the prev/next buttons when out of range
    updateNavButtons() {
        // Disable Prev if on the first page
        this.prevBtn.disabled = (this.currentPage === 0);

        // Disable Next if on the last page
        this.nextBtn.disabled = (this.currentPage === this.totalPages - 1);
    }

    // Helper getter: total number of pages
    get totalPages() {
        return Math.ceil(this.data.length / this.batchSize);
    }
}


export class ExpandableGallery {
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

export function createGalleryCard(item) {
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
        ${item.html ? `<a href="${item.html}" target="_blank">Read more</a>` : ''}
    </div>`;

    card.innerHTML = cardContent;
    return card;
}

export async function createExpandableGallery(dataFile, containerId) {
    const container = document.getElementById(containerId);
    try {
        const response = await fetch(dataFile);
        if (!response.ok) throw new Error(`Failed to fetch ${dataFile}`);
        
        const data = await response.json(); // Now directly an array
        console.log(`${dataFile} Data:`, data); // Debugging output
        
        const gallery = new ExpandableGallery(container, data, createGalleryCard, 3);
        gallery.init();
    } catch (error) {
        console.error(`Error loading ${dataFile}:`, error);
        container.innerHTML = `<p>Failed to load data for ${containerId}</p>`;
    }
}

export async function createBatchGallery(dataFile, containerId, batchSize = 15) {
    const container = document.getElementById(containerId);

    try {
        const response = await fetch(dataFile);
        if (!response.ok) throw new Error(`Failed to fetch ${dataFile}`);
        
        const data = await response.json(); // data is an array

        console.log(`Batch data loaded from ${dataFile}:`, data);

        // Create a new BatchGallery instance
        const gallery = new BatchGallery(container, data, createGalleryCard, batchSize);
        // The gallery init call is already in constructor, but you could call gallery.init() if needed
    } catch (error) {
        console.error(`Error loading ${dataFile}:`, error);
        container.innerHTML = `<p>Failed to load data for ${containerId}</p>`;
    }
}