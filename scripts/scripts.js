// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle input');
const themeText = document.querySelector('.theme-text');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
themeToggle.checked = savedTheme === 'dark';
themeText.textContent = savedTheme === 'dark' ? 'Dark Mode' : 'Light Mode';

themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeText.textContent = newTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
});

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Render latest blog posts
async function renderLatestBlogPosts() {
    const blogPostsContainer = document.getElementById('blogPosts');
    if (!blogPostsContainer) return;

    try {
        const response = await fetch('./blog/posts_info.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const latestPosts = data.posts.slice(0, 3); // Get the 3 most recent posts

        blogPostsContainer.innerHTML = ''; // Clear existing content

        latestPosts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'post-card';

            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p class="post-date">${post.date}</p>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="${post.link}" class="read-more">Read More →</a>
            `;

            blogPostsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);
        blogPostsContainer.innerHTML = '<p>Failed to load blog posts</p>';
    }
}

/**
 * Fetch Projects data from 'projects_info.json'
 * and create .project-card elements inside #projectsGrid
 */
function loadProjects() {
    fetch('./files/projects_info.json')
        .then(response => response.json())
        .then(projects => {
            const projectsGrid = document.getElementById('projectsGrid');
            projectsGrid.innerHTML = ''; // Clear existing content, if any

            projects.forEach(project => {
                const card = document.createElement('div');
                card.classList.add('project-card');

                // Build the card content
                // Title
                const title = document.createElement('h3');
                title.textContent = project.title;
                card.appendChild(title);

                // Description
                const desc = document.createElement('p');
                desc.textContent = project.description;
                card.appendChild(desc);

                // Link
                const link = document.createElement('a');
                link.href = project.link;
                link.target = '_blank'; // open in new tab (optional)
                link.classList.add('btn-secondary');
                link.textContent = 'View Details';
                card.appendChild(link);

                // Append the card to the grid
                projectsGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading projects JSON:', error));
}

/**
 * Fetch Books data from 'books_info.json'
 * and create .highlight-card elements inside #booksGrid
 */
function loadBooks() {
    fetch('./files/books_info.json')
        .then(response => response.json())
        .then(books => {
            const booksGrid = document.getElementById('booksGrid');
            const toggleButton = document.getElementById('toggleBooksButton');

            booksGrid.innerHTML = '';

            books.forEach((book, index) => {
                const card = document.createElement('div');
                card.classList.add('highlight-card');

                // Hide all cards except the first one
                if (index > 0) {
                    card.classList.add('hidden'); // Apply hidden class to all cards except the first
                }

                // Book Image
                const img = document.createElement('img');
                img.src = book.image;
                img.alt = `${book.title} Cover`;
                img.classList.add('book-image');

                // Info Container
                const info = document.createElement('div');
                info.classList.add('book-info');

                const title = document.createElement('h3');
                title.textContent = book.title;
                info.appendChild(title);

                const author = document.createElement('p');
                author.textContent = `By: ${book.author}`;
                author.classList.add('book-author');
                info.appendChild(author);

                const desc = document.createElement('p');
                desc.textContent = book.description;
                info.appendChild(desc);

                const link = document.createElement('a');
                link.href = book.link;
                link.target = '_blank';
                link.classList.add('btn-secondary');
                link.textContent = 'View Book';
                info.appendChild(link);

                card.appendChild(img);
                card.appendChild(info);

                booksGrid.appendChild(card);
            });

            // Toggle visibility of additional books
            toggleButton.addEventListener('click', () => {
                const hiddenCards = booksGrid.querySelectorAll('.highlight-card.hidden');
                hiddenCards.forEach(card => card.classList.toggle('hidden'));
                toggleButton.textContent =
                    toggleButton.textContent === 'Show More' ? 'Show Less' : 'Show More';
            });
        })
        .catch(error => console.error('Error loading books JSON:', error));
}


/**
 * Fetch Highlights data from 'highlights_info.json'
 * and create .highlight-card elements inside #highlightsGrid
 */
function loadHighlights() {
    fetch('./files/highlights_info.json')
        .then(response => response.json())
        .then(highlights => {
            const highlightsGrid = document.getElementById('highlightsGrid');
            highlightsGrid.innerHTML = '';

            highlights.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('highlight-card');

                const title = document.createElement('h3');
                title.textContent = item.title;
                card.appendChild(title);

                const desc = document.createElement('p');
                desc.textContent = item.description;
                card.appendChild(desc);

                const link = document.createElement('a');
                link.href = item.link;
                link.target = '_blank';
                link.classList.add('btn-secondary');
                link.textContent = 'Learn More';
                card.appendChild(link);

                highlightsGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading highlights JSON:', error));
}

/**
 * Fetch Articles data from 'articles_info.json'
 * and create .article-card elements inside #articlesGrid
 */
function loadArticles() {
    fetch('./files/articles_info.json')
        .then(response => response.json())
        .then(articles => {
            const articlesGrid = document.getElementById('articlesGrid');
            articlesGrid.innerHTML = '';

            articles.forEach(article => {
                const card = document.createElement('div');
                card.classList.add('article-card');

                const title = document.createElement('h3');
                title.textContent = article.title;
                card.appendChild(title);

                const desc = document.createElement('p');
                desc.textContent = article.description;
                card.appendChild(desc);

                const link = document.createElement('a');
                link.href = article.link;
                link.target = '_blank';
                link.classList.add('btn-secondary');
                link.textContent = 'Read Article';
                card.appendChild(link);

                articlesGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading articles JSON:', error));
}

class Gallery {
    constructor(container, data, createCard) {
        this.container = container;
        this.data = data;
        this.createCard = createCard;
        this.isExpanded = false;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.container.innerHTML = `
        <div class="gallery-container">
          <div class="first-item"></div>
          <button class="toggle-btn" aria-expanded="false" aria-controls="expandable-items">
            <img class="arrow" src="icons/arrow-down.svg" alt="Toggle items">
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
        this.data.slice(1).forEach(item => {
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

function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <div class="book-cover">
        <img src="${book.image}" alt="${book.title}" loading="lazy">
      </div>
      <div class="book-info">
        <h2>${book.title}</h2>
        <h3>${book.author}</h3>
        <p>${book.description}</p>
        <a href="${book.link}" target="_blank">Learn more</a>
      </div>
    `;
    return card;
}

async function createBookGallery() {
    const container = document.getElementById('booksGallery');
    try {
        const response = await fetch('files/books_info.json');
        if (!response.ok) throw new Error(`Failed to fetch files/books_info.json`);
        const books = await response.json();
        console.log('Books Data:', books); // Debugging output
        const gallery = new Gallery(container, books, createBookCard);
        gallery.initialize();
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card'; // Unique style for posts

    // Title
    const title = document.createElement('h3');
    title.textContent = post.title;
    card.appendChild(title);

    // Description
    const desc = document.createElement('p');
    desc.textContent = post.description;
    card.appendChild(desc);

    // Link
    const link = document.createElement('a');
    link.href = post.link;
    link.target = '_blank';
    link.classList.add('btn-secondary'); // Button style class
    link.textContent = 'Read Article';
    card.appendChild(link);

    return card;
}

async function createPostGallery() {
    const container = document.getElementById('postsGallery');
    try {
        const response = await fetch('files/posts_info.json');
        if (!response.ok) throw new Error(`Failed to fetch files/posts_info.json`);
        const items = await response.json();
        console.log('Posts Data:', items); // Debugging output
        const gallery = new Gallery(container, items, createPostCard);
        gallery.initialize();
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createPostGallery
    createBookGallery();

    loadProjects();
    loadBooks();
    loadHighlights();
    loadArticles();
});