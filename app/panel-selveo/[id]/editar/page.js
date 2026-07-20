import { notFound } from "next/navigation";
import AdminTopBar from "@/components/admin/AdminTopBar";
import PropertyForm from "@/components/admin/PropertyForm";
import { getPropertyById } from "@/lib/store";

export const revalidate = 0;

export default async function EditPropertyPage({ params }) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  return (
    <>
      <AdminTopBar title="Editar propiedad" />
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <h1 className="font-serif text-3xl text-charcoal mb-10">Editar propiedad</h1>
        <PropertyForm property={property} />
      </main>
    </>
  );
}
