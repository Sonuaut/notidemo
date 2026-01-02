import Navbar from "@/components/landingpage/Navbar";
import Footer from "@/components/landingpage/Footer";
import ContactForm from "@/components/landingpage/ContactForm";

export default async function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 sansation-font">
      <div className="max-w-[90rem] mx-auto">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Section - Contact Information */}
          <div className="bg-white rounded-lg p-8 lg:p-10 shadow-sm">
            {/* Testimonial Quote */}
            <div className="mb-8">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s"
              </p>
              <div>
                <h3 className="font-bold text-gray-900">Joe Biden</h3>
                <p className="text-sm text-gray-600">Chief of Communication and Engagement</p>
                <p className="text-sm text-gray-600">Mentoring Peninsula USA</p>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {/* Chat to us */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Chat to us</h4>
                  <p className="text-sm text-gray-600 mb-1">Our friendly team is here to help.</p>
                  <a
                    href="mailto:sales@mynotifly.com"
                    className="text-sm text-blue-600 hover:underline bg-blue-100 px-2 py-1 rounded"
                  >
                    sales@mynotifly.com
                  </a>
                </div>
              </div>

              {/* Visit us */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Visit us</h4>
                  <p className="text-sm text-gray-600 mb-1">Come say hello at our office HQ.</p>
                  <p className="text-sm text-gray-700">100 Smith Street</p>
                  <p className="text-sm text-gray-700">Collingwood VIC 3066 AU</p>
                </div>
              </div>

              {/* Call us */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Call us</h4>
                  <p className="text-sm text-gray-600 mb-1">Mon–Fri from 8am to 5pm</p>
                  <p className="text-sm text-gray-700">+1 (555) 000-0000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <ContactForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}
