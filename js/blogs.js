import { createBatchGallery } from '/js/gallery.js';

document.addEventListener('DOMContentLoaded', () => {
    createBatchGallery('/assets/data/posts_info.json', 'postsGallery', 5);
});
