import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex-1 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-4xl w-full mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Schedule Builder</h1>
        <Link 
          href="/setup" 
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Setup
        </Link>
      </div>
    </main>
  );
}
