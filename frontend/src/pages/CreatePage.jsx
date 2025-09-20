import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <Link 
            to={"/"} 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-8 group"
          >
            <ArrowLeftIcon className="size-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Notes</span>
          </Link>

          {/* Main form card */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Create New Note</h1>
              <p className="text-blue-100 mt-2">Share your thoughts and ideas</p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a compelling title..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-400 text-slate-700"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content textarea */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Content
                  </label>
                  <textarea
                    placeholder="Write your note here... Share your thoughts, ideas, or anything that's on your mind."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-400 text-slate-700 resize-none"
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-4">
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeOpacity="0.3"/>
                          <path fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8H4z"/>
                        </svg>
                        Creating...
                      </span>
                    ) : (
                      "Create Note"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;