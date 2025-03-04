import { CalendarIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Post } from "@prisma/client";

function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    return new Date(date).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3000/api/blog");
  const data = await res.json();
  return data.result;
}

export default async function BlogList() {
  const posts = await getPosts();

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">最新の投稿</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-700 rounded-md p-4 hover:shadow-md transition-shadow bg-gray-700"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              ブログタイトル {post.title}
            </h3>
            <p className="text-gray-300 mb-2">{post.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {formatDate(post.createdAt)}
              </span>
              <a
                href={`/blog/${post.id}`}
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                続きを読む
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}