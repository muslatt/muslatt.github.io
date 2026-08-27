# 🚀 Modern Online Portfolio & Internship Showcase

A modern, responsive, and SEO-optimized portfolio website crafted for landing software engineering, web development, and tech internships.

---

## ✨ Features

- **High-Impact Minimalist Aesthetics**: Clean, solid high-contrast dark mode with crisp borders, bold typography (`Outfit`, `Plus Jakarta Sans`, `JetBrains Mono`), and fast zero-gradient styling.
- **Theme Switcher**: One-click toggle between Dark and Light mode with persistent state.
- **Dynamic Hero Section**:
  - Internship availability badge.
  - Animated typing role descriptor.
  - Interactive 3D tilt card with code snippet & floating tech badges.
- **Interactive Skills Matrix**: Categorized into Frontend, Backend, Cloud/DevOps, and Core Computer Science.
- **Featured Projects Showcase**:
  - Live category filters (All, Full Stack Web, AI/ML, Developer Tools).
  - High-res project cards with tech tags and direct source / live demo buttons.
  - Interactive modal dialog for deep-dive architecture notes and feature bullet points.
- **Experience & Education Timeline**: Showcase hackathon wins, research assistantships, GPA, and coursework.
- **Interactive Contact Form & Socials**:
  - Client-side validation with real-time feedback.
  - One-click copy email button with toast alerts.
  - Social media and GitHub links.
- **SEO & Web Searchability**:
  - Complete OpenGraph and Twitter card metadata.
  - Schema.org `Person` JSON-LD structured data for Google search indexing.
  - Zero heavy framework dependencies: pure HTML5, Vanilla CSS, and JavaScript for blazingly fast load times.

---

## 🛠️ How to Customize for Yourself

### 1. Update Personal Info & Bio
Open `index.html` and edit:
- **Your Name**: Replace `Alex Morgan` with your actual name in `<title>`, `<h1>`, navigation logo, and Schema.org JSON.
- **SEO Keywords & Description**: Update `<meta name="description">` with your specific target roles.
- **Social Links**: Replace placeholder URLs (`https://github.com`, `https://linkedin.com`) with your actual profile links.
- **Email**: Update `alex.morgan.intern@example.com` with your real email address.

### 2. Update Projects & Details
Open `script.js` and locate `projectData`:
- Add your own project title, description, screenshot image URL, GitHub repo link, and live demo link.
- Update the corresponding project cards in `index.html`.

### 3. Add Your Resume (PDF)
1. Place your resume PDF in this folder (e.g. `resume.pdf`).
2. In `index.html`, update the resume button link:
   ```html
   <a href="resume.pdf" download class="btn btn-glass">
     <i class="fa-solid fa-file-arrow-down"></i>
     <span>Resume</span>
   </a>
   ```

---

## 🌐 Deploying to the Web (Free)

### Option A: GitHub Pages (Recommended)
1. Push this folder to a GitHub repository named `<your-username>.github.io` (or any repo name).
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and `/root`, then click **Save**.
4. Your website will be live in 1-2 minutes!

### Option B: Vercel / Netlify
1. Drag and drop this folder onto [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. It will deploy automatically with instant SSL and custom domain support.
