import AdminTopBar from "@/components/admin/AdminTopBar";
import DevelopmentForm from "@/components/admin/DevelopmentForm";

export default function NewDevelopmentPage() {
  return (
    <>
      <AdminTopBar title="Nuevo desarrollo" />
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <h1 className="font-serif text-3xl text-charcoal mb-10">Agregar desarrollo</h1>
        <DevelopmentForm />
      </main>
    </>
  );
}
