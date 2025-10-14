import { Target, Heart, Globe, Lightbulb, Users, MessageCircle, ThumbsUp, Share2, Clock } from "lucide-react";

const visionPosts = [
  {
    icon: Target,
    title: "Our Mission",
    author: "Ngawang Thinley",
    role: "Founder & Buddhist Scholar",
    avatar: "https://picsum.photos/40/40?random=10",
    timeAgo: "2h",
    likes: 127,
    comments: 23,
    description:
      "🎯 Our mission is to preserve and make accessible the profound wisdom of Buddhist teachings through innovative digital technologies. We're ensuring ancient knowledge remains relevant for future generations.",
  },
  {
    icon: Heart,
    title: "Our Values",
    author: "Karma Tsering",
    role: "Software Engineer",
    avatar: "https://picsum.photos/40/40?random=11",
    timeAgo: "4h",
    likes: 89,
    comments: 16,
    description:
      "❤️ We are guided by compassion, mindfulness, and the pursuit of wisdom. Every tool we create is designed with respect for the sacred nature of these texts and their transformative power.",
  },
  {
    icon: Globe,
    title: "Our Vision",
    author: "Tashi Tsering",
    role: "AI Engineer",
    avatar: "https://picsum.photos/40/40?random=12",
    timeAgo: "6h",
    likes: 156,
    comments: 31,
    description:
      "💡 We combine cutting-edge technology with traditional scholarship, ensuring our tools honor the depth and nuance of Buddhist teachings while embracing modern learning methods.",
  },
  {
    icon: Lightbulb,
    title: "Our Approach",
    author: "Tenzin Kunsang",
    role: "DevOps Engineer",
    avatar: "https://picsum.photos/40/40?random=13",
    timeAgo: "8h",
    likes: 94,
    comments: 19,
    description:
      "🌍 Envisioning a world where Buddhist wisdom is freely accessible to all seekers, transcending geographical, linguistic, and technological barriers through thoughtfully crafted digital tools.",
  },
];

const VisionSection = () => {
  return (
    <section
      id="vision"
      className="py-12 sm:py-16 relative overflow-hidden"
      aria-labelledby="vision-heading"
    >
      {/* Simplified background decorations */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-primary-200/20 dark:from-primary-800/20 to-secondary-200/20 dark:to-secondary-800/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tl from-secondary-200/20 dark:from-secondary-800/20 to-primary-200/20 dark:to-primary-800/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <header className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100/60 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-medium mb-4 backdrop-blur-sm">
            <MessageCircle className="h-3 w-3" />
            Community Voices
          </div>
          <h2
            id="vision-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent mb-4 leading-tight"
          >
            What Our Team Says
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed px-4">
            Hear directly from our founders and team members about our mission
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {visionPosts.map((post, index) => {
            return (
              <div
                key={`vision-post-${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative"
              >
                {/* Social media style post container */}
                <div className="relative bg-neutral-50/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/40 dark:border-neutral-700/40 shadow-sm hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-200/10 dark:from-primary-800/20 via-transparent to-secondary-200/10 dark:to-secondary-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  {/* User profile header */}
                  <div className="relative z-10 flex items-center gap-3 mb-4">
                    <img 
                      src={post.avatar} 
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary-400/30 dark:border-primary-500/30"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className=" text-neutral-900 dark:text-neutral-100 text-sm">{post.author}</h3>
                        <span className="w-1 h-1 bg-neutral-600 dark:bg-neutral-400 rounded-full"></span>
                        <span className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.timeAgo}
                        </span>
                      </div>
                      <p className="text-xs text-primary-600 dark:text-neutral-300 font-medium">{post.role}</p>
                    </div>
                  </div>

                  {/* Post content */}
                  <div className="relative z-10 mb-4">
                    <p className="text-sm text-neutral-900 dark:text-neutral-100 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  {/* Engagement section */}
                  <div className="relative z-10 flex items-center justify-between pt-3 border-t border-neutral-200/50 dark:border-neutral-700/50">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-xs">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-xs">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-xs">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                    
                    {/* Category badge */}
                    <div className="text-xs bg-primary-100/60 dark:bg-primary-900/30 text-primary-700 dark:text-neutral-800 px-2 py-1 rounded-full font-medium">
                      {post.title}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Stats Section */}
        <aside className="mt-8 sm:mt-10 md:mt-12" aria-labelledby="community-stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            {/* Engagement Stats */}
            <div className="relative bg-neutral-50/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/40 dark:border-neutral-700/40 shadow-sm hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-200/30 dark:from-primary-800/30 to-secondary-200/30 dark:to-secondary-800/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ThumbsUp className="h-6 w-6 text-primary-600 dark:text-neutral-300" />
              </div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">2.4K+</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Community Likes</div>
            </div>

            {/* Comments Stats */}
            <div className="relative bg-neutral-50/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/40 dark:border-neutral-700/40 shadow-sm hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-200/30 dark:from-primary-800/30 to-secondary-200/30 dark:to-secondary-800/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-primary-600 dark:text-neutral-300" />
              </div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">589</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Active Discussions</div>
            </div>

            {/* Community CTA */}
            <div className="relative bg-neutral-50/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-2xl p-6 border border-neutral-200/40 dark:border-neutral-700/40 shadow-sm hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-200/30 dark:from-primary-800/30 to-secondary-200/30 dark:to-secondary-800/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-primary-600 dark:text-neutral-300" />
              </div>
              <a
                href="https://forum.openpecha.org"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="text-sm font-medium text-primary-600 dark:text-neutral-300 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">Join Discussion</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Connect with our team</div>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default VisionSection;

