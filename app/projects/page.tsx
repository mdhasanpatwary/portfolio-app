"use client";

import { FC, useState } from "react";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaPlay,
  FaCode,
  FaRocket,
  FaLightbulb,
  FaTimes,
  FaArrowLeft,
  FaFolderOpen,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  tech: string[];
  status: "live" | "development" | "concept";
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
}

const projects: Project[] = [
  {
    title: "6valley",
    description:
      "Multi-Vendor eCommerce CMS with advanced marketplace functionality.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://6valley.app",
    category: "Laravel CMS",
    tech: ["Laravel", "Vue.js", "MySQL", "REST API", "WebSocket"],
    status: "live",
    longDescription:
      "6valley is a comprehensive multi-vendor eCommerce platform that enables businesses to create their own online marketplace. The platform supports multiple vendors, advanced inventory management, and seamless payment processing.",
    features: [
      "Multi-vendor marketplace functionality",
      "Advanced inventory management",
      "Secure payment processing",
      "Real-time order tracking",
      "Mobile-responsive design",
    ],
    challenges: [
      "Complex multi-vendor architecture",
      "Real-time inventory synchronization",
      "Payment gateway integration",
    ],
    solutions: [
      "Implemented microservices architecture",
      "Used WebSocket for real-time updates",
      "Integrated multiple payment gateways",
    ],
  },
  {
    title: "DriveMond",
    description: "Complete Ride Sharing and Parcel Delivery Solution.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://drivemond.app",
    category: "React Template",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "GPS"],
    status: "live",
    longDescription:
      "DriveMond is a comprehensive ride-sharing and parcel delivery platform that connects drivers with passengers and delivery requests. Features real-time tracking and secure payment processing.",
    features: [
      "Real-time ride booking",
      "Parcel delivery system",
      "Live GPS tracking",
      "Driver verification",
      "Secure payment processing",
    ],
    challenges: [
      "Real-time location tracking",
      "Driver-passenger matching",
      "Payment security",
    ],
    solutions: [
      "Implemented WebSocket for real-time updates",
      "Used geolocation APIs for tracking",
      "Integrated secure payment gateways",
    ],
  },
  {
    title: "Demandium",
    description: "Multi Provider On Demand admin panel for service management.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://demandium.app",
    category: "React Template",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "Admin Panel"],
    status: "live",
    longDescription:
      "Demandium is an on-demand service marketplace that connects customers with qualified professionals for home services. The platform includes real-time booking, tracking, and payment systems.",
    features: [
      "Multi-provider management",
      "Real-time service booking",
      "Professional verification system",
      "Live tracking and notifications",
      "Secure payment processing",
    ],
    challenges: [
      "Service provider verification",
      "Real-time booking system",
      "Payment dispute resolution",
    ],
    solutions: [
      "Created comprehensive verification workflow",
      "Implemented real-time booking with WebSocket",
      "Built automated dispute resolution system",
    ],
  },
  {
    title: "DVPN",
    description: "Multipurpose VPN React JS Template with modern UI.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://react-dvpn.netlify.app",
    category: "React Template",
    tech: ["React", "JavaScript", "CSS3", "Netlify", "VPN API"],
    status: "live",
    longDescription:
      "DVPN is a modern React-based VPN service template featuring sleek design and user-friendly interface for VPN service providers.",
    features: [
      "Modern React interface",
      "VPN service integration",
      "User authentication",
      "Service plans management",
      "Responsive design",
    ],
    challenges: [
      "VPN API integration",
      "Real-time connection status",
      "Cross-platform compatibility",
    ],
    solutions: [
      "Integrated VPN service APIs",
      "Implemented WebSocket for status updates",
      "Used responsive design principles",
    ],
  },
  {
    title: "Docland",
    description: "Multipurpose SaaS & Tech Startup Website Template.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://themelooks.com/demo/docland/html/",
    category: "HTML Template",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "SaaS"],
    status: "live",
    longDescription:
      "Docland is a comprehensive SaaS and tech startup website template designed for modern businesses with clean design and excellent user experience.",
    features: [
      "SaaS landing pages",
      "Tech startup design",
      "Modern UI/UX",
      "Responsive layout",
      "SEO optimized",
    ],
    challenges: [
      "Creating modern SaaS design",
      "Ensuring cross-browser compatibility",
      "Optimizing for performance",
    ],
    solutions: [
      "Used modern CSS techniques",
      "Implemented progressive enhancement",
      "Optimized images and assets",
    ],
  },
  {
    title: "Dashmin",
    description: "Modern Admin Dashboard Template with clean interface.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://themelooks.net/demo/dashmin/",
    category: "React Template",
    tech: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Admin"],
    status: "live",
    longDescription:
      "Dashmin is a modern admin dashboard template built with React and TypeScript. It provides a comprehensive set of components and layouts for building powerful admin interfaces.",
    features: [
      "Responsive design system",
      "Dark/light theme support",
      "Interactive data visualizations",
      "Modular component architecture",
      "Comprehensive documentation",
    ],
    challenges: [
      "Creating reusable component system",
      "Implementing theme switching",
      "Optimizing performance",
    ],
    solutions: [
      "Built component library with Storybook",
      "Used CSS custom properties for theming",
      "Implemented code splitting and lazy loading",
    ],
  },
  {
    title: "Hosttop",
    description:
      "Responsive Hosting With WHMCS Template for web hosting companies.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://themelooks.net/demo/hosttop/html/",
    category: "HTML Template",
    tech: ["HTML5", "CSS3", "JavaScript", "WHMCS", "Hosting"],
    status: "live",
    longDescription:
      "Hosttop is a professional web hosting template with WHMCS integration, designed specifically for hosting companies and service providers.",
    features: [
      "WHMCS integration",
      "Hosting service pages",
      "Domain management",
      "Client portal",
      "Payment integration",
    ],
    challenges: [
      "WHMCS API integration",
      "Hosting service management",
      "Client portal development",
    ],
    solutions: [
      "Integrated WHMCS APIs",
      "Created service management system",
      "Built secure client portal",
    ],
  },
  {
    title: "Anefty",
    description: "NFT Marketplace HTML5 Template for digital art trading.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://themelooks.biz/demo/anefty/html/",
    category: "HTML Template",
    tech: ["HTML5", "CSS3", "JavaScript", "NFT", "Web3"],
    status: "live",
    longDescription:
      "Anefty is a modern NFT marketplace template designed for digital art trading and blockchain-based collectibles.",
    features: [
      "NFT marketplace functionality",
      "Digital art gallery",
      "Blockchain integration",
      "Wallet connectivity",
      "Auction system",
    ],
    challenges: [
      "Blockchain integration",
      "Wallet connectivity",
      "NFT metadata handling",
    ],
    solutions: [
      "Integrated Web3 libraries",
      "Implemented wallet connection",
      "Created NFT metadata system",
    ],
  },
  {
    title: "Repserv",
    description: "Multipurpose Servicing and Repairing HTML5 Template.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://themelooks.biz/demo/repserv/html/",
    category: "HTML Template",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Service"],
    status: "live",
    longDescription:
      "Repserv is a comprehensive service and repair business template designed for maintenance and repair service providers.",
    features: [
      "Service booking system",
      "Repair tracking",
      "Customer portal",
      "Service catalog",
      "Online payments",
    ],
    challenges: [
      "Service booking workflow",
      "Repair status tracking",
      "Customer communication",
    ],
    solutions: [
      "Created booking management system",
      "Implemented status tracking",
      "Built customer notification system",
    ],
  },
  {
    title: "Hostpack",
    description: "Responsive Hosting HTML Template for web hosting services.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://themelooks.biz/demo/hostpack/html/",
    category: "HTML Template",
    tech: ["HTML5", "CSS3", "JavaScript", "Hosting", "Responsive"],
    status: "live",
    longDescription:
      "Hostpack is a modern web hosting template designed for hosting companies with clean design and excellent user experience.",
    features: [
      "Hosting service pages",
      "Domain registration",
      "SSL certificate management",
      "Client area",
      "Support system",
    ],
    challenges: [
      "Hosting service presentation",
      "Domain management interface",
      "Client area development",
    ],
    solutions: [
      "Created service presentation system",
      "Built domain management interface",
      "Developed secure client area",
    ],
  },
  {
    title: "Beautain",
    description: "Multipurpose Beauty Salon and Spa HTML5 Template.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://themelooks.biz/demo/beautain/html/",
    category: "HTML Template",
    tech: ["HTML5", "CSS3", "JavaScript", "Beauty", "Spa"],
    status: "live",
    longDescription:
      "Beautain is a beautiful template designed for beauty salons, spas, and wellness centers with elegant design and booking functionality.",
    features: [
      "Beauty service catalog",
      "Appointment booking",
      "Spa service pages",
      "Staff profiles",
      "Online reservations",
    ],
    challenges: [
      "Service booking system",
      "Staff management",
      "Appointment scheduling",
    ],
    solutions: [
      "Created booking management system",
      "Built staff profile system",
      "Implemented appointment scheduling",
    ],
  },
  {
    title: "Socibook",
    description:
      "Multipurpose Social Network HTML5 Template for community building.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://themelooks.biz/demo/socibook/html/",
    category: "HTML Template",
    tech: ["HTML5", "CSS3", "JavaScript", "Social", "Community"],
    status: "live",
    longDescription:
      "Socibook is a social networking template designed for building online communities and social platforms.",
    features: [
      "User profiles",
      "Social feed",
      "Messaging system",
      "Community groups",
      "Photo sharing",
    ],
    challenges: [
      "User interaction system",
      "Real-time messaging",
      "Content management",
    ],
    solutions: [
      "Built user interaction system",
      "Implemented real-time messaging",
      "Created content management system",
    ],
  },
  {
    title: "ProVPN",
    description: "Multipurpose VPN HTML Template with WHMCS integration.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://themelooks.net/demo/provpn/html/",
    category: "HTML Template",
    tech: ["HTML5", "CSS3", "JavaScript", "WHMCS", "VPN"],
    status: "live",
    longDescription:
      "ProVPN is a comprehensive VPN service template with WHMCS integration, designed for VPN service providers.",
    features: [
      "VPN service pages",
      "WHMCS integration",
      "Client portal",
      "Service plans",
      "Payment processing",
    ],
    challenges: [
      "WHMCS integration",
      "VPN service management",
      "Client portal development",
    ],
    solutions: [
      "Integrated WHMCS APIs",
      "Created service management system",
      "Built secure client portal",
    ],
  },
  {
    title: "GOVPN",
    description:
      "Responsive VPN and SaaS Website Template for modern VPN services.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://themelooks.net/demo/govpn/html/",
    category: "HTML Template",
    tech: ["HTML5", "CSS3", "JavaScript", "VPN", "SaaS"],
    status: "live",
    longDescription:
      "GOVPN is a modern VPN and SaaS website template designed for contemporary VPN service providers with clean design.",
    features: [
      "Modern VPN interface",
      "SaaS functionality",
      "Service plans",
      "Client dashboard",
      "Payment integration",
    ],
    challenges: [
      "Modern VPN interface design",
      "SaaS functionality integration",
      "Payment system development",
    ],
    solutions: [
      "Created modern interface design",
      "Integrated SaaS functionality",
      "Built secure payment system",
    ],
  },
  {
    title: "Unihost",
    description:
      "Responsive Web Hosting and WHMCS Template for hosting companies.",
    image:
      "https://thumbs.dreamstime.com/b/project-characters-show-venture-projects-tasks-showing-34213650.jpg",
    link: "https://themelooks.net/demo/unihost/html/",
    category: "HTML Template",
    tech: ["HTML5", "CSS3", "JavaScript", "WHMCS", "Hosting"],
    status: "live",
    longDescription:
      "Unihost is a professional web hosting template with WHMCS integration, designed for hosting companies and service providers.",
    features: [
      "Web hosting services",
      "WHMCS integration",
      "Domain management",
      "Client portal",
      "Support system",
    ],
    challenges: [
      "WHMCS system integration",
      "Hosting service management",
      "Client portal development",
    ],
    solutions: [
      "Integrated WHMCS system",
      "Created hosting service management",
      "Built comprehensive client portal",
    ],
  },
];

