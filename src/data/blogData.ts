
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Essential Web Design Trends for 2024',
    excerpt: 'Discover the latest web design trends that are shaping the digital landscape in 2024. From minimalism to interactive designs...',
    category: 'Web Design',
    author: 'Sarah Johnson',
    date: 'Nov 24, 2024',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: 2,
    title: 'How to Build a Strong Brand Identity',
    excerpt: 'Learn the fundamentals of creating a memorable brand identity that resonates with your target audience...',
    category: 'Branding',
    author: 'Mike Chen',
    date: 'Nov 22, 2024',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: 3,
    title: 'Complete Guide to SEO Optimization',
    excerpt: 'Master the art of SEO and increase your website visibility on search engines with our comprehensive guide...',
    category: 'SEO',
    author: 'Alex Kumar',
    date: 'Nov 20, 2024',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  },
  {
    id: 4,
    title: 'Social Media Marketing Strategies That Work',
    excerpt: 'Effective social media strategies to grow your audience and increase engagement on all major platforms...',
    category: 'Marketing',
    author: 'Emma Wilson',
    date: 'Nov 18, 2024',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  },
  {
    id: 5,
    title: 'User Experience Design Best Practices',
    excerpt: 'Create intuitive and delightful user experiences by following these proven UX design principles...',
    category: 'UX Design',
    author: 'David Lee',
    date: 'Nov 16, 2024',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  },
  {
    id: 6,
    title: 'E-Commerce Conversion Rate Optimization',
    excerpt: 'Proven strategies to increase your e-commerce conversion rates and boost your online sales...',
    category: 'E-Commerce',
    author: 'Lisa Anderson',
    date: 'Nov 14, 2024',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  }
];
