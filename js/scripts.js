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