const ProjectsPage: FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <FaRocket className="text-green-600 dark:text-green-400" />;
      case "development":
        return <FaCode className="text-blue-600 dark:text-blue-400" />;
      case "concept":
        return <FaLightbulb className="text-yellow-600 dark:text-yellow-400" />;
      default:
        return <FaCode className="text-gray-600 dark:text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700/50 dark:text-green-400";
      case "development":
        return "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700/50 dark:text-blue-400";
      case "concept":
        return "bg-yellow-100 border-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-700/50 dark:text-yellow-400";
      default:
        return "bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-800/50 dark:border-gray-600/50 dark:text-gray-300";
    }
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "4s" }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full mb-6 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
              <FaArrowLeft className="mr-2" size={16} />
              Back to Home
            </Link>

            <div className="flex items-center justify-center gap-3 mb-4">
              <FaFolderOpen className="text-indigo-600 dark:text-indigo-400 text-3xl" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                All Projects
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Explore my complete portfolio of projects across different
              technologies and industries.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative cursor-pointer mb-4 sm:mb-6 lg:mb-8 break-inside-avoid transform transition-all duration-700 ease-out"
                onClick={() => openModal(project)}
                style={{ animationDelay: `${index * 150}ms` }}>
                {/* Project Image Card */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  {/* Gradient Overlay on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>

                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    style={{ aspectRatio: "4/3" }}
                  />

                  {/* Hover Overlay with Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`flex items-center px-3 py-1.5 rounded-full border text-xs font-medium bg-white/95 backdrop-blur-md shadow-lg ${getStatusColor(
                            project.status
                          )}`}>
                          {getStatusIcon(project.status)}
                          <span className="ml-1.5 capitalize hidden sm:inline font-semibold">
                            {project.status}
                          </span>
                        </div>
                        <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-lg">
                          <span className="hidden sm:inline">
                            {project.category}
                          </span>
                          <span className="sm:hidden">
                            {project.category.split(" ")[0]}
                          </span>
                        </span>
                      </div>

                      {/* Project Info */}
                      <h3 className="text-lg sm:text-xl font-bold mb-3 text-white drop-shadow-lg leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-100 text-xs sm:text-sm mb-4 leading-relaxed drop-shadow-md line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tech.slice(0, 2).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2.5 sm:px-3 py-1 bg-white/95 backdrop-blur-md text-gray-800 text-xs font-semibold rounded-full shadow-md border border-white/20">
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 2 && (
                          <span className="px-2.5 sm:px-3 py-1 bg-white/95 backdrop-blur-md text-gray-800 text-xs font-semibold rounded-full shadow-md border border-white/20">
                            +{project.tech.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transform animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="relative p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-t-3xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110">
                <FaTimes size={18} />
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                  <div
                    className={`flex items-center px-3 py-1.5 rounded-full border text-xs font-medium shadow-sm ${getStatusColor(
                      selectedProject.status
                    )}`}>
                    {getStatusIcon(selectedProject.status)}
                    <span className="ml-1.5 capitalize font-semibold">
                      {selectedProject.status}
                    </span>
                  </div>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-sm">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-3">
                {selectedProject.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {selectedProject.longDescription || selectedProject.description}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              {/* Project Image */}
              <div className="mb-6">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={800}
                    height={400}
                    className="w-full h-48 sm:h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6">
                {/* Features */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenges & Solutions */}
              {(selectedProject.challenges || selectedProject.solutions) && (
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6">
                  {selectedProject.challenges && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 sm:p-6 border border-red-200 dark:border-red-800/50">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                        Challenges
                      </h3>
                      <ul className="space-y-3">
                        {selectedProject.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                              {challenge}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProject.solutions && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 sm:p-6 border border-green-200 dark:border-green-800/50">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Solutions
                      </h3>
                      <ul className="space-y-3">
                        {selectedProject.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                              {solution}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <FaExternalLinkAlt className="mr-2" size={16} />
                  View Project
                </a>
                <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 transform hover:-translate-y-0.5">
                  <FaGithub className="mr-2" size={16} />
                  View Code
                </button>
                <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-0.5">
                  <FaPlay className="mr-2" size={16} />
                  Live Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsPage;
