import AdminTopBar from "@/components/admin/AdminTopBar";
import DevelopmentForm from "@/components/admin/DevelopmentForm";

export default async function NewDevelopmentPage({ searchParams }) {
  const params = await searchParams;
  const initialModality = params?.modality === "fractional" ? "fractional" : null;

  return (
    <>
      <AdminTopBar title={initialModality ? "Nuevo fractional" : "Nuevo desarrollo"} />
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <h1 className="font-serif text-3xl text-charcoal mb-10">
          {initialModality ? "Agregar fractional" : "Agregar desarrollo"}
        </h1>
        <DevelopmentForm initialModality={initialModality} />
      </main>
    </>
  );
}
