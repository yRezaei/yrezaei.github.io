# Personal Website Project Vision

For a long time, I've been wanting to build a personal website that reflects who I am and what I do.  
This platform is intended to showcase my work, share insights from my career journey, and provide a space  
to explore the advanced software engineering practices I’ve learned through Robotics, the Automotive industry,  
and various system engineering applications.

---

## Project Structure & Future Growth

Although this is my first ever project in HTML, CSS, and JavaScript, I’ve organized it to separate content  
from layout and logic. Each core module, page, or script lives in its own file, while essential data is stored  
in JSON under `assets/data/*.json`. This approach makes the site more readable, maintainable, and easily  
extendable over time. If anyone likes this structure, they can freely take (“fork”) this entire project, swap  
in their own data files, and publish a personal website with minimal effort. It’s all open and free of charge  
to use as a starting point.

Over time, I plan to refine this structure so it’s even simpler to maintain: most CSS will be consolidated into  
more generic files, and new features will be added without impacting existing functionality. The goal is that  
anyone can simply tweak the JSON content for their personal data, pick a suitable CSS theme, and have a complete  
site ready to go.

---

## Visual Overview

Below is a quick glimpse of some core folders in the project (trimmed for brevity). Each folder has a distinct  
purpose, so it’s easy to extend or customize your personal site:

```
yrezaei.github.io
├── assets
│   ├── data
│   │   └── projects_info.json      <- JSON data for your Projects page
│   ├── icons
│   └── img
├── css
│   ├── styles.css                  <- Main site-wide CSS
│   └── projects.css               <- Additional styling for Projects page
├── html
│   ├── projects
│   │   ├── stdx.html
│   │   └── website.html
│   ├── about.html
│   ├── blog.html
│   └── projects.html
├── js
│   ├── main.js                     <- General scripts (e.g., theme toggling)
│   └── projects.js                 <- Logic for Projects page
├── index.html
└── ...
```

### How to Add a New Feature or Page

1. **Add a New Data Entry**  
   Update the relevant JSON file in `assets/data` with your new item (e.g., a new project or blog post).

2. **Create or Update an HTML Page**  
   Place your new page in the `html` folder, then reference it in the JSON so the site can automatically link to it.

3. **Style It**  
   Add or modify a `.css` file to suit your needs, or incorporate new styles into `styles.css` if they’re reusable.

4. **JavaScript Logic**  
   If needed, create a dedicated `.js` file or update an existing one to fetch data and render it on the page.

5. **Reuse & Fork**  
   The entire project is free to use. If you like this structure, feel free to fork the  
   [GitHub repo](https://github.com/yrezaei/yrezaei.github.io), replace the JSON files with your own content,  
   and have a personal website up in no time!