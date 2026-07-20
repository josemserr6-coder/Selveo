import AdminTopBar from "@/components/admin/AdminTopBar";
import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <>
      <AdminTopBar title="Nueva propiedad" />
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <h1 className="font-serif text-3xl text-charcoal mb-10">Agregar propiedad</h1>
        <PropertyForm />
      </main>
    </>
  );
}
