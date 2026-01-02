const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description:
        "Sign up for free and set up your profile with your educational interests and goals.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Take Smart Notes",
      description:
        "Use our AI-powered tools to capture, organize, and enhance your notes during lectures or study sessions.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Collaborate & Share",
      description:
        "Work together with classmates on group projects or share notes with friends to enhance learning.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Review & Excel",
      description:
        "Use our spaced repetition and quiz features to review material and prepare for exams effectively.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Getting started with Notlyfy is easy. Follow these simple steps to
            transform your learning experience.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>

            {/* Steps */}
            <div className="space-y-12 relative">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col md:flex-row ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  } items-center`}
                >
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <div
                      className={`md:max-w-md ${
                        index % 2 === 0
                          ? "md:ml-auto md:mr-8"
                          : "md:mr-auto md:ml-8"
                      }`}
                    >
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                          <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full mr-3 flex-shrink-0">
                            {step.id}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex justify-center">
                    <div className="relative">
                      <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md z-10 relative">
                        {step.icon}
                      </div>
                      {/* Connector to line (only visible on desktop) */}
                      <div className="hidden md:block absolute top-1/2 w-8 h-0.5 bg-gray-200 -translate-y-1/2 left-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
