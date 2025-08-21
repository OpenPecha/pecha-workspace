import { Card, CardContent } from "./ui/card";
import { Target, Heart, Globe, Lightbulb } from "lucide-react";

const visionPoints = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To preserve and make accessible the profound wisdom of Buddhist teachings through innovative digital technologies, ensuring ancient knowledge remains relevant for future generations.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "We are guided by compassion, mindfulness, and the pursuit of wisdom. Every tool we create is designed with respect for the sacred nature of these texts and their transformative power.",
  },
  {
    icon: Globe,
    title: "Our Vision",
    description:
      "A world where Buddhist wisdom is freely accessible to all seekers, transcending geographical, linguistic, and technological barriers through thoughtfully crafted digital tools.",
  },
  {
    icon: Lightbulb,
    title: "Our Approach",
    description:
      "We combine cutting-edge technology with traditional scholarship, ensuring our tools honor the depth and nuance of Buddhist teachings while embracing modern learning methods.",
  },
];

const VisionSection = () => {
  return (
    <section
      id="vision"
      className="py-20 bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-50 relative"
      aria-labelledby="vision-heading"
    >
      <div className="container mx-auto px-4 relative z-10">
        <header className="text-center mb-16">
          <h2
            id="vision-heading"
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Our Vision & Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging ancient wisdom with modern technology to create a more
            mindful and compassionate digital world.
          </p>
        </header>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto list-none">
          {visionPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <li
                key={`vision-point-${point.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <Card className="border-gray-200 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div
                        className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm shrink-0"
                        aria-hidden="true"
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                          {point.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>

        <aside
          className="mt-16 text-center"
          aria-labelledby="community-heading"
        >
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto border border-indigo-100">
            <h3 id="community-heading" className="text-2xl font-bold mb-4 text-gray-900">
              Join Our Community
            </h3>
            <p className="text-gray-600 mb-4">
              Pecha.tools is a specialized platform designed for scholars,
              researchers, and practitioners working with Buddhist manuscripts.
              Our suite of tools helps streamline the process of translating,
              transcribing, and proofreading these valuable cultural artifacts.
            </p>
            <p className="text-gray-600">
              With a centralized login system, users can seamlessly access all
              tools and maintain consistency across their projects. Our modern,
              intuitive interface ensures that users can focus on their work
              rather than navigating complex software.
            </p>
            <nav
              className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
              aria-label="Community links"
            >
              <a
                href="https://forum.openpecha.org"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-indigo-300 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors text-center inline-block text-indigo-700"
                aria-describedby="forum-description"
              >
                Join Discussion
              </a>
              <span id="forum-description" className="sr-only">
                Opens OpenPecha forum in a new tab for community discussions
              </span>
            </nav>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default VisionSection;
