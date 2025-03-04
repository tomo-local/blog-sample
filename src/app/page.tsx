import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import BlogList from "./components/BlogList";

async function createPost(title: string, description: string) {
  const res = await fetch("http://localhost:3000/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  const data = await res.json();

  return data;
}

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Blog App</h1>
          <p className="text-gray-300">あなたの思いを言葉にしよう</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-12 border border-gray-700">
          <Link href="/blog/create">
            <div className="flex items-center gap-2 ">
              <PencilSquareIcon className="w-6 h-6 text-indigo-400" />
              <span className="text-gray-300">新規投稿を作成</span>
            </div>
          </Link>
        </div>
        <BlogList />
      </div>
    </main>
  );
}
