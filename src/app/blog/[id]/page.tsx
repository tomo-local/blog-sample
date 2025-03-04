import { CalendarIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
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

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.result;
}

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);

  return (
    <main className="min-h-screen p-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">{post.title}</h1>
            <div className="flex items-center gap-2 text-gray-400">
              <CalendarIcon className="w-5 h-5" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-8 whitespace-pre-wrap">{post.description}</p>
          <div className="flex justify-end">
            <a
              href={`/blog/edit/${post.id}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors flex items-center gap-2"
            >
              <PencilSquareIcon className="w-5 h-5" />
              編集する
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
