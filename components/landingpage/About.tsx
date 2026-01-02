const About = () => {
  return (
    <section className="w-full py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Get To Know More
              <br />
              About Notifly
            </h2>
          </div>
          <div>
            <p className="text-gray-600 text-base md:text-lg">
              Notifly was founded by classroom educators with a simple but
              powerful mission: to empower teachers and school staff to
              communicate instantly, streamline time consuming tasks, and build
              stronger connections with families. We started Notifly after
              seeing how often important updates were delayed, lost, or
              overlooked. Teachers and staff needed a faster, simpler way to
              reach families and support each other — a better way. Notifly
              gives educators and staff the tools to act quickly, reach families
              more effectively, and foster a culture of real-time support.
              Because when communication moves fast, learning and opportunity
              move even faster.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Stat Card */}
          <div className="rounded-xl bg-[#b4f0e0] p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Built for Educators
            </h3>
            <p className="text-sm text-gray-700">
              Notify was designed side-by-side with real teachers to solve real
              classroom communication challenges. Every feature exists because a
              teacher asked for it.
            </p>
          </div>

          {/* Second Stat Card */}
          <div className="rounded-xl bg-[#e0d9ff] p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Redefining School Communication
            </h3>
            <p className="text-sm text-gray-700">
              Notify isn’t just another messaging app. It’s a complete rethink
              of how teachers, students, and families stay in sync every day.
            </p>
          </div>

          {/* Third Stat Card */}
          <div className="rounded-xl bg-[#b4f0e0] p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              100% Time Saved Each Day
            </h3>
            <p className="text-sm text-gray-700">
              Send one message to every parent at once, no copy-pasting. Notify
              lets teachers reclaim time they used to lose typing the same
              messages again and again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
