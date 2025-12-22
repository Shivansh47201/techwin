import React from "react";
import Image from "next/image";

type IntroData = {
  title?: string;
  subtitle?: string;
  leadText?: string;
  image?: string;
  sections?: Array<{ heading: string; content: string }>;
  quote?: string;
};

type Props = {
  data?: IntroData;
  headingLevel?: string;
};

const TechwinIntro = ({ data, headingLevel = 'h2' }: Props) => {
  // Fallback to default values if data not provided
  const title = data?.title || "Welcome to Techwin";
  const subtitle = data?.subtitle || "A Leader in High-Performance Fiber Laser Technology";
  const leadText = data?.leadText || "As a high-tech enterprise, Techwin is dedicated to the research, development, manufacturing, and global supply of high-performance fiber lasers, fiber amplifiers, and laser sources for both scientific and industrial applications.";
  const image = data?.image || "/images/innovation.jpg";
  const sections = data?.sections || [
    {
      heading: "Our Expertise",
      content: "With over 20 years of continuous innovation in single-frequency fiber laser materials and devices, Techwin has become a leading company in the field of single-frequency fiber laser technology."
    },
    {
      heading: "Global Reach and Application",
      content: "Our products have been widely applied in fields such as high-energy laser systems, fiber optic sensing, quantum technology, gravitational wave detection, satellite laser communication, and LiDAR."
    }
  ];
  const quote = data?.quote || "Our mission is to create world-class laser products, empower scientific innovation, and become a global leader in high-performance fiber laser technology.";

  return (
    <div className="bg-white text-gray-800 py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          {React.createElement(
            headingLevel,
            {
              className: "text-4xl font-extrabold text-[#3087C0] sm:text-5xl animate-reveal",
              style: { animationDelay: '150ms' }
            },
            title
          )}
          <p 
            className="mt-4 text-xl text-gray-600 animate-reveal"
            style={{ animationDelay: '300ms' }}
          >
            {subtitle}
          </p>
          <div 
            className="w-24 h-1 bg-[#3087C0] mx-auto mt-6 animate-reveal"
            style={{ animationDelay: '450ms' }}
          ></div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p 
            className="lead animate-reveal"
            style={{ animationDelay: '600ms' }}
          >
            {leadText}
          </p>
          
          <div 
            className="my-12 rounded-lg overflow-hidden shadow-2xl animate-reveal"
            style={{ animationDelay: '750ms' }}
          >
            <Image 
              src={image} 
              alt="Innovation at Techwin"
              width={1200}
              height={600}
              className="object-cover"
            />
          </div>

          <div 
            className="animate-reveal"
            style={{ animationDelay: '900ms' }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Expertise</h3>
            <p>
              With over 20 years of continuous innovation in single-frequency
              fiber laser materials and devices, Techwin has become a leading
              company in the field of single-frequency fiber laser technology.
              Our main product lines cover single-frequency fiber lasers, pulsed
              fiber lasers, high-power fiber amplifiers, and frequency-stabilized
              laser sources, operating in wavelength bands of 1.0 µm, 1.5 µm,
              and 2.0 µm.
            </p>
          </div>

          <div 
            className="animate-reveal"
            style={{ animationDelay: '1050ms' }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Global Reach and Application</h3>
            <p>
              Our products have been widely applied in fields such as high-energy
              laser systems, fiber optic sensing, quantum technology,
              gravitational wave detection, satellite laser communication, and
              LiDAR. Today, Techwin’s products are exported to more than 30 countries and regions.
            </p>
          </div>

          <blockquote 
            className="mt-12 p-8 bg-gray-50 border-l-4 border-[#3087C0] text-center animate-reveal"
            style={{ animationDelay: '1200ms' }}
          >
            <p className="text-2xl font-semibold text-gray-900 italic">
              &ldquo;Our mission is to create world-class laser products, empower
              scientific innovation, and become a global leader in
              high-performance fiber laser technology.&rdquo;
            </p>
          </blockquote>
          
          <div 
            className="animate-reveal"
            style={{ animationDelay: '1350ms' }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">More Than a Manufacturer</h3>
            <p>
              At Techwin, we do not see ourselves merely as a laser manufacturer
              but as a solution provider capable of meeting diverse application
              needs. Guided by the philosophy of &ldquo;Technology Innovation and
              Shared Service,&rdquo; we continuously integrate cutting-edge
              technologies and implement strict quality management systems to pursue the highest global standards.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TechwinIntro;
