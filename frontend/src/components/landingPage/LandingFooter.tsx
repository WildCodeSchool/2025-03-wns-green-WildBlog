export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-10">
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 px-6"
      >
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-lg font-bold text-[#0D0C48]">
            WBFactory
          </h2>
          <a
            href="#"
            className="text-sm text-gray-800 font-medium hover:underline"
          >
            Démarrer mon blog
          </a>
        </div>

        {/* FIXME: newsletter à faire */}
        {/*
        <div className="text-center md:text-right">
          <p className="text-sm font-semibold mb-2">
            Subscribe
          </p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-400 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="border border-gray-400 rounded-md px-5 py-2 text-sm font-medium hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
        */}
        {/* FIXME: newsletter à faire */}
      </div>
    </footer>
  );
}
