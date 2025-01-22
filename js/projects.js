import { createBatchGallery } from '/js/gallery.js';

document.addEventListener('DOMContentLoaded', () => {
    createBatchGallery('/assets/data/projects_info.json', 'projectsGallery');
});
