"use client";

import { useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  link?: string;
  demo?: string;
};

type Tip = {
  title?: string;
  description?: string;
};

export default function SearchClient({
  projects,
  tips,
}: {
  projects: Project[];
  tips: Tip[];
}) {
  const [q, setQ] = useState("");
  const query = q.toLowerCase();

  const projectHits = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
  );

  const tipHits = tips.filter(
    (t) =>
      (t.title || "").toLowerCase().includes(query) ||
      (t.description || "").toLowerCase().includes(query)
  );

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-6">
        <label htmlFor="q" className="sr-only">
          Search
        </label>
        <input
          id="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects and tips..."
          className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3"
        />
      </div>

      {q && (
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold mb-3">Projects</h2>
            {projectHits.length ? (
              <ul className="list-disc pl-6">
                {projectHits.map((p) => (
                  <li key={p.id}>
                    <a
                      className="text-indigo-600 hover:underline"
                      href={p.link || p.demo}
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No matching projects.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">CSS Tips</h2>
            {tipHits.length ? (
              <ul className="list-disc pl-6">
                {tipHits.map((t, i) => (
                  <li key={i}>{t.title}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No matching CSS tips.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}


