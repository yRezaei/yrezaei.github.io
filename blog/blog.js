// Function to fetch blog posts from JSON file
async function fetchBlogPosts() {
    try {
        const response = await fetch('../blog/posts_info.json');
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return [];
    }
}

// Function to render blog posts list
async function renderBlogPosts() {
    const blogPostsContainer = document.getElementById('blogPosts');
    if (!blogPostsContainer) return;
    
    const posts = await fetchBlogPosts();
    
    blogPostsContainer.innerHTML = ''; // Clear existing content
    
    posts.forEach(post => {
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
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();
});