"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  PencilSquareIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const createPost = async (
  title: string | undefined,
  description: string | undefined
) => {
  const res = await fetch("http://localhost:3000/api/blog", {
    method: "POST",
    body: JSON.stringify({ title, description }),
  });
  return res.json();
};

export default function AddBlog() {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await createPost(
        titleRef.current?.value,
        descriptionRef.current?.value
      );

      if (!res.success) {
        alert("投稿に失敗しました");
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

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <PencilSquareIcon className="w-6 h-6 text-indigo-400" />
            新規投稿を作成
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="タイトルを入力してください"
                className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white placeholder-gray-400"
                ref={titleRef}
                required
              />
            </div>
            <div>
              <textarea
                placeholder="本文を入力してください"
                className="w-full px-4 py-2 border border-gray-600 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white placeholder-gray-400"
                ref={descriptionRef}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition-colors flex items-center gap-2"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              投稿する
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
