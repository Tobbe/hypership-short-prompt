export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

          <h1 className="text-3xl font-bold text-gray-800">
            Your app is being built by AI
          </h1>

          <p className="text-lg text-gray-600">
            We're generating your app with AI. Get ready to take off with your
            new project!
          </p>

          <div className="mt-6 text-sm text-gray-500">
            Powered by Hypership + Next.js + TailwindCSS
          </div>
        </div>
      </div>
    </div>
  );
}
