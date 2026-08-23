export const dynamic = 'force-dynamic';

import { createClient } from "@/lib/supabase/server";
import AdminInquiriesTable from "@/components/admin/AdminInquiriesTable";

export default async function AdminInquiriesPage() {
  const supabase = await createClient();

  const { data: inquiries, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      <AdminInquiriesTable inquiries={inquiries || []} />
    </main>
  );
}