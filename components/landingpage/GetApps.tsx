const GetApps = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Notlyfy on All Your Devices
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Access your notes anytime, anywhere. Our apps are designed to
              provide a seamless experience across all your devices.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="flex items-center justify-center bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.21 2.33-.91 3.57-.84 1.5.12 2.63.64 3.4 1.64-3.12 1.93-2.63 5.75.24 7.23-.62 1.79-1.42 3.58-2.29 4.14ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.26 2.01-1.76 4.07-3.74 4.25Z" />
                </svg>
                App Store
              </button>

              <button className="flex items-center justify-center bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12l-10.183 10.186c-2.05-2.048-2.05-5.372 0-7.42l.004-.004 7.416-7.416c.63-.63.184-1.707-.707-1.707-.297 0-.583.118-.793.328l-6.363 6.364a.996.996 0 0 1-1.414 0 .996.996 0 0 1 0-1.414l6.364-6.364a2.969 2.969 0 0 1 2.121-.879c1.615 0 2.953 1.301 2.121 3.121l-7.412 7.412c-2.05 2.049-5.372 2.049-7.421 0l10.183-10.185L3.609 1.814Z" />
                </svg>
                Google Play
              </button>
            </div>

            <div className="mt-8">
              <p className="text-gray-400 mb-4">Also available on:</p>
              <div className="flex space-x-6">
                <button className="text-white hover:text-indigo-400 transition-colors">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.5 17c0 .275-.225.5-.5.5H4c-.275 0-.5-.225-.5-.5v-7c0-.275.225-.5.5-.5h16c.275 0 .5.225.5.5v7Zm-2-9h-13v1h13v-1Zm-2-2h-9v1h9V6Zm4-3.5v2c0 .275-.225.5-.5.5h-15c-.275 0-.5-.225-.5-.5v-2c0-.275.225-.5.5-.5h15c.275 0 .5.225.5.5Z" />
                  </svg>
                </button>
                <button className="text-white hover:text-indigo-400 transition-colors">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21 2H3c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 16H5V8h14v10z" />
                  </svg>
                </button>
                <button className="text-white hover:text-indigo-400 transition-colors">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 md:pl-12">
            <div className="relative">
              {/* Placeholder for device mockups */}
              <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden aspect-[4/3] flex items-center justify-center">
                <div className="text-gray-500">Device Mockups</div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-600/20 rounded-full -z-10 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-500/20 rounded-full -z-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetApps;
