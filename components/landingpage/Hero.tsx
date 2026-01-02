const Hero = () => {
  return (
    <section
      id="home"
      className="pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-indigo-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Learn Better with <span className="text-indigo-600">Notlyfy</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              The ultimate note-taking app designed for students and teachers.
              Organize, collaborate, and excel in your studies.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-outline">Learn More</button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              {/* Placeholder for hero image */}
              <div className="bg-gray-200 rounded-lg shadow-xl aspect-video flex items-center justify-center">
                <span className="text-gray-500">Hero Image</span>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500/20 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
