import { createClient } from "@/lib/supabase/server";

export default async function SupabaseTestPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-medium">
          Supabase Connection Test
        </h1>

        {error ? (
          <pre className="mt-8 overflow-auto bg-red-50 p-6 text-sm text-red-700">
            {JSON.stringify(error, null, 2)}
          </pre>
        ) : (
          <pre className="mt-8 overflow-auto bg-black/5 p-6 text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}