import Link from "next/link";
import AdminTopBar from "@/components/admin/AdminTopBar";
import PropertyList from "@/components/admin/PropertyList";
import { getProperties } from "@/lib/store";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const properties = await getProperties();
  const sorted = [...properties].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      <AdminTopBar title="Panel Selveo" />
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-3xl text-charcoal mb-1">Propiedades</h1>
            <p className="text-charcoal-light text-sm">
              {properties.length} propiedad{properties.length !== 1 ? "es" : ""} publicada
              {properties.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/panel-selveo/nueva"
            className="bg-charcoal text-cream px-6 py-3 text-sm tracking-widest2 uppercase hover:bg-gold-dark transition-colors duration-300"
          >
            + Agregar propiedad
          </Link>
        </div>

        <PropertyList initialProperties={sorted} />
      </main>
    </>
  );
}
