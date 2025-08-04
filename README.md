# 🧑‍💻 MD Hasan Patwary — Personal Portfolio

A modern, responsive, and feature-rich personal portfolio website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features include PWA capabilities, offline caching, dark/light mode, and a comprehensive showcase of professional experience, skills, and projects.

🔗 **Live Website**: [https://patwary.vercel.app](https://patwary.vercel.app)  
📁 **GitHub Repo**: [github.com/mdhasanpatwary/portfolio-app](https://github.com/mdhasanpatwary/portfolio-app)

---

## ✨ Features

### 🎨 **Core Features**

- ✅ **Next.js 15** with App Router and Turbopack
- ✅ **TypeScript** for type safety and better development experience
- ✅ **Tailwind CSS v4** for modern, responsive styling
- 🌗 **Dark/Light Mode** with smooth transitions
- 📱 **Fully Responsive** design for all devices
- ⚡ **Optimized Performance** with Next.js optimizations

### 📱 **PWA (Progressive Web App) Features**

- 🏠 **Install to Home Screen** - Users can install as a native app
- 🔄 **Offline Caching** - Works completely offline after first visit
- 🎨 **App-like Experience** - Standalone display mode
- 🖼️ **Custom Icons** - Professional app icons for all platforms
- 📋 **Complete Web Manifest** - Full PWA configuration

### 🧩 **Portfolio Sections**

- 🎯 **Banner** - Hero section with call-to-action
- 👨‍💼 **About** - Professional background and skills
- 🛠️ **Skills** - Technical expertise showcase
- 📁 **Projects** - Portfolio of work with filtering
- 💼 **Experience** - Work history and achievements
- 🎓 **Education** - Academic background
- 💬 **Testimonials** - Client feedback and reviews
- 🎨 **Hobbies** - Personal interests and activities
- 📞 **Contact** - Contact form with EmailJS integration
- 📝 **Blog** - Dev.to integration for articles
- 💡 **CSS Tips** - Technical blog section

### 🔧 **Technical Features**

- 📊 **SEO Optimized** - Meta tags, structured data, sitemap
- 🎯 **Error Boundaries** - Graceful error handling
- 🔄 **Context API** - State management for theme and blog
- 📝 **Markdown Support** - React Markdown for content
- 🎨 **Swiper.js** - Smooth carousel animations
- 🔔 **Toast Notifications** - User feedback system

---

## 🛠️ Tech Stack

| Category             | Technology                    | Version  |
| -------------------- | ----------------------------- | -------- |
| **Framework**        | Next.js                       | 15.3.2   |
| **Language**         | TypeScript                    | 5.x      |
| **Styling**          | Tailwind CSS                  | 4.x      |
| **UI Components**    | React Icons, Headless UI      | Latest   |
| **Animations**       | Swiper.js                     | 11.2.8   |
| **Content**          | React Markdown, Marked        | Latest   |
| **Forms**            | EmailJS                       | 4.4.1    |
| **State Management** | React Context API             | Built-in |
| **Deployment**       | Vercel                        | Platform |
| **PWA**              | Service Workers, Web Manifest | Native   |

---

## 📁 Project Structure

```plaintext
portfolio-app/
├── app/                          # Next.js App Router
│   ├── about/                    # About page
│   ├── blog/                     # Blog pages with dynamic routing
│   ├── contact/                  # Contact page
│   ├── css-tips/                 # CSS tips page
│   ├── projects/                 # Projects page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Homepage
├── components/                   # React components
│   ├── about/                    # About section components
│   ├── banner/                   # Hero section components
│   ├── blog/                     # Blog components
│   ├── contact/                  # Contact form components
│   ├── cssTips/                  # CSS tips components
│   ├── education/                # Education section
│   ├── experience/               # Experience section
│   ├── footer/                   # Footer component
│   ├── funfact/                  # Fun facts section
│   ├── global/                   # Shared components
│   ├── header/                   # Navigation header
│   ├── hobby/                    # Hobbies section
│   ├── projects/                 # Project showcase
│   ├── services/                 # Services section
│   ├── skills/                   # Skills showcase
│   └── testimonial/              # Testimonials section
├── context/                      # React Context providers
│   ├── BlogContext.tsx           # Blog data management
│   └── ThemeContext.tsx          # Theme state management
├── data/                         # Static JSON data
│   ├── about.json                # About section data
│   ├── banner.json               # Hero section data
│   ├── blog.json                 # Blog posts data
│   ├── contact.json              # Contact form data
│   ├── css-tips.json             # CSS tips content
│   ├── education.json            # Education history
│   ├── experiences.json          # Work experience
│   ├── footer.json               # Footer data
│   ├── funFacts.json             # Fun facts data
│   ├── header.json               # Navigation data
│   ├── hobbies.json              # Hobbies data
│   ├── projects.json             # Projects portfolio
│   ├── services.json             # Services offered
│   ├── skills.json               # Skills data
│   └── testimonials.json         # Client testimonials
├── hooks/                        # Custom React hooks
│   └── useProjectModal.tsx       # Project modal hook
├── public/                       # Static assets
│   ├── favicon/                  # PWA icons and manifest
│   ├── testimonials/             # Testimonial images
│   ├── profile.webp              # Profile images
│   ├── resume.pdf                # Downloadable resume
│   └── sw.js                     # Service worker for PWA
├── types/                        # TypeScript type definitions
│   └── data.ts                   # Data type interfaces
├── utils/                        # Utility functions
│   ├── index.ts                  # Helper functions
│   └── status.tsx                # Status components
└── next.config.ts                # Next.js configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/mdhasanpatwary/portfolio-app.git
cd portfolio-app

# Install dependencies
yarn install
# or
npm install

# Start development server
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
# Build the application
yarn build
# or
npm run build

# Start production server
yarn start
# or
npm start
```

---

## 📱 PWA Features

### **Offline Functionality**

- ✅ **Complete offline browsing** after first visit
- ✅ **Cached pages**: Home, About, Projects, Blog, Contact, CSS Tips
- ✅ **Cached assets**: Images, icons, PDFs, SVGs
- ✅ **Dynamic content caching**: Blog posts and API responses

### **Installation**

- ✅ **Install to home screen** on mobile devices
- ✅ **Desktop app installation** on supported browsers
- ✅ **Custom install prompt** with user-friendly UI

### **App-like Experience**

- ✅ **Standalone display mode** - No browser UI
- ✅ **Custom app icons** for all platforms
- ✅ **Splash screen** and loading states
- ✅ **Native app behavior** with proper navigation

---

## 🎨 Customization

### **Content Management**

All content is stored in JSON files in the `data/` directory. Update these files to customize:

- `data/about.json` - Personal information and skills
- `data/projects.json` - Portfolio projects
- `data/experiences.json` - Work experience
- `data/skills.json` - Technical skills
- `data/testimonials.json` - Client feedback

### **Styling**

- Uses **Tailwind CSS v4** for styling
- Custom CSS in `app/globals.css`
- Theme colors defined in Tailwind config
- Responsive design with mobile-first approach

### **PWA Configuration**

- Web manifest: `public/favicon/site.webmanifest`
- Service worker: `public/sw.js`
- Icons: `public/favicon/` directory
- Caching strategy: Cache-first with network fallback

---

## 🔧 Configuration

### **Environment Variables**

Create a `.env.local` file for local development:

```env
# Optional: EmailJS configuration for contact form
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

### **Deployment**

The project is optimized for **Vercel** deployment:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Build and deploy automatically on push

---

## 📊 Performance

### **Optimizations**

- ✅ **Next.js 15** with Turbopack for faster builds
- ✅ **Image optimization** with Next.js Image component
- ✅ **Code splitting** and lazy loading
- ✅ **PWA caching** for offline performance
- ✅ **SEO optimization** with meta tags and structured data

### **Lighthouse Scores**

- 🟢 **Performance**: 95+
- 🟢 **Accessibility**: 95+
- 🟢 **Best Practices**: 95+
- 🟢 **SEO**: 95+

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

📖 **For detailed contribution guidelines, please read our [CONTRIBUTING.md](CONTRIBUTING.md) file.**

### **Quick Start**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**

- ✅ Follow consistent code structure and naming conventions
- ✅ Test your changes before pushing
- 🚫 Do not change author info or license details
- 🚫 Avoid adding unnecessary libraries or dependencies

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Author

**MD Hasan Patwary**  
Frontend Developer | HTML, CSS, JavaScript, jQuery, React, Vue, Next.js, Docker, AWS

📧 [patwary.dev@gmail.com](mailto:patwary.dev@gmail.com)  
🌐 [Portfolio](https://patwary.vercel.app) • [LinkedIn](https://linkedin.com/in/mdhasanpatwary) • [GitHub](https://github.com/mdhasanpatwary)

---

## 🎯 Project Status

- ✅ **Core Features** - Complete
- ✅ **PWA Implementation** - Complete
- ✅ **Responsive Design** - Complete
- ✅ **Performance Optimization** - Complete
- ✅ **SEO Optimization** - Complete
- ✅ **Deployment** - Live on Vercel

**Last Updated**: August 2025  
**Version**: 1.0.0
