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
        const gallery = new Gallery(container, books, createBookCard, 3);
        gallery.init();
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

async function createArticleGallery() {
    const container = document.getElementById('articlesGallery');
    try {
        const response = await fetch('files/articles_info.json');
        if (!response.ok) throw new Error(`Failed to fetch files/articles_info.json`);
        const books = await response.json();
        console.log('Books Data:', books); // Debugging output
        const gallery = new Gallery(container, books, createPostCard, 3);
        gallery.init();
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <div class="post-info">
        <h2>${post.title}</h2>
        <p>${post.description}</p>
        <a href="${post.link}" target="_blank">Learn more</a>
      </div>
    `;

    return card;
}

async function createPostGallery() {
    const container = document.getElementById('postsGallery');
    try {
        const response = await fetch('files/posts_info.json');
        if (!response.ok) throw new Error(`Failed to fetch files/posts_info.json`);

        const posts = await response.json(); // Now directly an array
        console.log('Posts Data:', posts); // Debugging output

        const gallery = new Gallery(container, posts, createPostCard, 3); // Use posts directly
        gallery.init(); // Ensure render method is called
    } catch (error) {
        console.error('Error loading posts:', error);
        container.innerHTML = '<p>Failed to load blog posts</p>';
    }
}

async function createProjectGallery() {
    const container = document.getElementById('projectsGallery');
    try {
        const response = await fetch('files/projects_info.json');
        if (!response.ok) throw new Error(`Failed to fetch files/projects_info.json`);

        const posts = await response.json(); // Now directly an array
        console.log('Projects Data:', posts); // Debugging output

        const gallery = new Gallery(container, posts, createPostCard, 3); // Use posts directly
        gallery.init(); // Ensure render method is called
    } catch (error) {
        console.error('Error loading posts:', error);
        container.innerHTML = '<p>Failed to load blog posts</p>';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createPostGallery();
    createProjectGallery();
    createArticleGallery();
    createBookGallery();
});