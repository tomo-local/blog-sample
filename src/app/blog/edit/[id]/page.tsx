"use client";

import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import { Post } from "@prisma/client";

const editPost = async (
  id: string,
  title: string | undefined,
  description: string | undefined
) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
  return res.json();
};

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.result;
}

export default function EditBlog() {
  const params = useParams();
  const id: string = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const post = await getPost(id as string);

      if (!post) {
        alert("投稿が見つかりません");
        router.replace("/");
      }

      setTitle(post.title);
      setDescription(post.description);
    })();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await editPost(params.id as string, title, description);

      if (!res.success) {
        alert("編集に失敗しました");
        return;
      }

      router.replace(`/blog/${res.result.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Blog App</h1>
          <p className="text-gray-300">あなたの思いを言葉にしよう</p>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <PencilSquareIcon className="w-6 h-6 text-indigo-400" />
          編集する
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="タイトルを入力してください"
              className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white placeholder-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <textarea
              placeholder="本文を入力してください"
              className="w-full px-4 py-2 border border-gray-600 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white placeholder-gray-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2"
          >
            更新する
          </button>
        </form>
      </div>
    </main>
  );
}
