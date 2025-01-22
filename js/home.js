import { createExpandableGallery } from '/js/gallery.js';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createExpandableGallery('assets/data/posts_info.json', 'postsGallery');
    createExpandableGallery('assets/data/projects_info.json', 'projectsGallery');
    createExpandableGallery('assets/data/articles_info.json', 'articlesGallery');
    createExpandableGallery('assets/data/books_info.json', 'booksGallery');
});