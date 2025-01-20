import { Brain, Cpu, LineChart, Shield, BookOpen, PieChart, BarChart, Lock } from 'lucide-react';

export const features = [
  {
    title: "Quantum AI",
    description:
      "Advanced quantum computing algorithms process market data at unprecedented speeds.",
    icon: Brain,
    gradient: "from-blue-500 to-purple-500",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832",
    alt: "Quantum computing visualization",
    featuresList: [
      "Real-time market analysis",
      "Predictive analytics for stocks",
      "AI-driven investment strategies",
    ],
    cta: {
      text: "Explore AI Tools",
      link: "/ai-tools",
    },
  },
  {
    title: "Trading Platform",
    description:
      "A seamless, intuitive trading platform designed for both beginners and professionals.",
    icon: BarChart,
    gradient: "from-purple-500 to-pink-500",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2832",
    alt: "Trading platform visualization",
    featuresList: [
      "Zero brokerage on equity investments",
      "Advanced charting tools",
      "Instant order execution",
    ],
    cta: {
      text: "Start Trading",
      link: "/trading",
    },
  },
  {
    title: "Investment Tools",
    description:
      "Powerful tools to help you make informed investment decisions.",
    icon: PieChart,
    gradient: "from-pink-500 to-red-500",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2832",
    alt: "Investment tools visualization",
    featuresList: [
      "Portfolio analytics",
      "Risk management tools",
      "Customizable watchlists",
    ],
    cta: {
      text: "Explore Tools",
      link: "/investment-tools",
    },
  },
];