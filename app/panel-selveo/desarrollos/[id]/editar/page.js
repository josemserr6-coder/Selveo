import { notFound } from "next/navigation";
import AdminTopBar from "@/components/admin/AdminTopBar";
import DevelopmentForm from "@/components/admin/DevelopmentForm";
import { getDevelopmentById } from "@/lib/store";

export const revalidate = 0;

export default async function EditDevelopmentPage({ params }) {
  const { id } = await params;
  const development = await getDevelopmentById(id);
  if (!development) notFound();

  return (
    <>
      <AdminTopBar title="Editar desarrollo" />
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <h1 className="font-serif text-3xl text-charcoal mb-10">Editar desarrollo</h1>
        <DevelopmentForm development={development} />
      </main>
    </>
  );
}
