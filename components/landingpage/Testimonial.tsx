'use client'
import { useState, useEffect } from "react";

// Testimonial type
interface TestimonialData {
  id: number;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

// Testimonials data - moved outside component to prevent recreation on each render
const testimonials: TestimonialData[][] = [
  // Slide 1
  [
    {
      id: 1,
      quote:
        "Notifly Is A Total Time-Saver. I Used To Spend 10-15 Minutes Writing Each Email — Now It Takes Me Less Than A Minute!",
      name: "Mr. Johnson",
      role: "8th Grade Teacher",
      initials: "MJ",
    },
    {
      id: 2,
      quote:
        "Parents Have Been More Responsive Since I Started Using Notifly. The Emails Are Clear, Consistent, And Professional.",
      name: "Ms. Patel",
      role: "Elementary School Teacher",
      initials: "MP",
    },
    {
      id: 3,
      quote:
        "The Templates Are Spot-On. I Don't Have To Think Twice About Wording Anymore — It's Just Click, Customize, And Send.",
      name: "Mrs. Clark",
      role: "High School Admin",
      initials: "MC",
    },
  ],
  // Slide 2
  [
    {
      id: 4,
      quote:
        "I've Cut My Communication Time In Half. Notifly Makes It So Easy To Keep Parents In The Loop About Everything.",
      name: "Mr. Rodriguez",
      role: "Middle School Teacher",
      initials: "MR",
    },
    {
      id: 5,
      quote:
        "The Customization Options Are Perfect. I Can Make Each Message Personal While Still Saving Time.",
      name: "Ms. Thompson",
      role: "Special Ed Coordinator",
      initials: "MT",
    },
    {
      id: 6,
      quote:
        "Our Whole School Has Adopted Notifly And Parent Engagement Has Increased By 40%. It's Been A Game-Changer.",
      name: "Dr. Wilson",
      role: "School Principal",
      initials: "DW",
    },
  ],
  // Slide 3
  [
    {
      id: 7,
      quote:
        "The Mobile App Is So Convenient. I Can Send Updates Right After Class While Everything Is Fresh In My Mind.",
      name: "Mrs. Garcia",
      role: "Art Teacher",
      initials: "MG",
    },
    {
      id: 8,
      quote:
        "Parents Appreciate The Consistency And Professionalism Of My Communications Now. Notifly Has Elevated My Teaching.",
      name: "Mr. Chen",
      role: "Science Teacher",
      initials: "MC",
    },
    {
      id: 9,
      quote:
        "The Time I Save With Notifly Goes Right Back Into Preparing Better Lessons. It's A Win For Everyone.",
      name: "Ms. Jackson",
      role: "English Teacher",
      initials: "MJ",
    },
  ],
];

// Star icon component
const StarIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="#FFD700"
    stroke="#FFD700"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

// Quote icon component
const QuoteIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#3B82F6"
    stroke="none"
    className="mb-2"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

// Avatar placeholder component
interface AvatarPlaceholderProps {
  initials: string;
}
const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({ initials }) => (
  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
    {initials}
  </div>
);

const Testimonial: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-advance slides
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full py-10 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 ">
            Notifly: The Perfect Companion for Your Communication Platforms
            </h2>
          </div>
          <div>
            <p className="text-gray-600 text-base md:text-lg">
            Notifly isn’t here to replace your existing communication platforms — it’s here to work alongside them.
While large platforms are great for managing events, mass updates, or formal announcements, sometimes you need something faster, lighter, and more direct.

            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 md:mb-12">
          <div>
            <h2 className="text-xl sm:text-3xl  font-bold text-gray-900">
            That’s where Notifly fills the gap and shines.
            </h2>
          </div>
          <div>
            <p className="text-gray-600 text-base md:text-lg">
       Imagine you quickly need to alert a parent that their child arrived tardy to class , or you need to inform a counselor about a student displaying uncharacteristic behavior this week. Maybe you’d like to ask your colleagues to join you in  recognizing a hard working scholar, or send a quick thank you to all the deans that keep the school building running smoothly. Rather than navigating a full platform or composing a formal post, Notifly lets you send immediate, personal messages in seconds — no extra steps, no delays.
When you need to send a quick update or reach out to a parent or staff member, Notifly gets it done in seconds.Use your major platforms for newsletters, calendars, and announcements — and use Notifly when speed, simplicity, and direct connection matter most.

At Notifly, we believe every message matters — especially in education, where communication can change a student’s path in a single moment.
Our mission is to empower educators with instant communication tools that drive faster staff responses, strengthen family outreach, and build real connections between schools and communities.

            </p>
          </div>
        </div>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full overflow-hidden">
            {/* Only render the current slide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials[currentSlide].map((testimonial) => (
                <div key={testimonial.id} className="px-2 md:px-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                    <div className="text-blue-500">
                      <QuoteIcon />
                    </div>
                    <div className="flex mb-4">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                    <p className="text-gray-700 mb-6 text-base md:text-lg">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center">
                      <AvatarPlaceholder initials={testimonial.initials} />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation Dots */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 mx-1 rounded-full ${
                  currentSlide === index ? "bg-gray-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation (Optional) */}
          {/* <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none hidden md:block"
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? testimonials.length - 1 : prev - 1
              )
            }
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none hidden md:block"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % testimonials.length)
            }
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
