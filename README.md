# Itclub Butwal Kalika Campus – MERN CRUD Application

Welcome to the official project repository for **Itclub Butwal Kalika Campus**, the IT community for our campus! 🚀  
This full-stack application demonstrates CRUD (Create, Read, Update, Delete) operations using the **MERN stack** with **Next.js** for the frontend and backend, optimized for performance and SEO.

---

## 🧠 About Itclub Butwal Kalika Campus

Itclub Butwal Kalika Campus is a tech-driven campus community focused on learning programming, web development, and advancing IT skills through collaboration and real-world projects. This MERN CRUD project is one of our core learning initiatives.

**Website:** https://itclub-butwal.com

---

## 🛠 Tech Stack

- **Frontend:** Next.js 15+ (React Framework with App Router)
- **Backend:** Next.js with Server Actions
- **Database:** MongoDB (Mongoose)
- **AI Chat Support:** Google Gemini AI
- **Authentication:** JWT with HTTP-only cookies
- **File Upload:** Cloudinary integration
- **Styling:** Tailwind CSS
- **Package Manager:** npm

---

## 📌 Project Objective

The goal of this project is to help club members:

- Understand the MERN stack architecture
- Learn how to build full-stack applications with Next.js Server Actions
- Practice frontend-backend integration
- Explore AI integration with Gemini
- Understand modern authentication patterns
- Explore deployment & environment setup
- Master SEO optimization for modern web applications
- Implement best practices in web development

---

## 🚀 Features

- ✅ Create a new item (Members & Events)
- 📄 Read/fetch items (all or individual)
- ✏️ Update existing items
- ❌ Delete items
- 🤖 AI-powered chat support with Gemini
- 🔐 Secure authentication with JWT
- 📁 File upload and management with Cloudinary
- ⚡ Server-side rendering (SSR) with Next.js
- 🛡 Environment configuration with `.env.local`
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- 🔍 **SEO Optimizations:**
  - Favicon integration
  - Meta tags and descriptions
  - OpenGraph tags for social sharing
  - Twitter Card support
  - XML Sitemap (`sitemap.xml`)
  - Robots.txt configuration
  - JSON-LD structured data (Schema.org markup)
  - Page-specific SEO metadata
  - Admin pages excluded from search indexing

---

## 📂 Project Structure

```
NextGenIT/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   ├── dashboard/
│   │   │   ├── events/
│   │   │   ├── members/
│   │   └── _components/
│   ├── entrance/          # IT Skills Assessment Quiz
│   ├── layout.tsx         # Root layout with SEO & schema
│   ├── page.tsx           # Home page with SEO
│   └── globals.css
├── components/            # Reusable React components
├── lib/
│   ├── dbCon.ts          # MongoDB connection
│   ├── schemas/          # JSON-LD schema markup
│   └── apis/             # API utilities
├── models/               # Mongoose schemas
├── types/                # TypeScript type definitions
├── public/
│   ├── sitemap.xml       # SEO sitemap
│   ├── robots.txt        # Search engine directives
│   └── logo.png
├── .env.local            # Environment variables (create this file)
└── package.json
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd NextGenIT
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret_key
```

**How to get these values:**
- **MongoDB URI:** Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Cloudinary:** Sign up at [Cloudinary](https://cloudinary.com) for file upload
- **Gemini API Key:** Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **JWT Secret:** Generate any random string for JWT signing

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 📖 Usage Guide

### Home Page (`/`)
- View club information
- See upcoming events
- View member profiles
- Access contact information
- Take the IT Skills Assessment Quiz (`/entrance`)

### Admin Portal (`/admin/login`)
- **Login:** Use your admin credentials
- **Manage Events:** Create, read, update, delete events
- **Manage Members:** Manage club member information
- **Dashboard:** Overview of all activities

### IT Skills Quiz (`/entrance`)
- Interactive quiz to assess IT and programming knowledge
- Timed assessment (10 minutes)
- Results with score and performance analysis
- Perfect for new members wanting to join

---

## 🔍 SEO Features

### Implemented SEO Enhancements:

1. **Meta Tags & Descriptions**
   - Home page: Optimized for "IT club", "programming", "web development"
   - Quiz page: Optimized for "IT skills assessment"
   - Admin pages: Marked as `noindex, nofollow`

2. **Social Media Sharing**
   - OpenGraph tags for Facebook/LinkedIn sharing
   - Twitter Card support with preview image
   - Logo.png used for all social previews

3. **Sitemap**
   - `public/sitemap.xml` lists all public pages
   - Helps search engines discover all content
   - Last modified dates and priority levels included

4. **Robots.txt**
   - `public/robots.txt` guides search engine crawlers
   - Allows public pages to be indexed
   - Blocks admin section from indexing
   - Specifies sitemap location

5. **Structured Data (JSON-LD)**
   - Organization schema markup
   - Educational organization information
   - Name, logo, address, and social links

6. **Favicon**
   - `logo.png` serves as the website favicon
   - Appears in browser tabs and bookmarks

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Environment Variables on Vercel
- Add all `.env.local` variables in Vercel project settings
- Vercel will automatically load them during build

### Update Sitemap URLs
Before deployment, update `public/sitemap.xml` with your actual domain URL

---

## 🤝 Contributing

We welcome contributions from club members! Follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m 'Add new feature'`
5. Push to branch: `git push origin feature/your-feature`
6. Open a Pull Request

---

## 📞 Support & Contact

For questions or support:
- Email: contact@itclub-butwal.com
- Facebook: [Itclub Butwal](https://facebook.com/itclub-butwal)
- Location: Kalika Campus, Butwal, Nepal

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 🎯 Roadmap

- [ ] User dashboard for member profiles
- [ ] Event calendar integration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Email notifications system
- [ ] Payment integration for events
- [ ] AI-powered learning recommendations

---

**Made with ❤️ by Itclub Butwal Kalika Campus Community**
