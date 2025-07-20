import { Card, CardContent } from "@/components/ui/card";
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
    >
      {/* Seamless top transition from Tools */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-purple-100/40 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Vision & Mission
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Bridging ancient wisdom with modern technology to create a more
            mindful and compassionate digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {visionPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-gentle transition-all duration-300 border-border/30"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-wisdom rounded-lg shadow-gentle shrink-0">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-sacred p-8 rounded-2xl shadow-elevated max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold  mb-4">Join Our Community</h3>
            <p className="text-gray-600 mb-4">
              Pecha.tools is a specialized platform designed for scholars,
              researchers, and practitioners working with Bhuddhist manuscripts.
              Our suite of tools helps streamline the process of translating,
              transcribing, and proofreading these valuable cultural artifacts.
            </p>
            <p className="text-gray-600">
              With a centralized login system, users can seamlessly access all
              tools and maintain consistency across their projects. Our modern,
              intuitive interface ensures that users can focus on their work
              rather than navigating complex software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <button className="bg-sacred-white px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-gentle">
                Subscribe to Updates
              </button>
              <button className="border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Join Discussion
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
