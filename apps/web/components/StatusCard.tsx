"use client";

import React from "react";

import { useNeihonHealth, useNeihonRoot } from "@/hooks/useNeihon";

export default function StatusCard() {
  const { data: health, error: healthErr, loading: healthLoading } = useNeihonHealth();
  const { data: root, error: rootErr, loading: rootLoading } = useNeihonRoot();

  return (
    <div className="p-6 rounded-2xl shadow-xl border border-gray-800 max-w-xl w-full bg-black/40 backdrop-blur">
      <h2 className="text-xl font-semibold mb-3">Neihon API</h2>
      <div className="text-sm text-gray-300 mb-4">
        Base URL:{" "}
        <code className="px-1 py-0.5 rounded bg-gray-900 border border-gray-800">
          {process.env.NEXT_PUBLIC_NEIHON_API_URL || "https://neihon-api.onrender.com"}
        </code>
      </div>

      <div className="space-y-3">
        <section>
          <h3 className="font-medium">/health</h3>
          {healthLoading && <p>Checking…</p>}
          {healthErr && <p className="text-red-400">Error: {healthErr}</p>}
          {health && (
            <pre className="bg-gray-900 p-3 rounded border border-gray-800 overflow-auto">
              {JSON.stringify(health, null, 2)}
            </pre>
          )}
        </section>

        <section>
          <h3 className="font-medium">/</h3>
          {rootLoading && <p>Loading…</p>}
          {rootErr && <p className="text-red-400">Error: {rootErr}</p>}
          {root && (
            <pre className="bg-gray-900 p-3 rounded border border-gray-800 overflow-auto">
              {JSON.stringify(root, null, 2)}
            </pre>
          )}
        </section>
      </div>
    </div>
  );
}
