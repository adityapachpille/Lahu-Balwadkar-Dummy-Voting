"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CountPage() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // load initial
    const load = async () => {
      const { data, error } = await supabase
        .from("votes")
        .select("count, created_at")
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (error) {
        console.error("Load count error:", error.message);
        return;
      }
      setCount(typeof data?.count === "number" ? data.count : 0);
    };
    load();

    // subscribe realtime
    const channel = supabase
      .channel("count-page")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "votes" },
        (payload) => {
          const newCount = (payload.new as any)?.count;
          if (typeof newCount === "number") setCount(newCount);
        }
      )
      .subscribe((status) => {
        if (status !== "SUBSCRIBED") console.warn("Realtime status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
  <main className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
  <div className="text-center max-w-xl w-full">
    <h1 className="text-center text-xl font-bold mb-2">
      <span className="text-red-600">अर्जुन सिंह गौड</span> यांना मिळालेली
    </h1>

    <h2 className="text-2xl font-bold mb-6">एकूण मते (Live)</h2>

    <div className="text-6xl font-extrabold text-indigo-600">
      {count === null ? "लोड करत आहे…" : count}
    </div>
  </div>
</main>

  );
}
