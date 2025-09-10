# 🚀 Modern Portfolio Template

A professional, responsive, and feature-rich portfolio template built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Perfect for developers, designers, freelancers, and agencies to showcase their work and skills.

🔗 **Live Demo**: [https://portfolio-template-demo.vercel.app](https://portfolio-template-demo.vercel.app)  
📁 **CodeCanyon**: [Purchase Template](https://codecanyon.net/)

---

## ✨ Features

### 🎨 **Core Features**

- ✅ **Next.js 15** with App Router and Turbopack
- ✅ **TypeScript** for type safety and better development experience
- ✅ **Tailwind CSS v4** for modern, responsive styling
- 🌗 **Dark/Light Mode** with smooth transitions
- 📱 **Fully Responsive** design for all devices
- ⚡ **Optimized Performance** with Next.js optimizations

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

| Category             | Technology               | Version  |
| -------------------- | ------------------------ | -------- |
| **Framework**        | Next.js                  | 15.3.2   |
| **Language**         | TypeScript               | 5.x      |
| **Styling**          | Tailwind CSS             | 4.x      |
| **UI Components**    | React Icons, Headless UI | Latest   |
| **Animations**       | Swiper.js                | 11.2.8   |
| **Content**          | React Markdown, Marked   | Latest   |
| **Forms**            | EmailJS                  | 4.4.1    |
| **State Management** | React Context API        | Built-in |
| **Deployment**       | Vercel                   | Platform |

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
│   ├── favicon/                  # Favicon icons
│   ├── testimonials/             # Testimonial images
│   ├── profile.webp              # Profile images
│   └── resume.pdf                # Downloadable resume
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
# Clone or extract the template
cd modern-portfolio-template

# Install dependencies
npm install
# or
yarn install

# Copy environment variables template
cp .env.example .env.local

# Edit .env.local with your actual values
# (Optional: Only needed for contact form and AI features)

# Start development server
npm run dev
# or
yarn dev
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

---

## 🎨 Customization

### **Quick Setup**

1. **Site Configuration**: Edit `config/site.config.ts` for basic settings:
   - Personal information (name, email, social links)
   - Feature toggles (AI, blog, contact form)
   - SEO settings
   - Theme preferences

2. **Content Management**: Update JSON files in the `data/` directory:
   - `data/about.json` - Personal information and skills
   - `data/projects.json` - Portfolio projects
   - `data/experiences.json` - Work experience
   - `data/skills.json` - Technical skills
   - `data/testimonials.json` - Client feedback

3. **Environment Variables**: Copy `.env.example` to `.env.local` and configure:
   - EmailJS for contact form
   - Google AI for chat widget

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

---

## 🔧 Configuration

### **Environment Variables**

Copy `.env.example` to `.env.local` and configure:

```env
# EmailJS Configuration (Optional)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id

# Google AI Configuration (Optional)
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key


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

This project is licensed under a Commercial License - see the [LICENSE](LICENSE) file for details.

---

## 🚀 Template Features

**Modern Portfolio Template**  
Built with Next.js 15, TypeScript, and Tailwind CSS

📧 **Support**: Available through CodeCanyon comments  
🌐 **Demo**: [Portfolio Template Demo](https://portfolio-template-demo.vercel.app) • [CodeCanyon Page](https://codecanyon.net/)

---

## 🎯 Template Status

- ✅ **Template Features** - Complete
- ✅ **Documentation** - Complete
- ✅ **Responsive Design** - Complete
- ✅ **Performance Optimization** - Complete
- ✅ **SEO Optimization** - Complete
- ✅ **CodeCanyon Ready** - Complete

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Compatibility**: Next.js 15+, Node.js 18+
