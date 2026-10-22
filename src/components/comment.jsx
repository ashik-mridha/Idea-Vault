"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaComment } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useApiQuery } from "@/hooks/useApiQuery";
import { apiFetch, readError } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { useAuth } from "@/providers/AuthProvider";
import Field from "./ui/Field";

const Comment = ({ ideaId }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const { data, loading, error: loadError, reload } = useApiQuery(`/comments/${ideaId}`);
  const comments = data ?? [];

  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
  const [posting, setPosting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const send = async (path, method, body, successMessage) => {
    try {
      const res = await apiFetch(path, { method, body: body && JSON.stringify(body) });
      if (!res.ok) throw new Error(await readError(res));
      toast.success(successMessage);
      reload();
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return setTextError("Write a comment first");
    if (value.length > 1000) return setTextError("Comment must be at most 1000 characters");
    setTextError("");
    setPosting(true);
    if (await send("/comment", "POST", { ideaId, text: value }, "Comment posted")) setText("");
    setPosting(false);
  };

  const handleUpdate = async (commentId) => {
    if (!editText.trim()) return toast.error("Comment cannot be empty");
    if (await send(`/comment/${commentId}`, "PUT", { text: editText.trim() }, "Comment updated")) {
      setEditingId(null);
    }
  };

  return (
    <section className="mt-12" aria-labelledby="comments-title">
      <h2 id="comments-title" className="mb-4 flex items-center gap-2 text-2xl font-bold">
        <FaComment aria-hidden="true" /> Comments ({comments.length})
      </h2>

      {user ? (
        <form onSubmit={handlePost} noValidate className="mb-6 space-y-3">
          <Field
            as="textarea"
            label="Share your feedback"
            name="comment"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you think of this idea?"
            error={textError}
          />
          <button type="submit" className="btn-primary" disabled={posting}>
            {posting ? "Posting..." : "Post comment"}
          </button>
        </form>
      ) : (
        <div className="card mb-6 p-5 text-center">
          <p className="mb-3 text-slate-600 dark:text-slate-300">Log in to share your feedback on this idea.</p>
          <Link href={`/login?redirect=${encodeURIComponent(pathname)}`} className="btn-primary">
            Login to comment
          </Link>
        </div>
      )}

      {loading ? (
        <p role="status" className="text-slate-500">
          Loading comments...
        </p>
      ) : loadError ? (
        <p className="text-slate-600 dark:text-slate-400">Comments could not be loaded.</p>
      ) : comments.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-400">No comments yet. Be the first to share feedback.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment._id} className="card p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold">{comment.userName}</p>
                <p className="shrink-0 text-xs text-slate-500 dark:text-slate-400">
                  {formatDateTime(comment.createdAt)}
                </p>
              </div>

              {editingId === comment._id ? (
                <div className="mt-2 space-y-2">
                  <Field
                    as="textarea"
                    label="Edit comment"
                    name={`edit-${comment._id}`}
                    rows={3}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button type="button" className="btn-primary" onClick={() => handleUpdate(comment._id)}>
                      Save
                    </button>
                    <button type="button" className="btn-outline" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-2 whitespace-pre-line text-slate-700 dark:text-slate-200">{comment.text}</p>
              )}

              {comment.isOwner && editingId !== comment._id && (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => {
                      setEditingId(comment._id);
                      setEditText(comment.text);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => send(`/comment/${comment._id}`, "DELETE", null, "Comment deleted")}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Comment;
