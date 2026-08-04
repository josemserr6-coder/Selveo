import Link from "next/link";
import AdminTopBar from "@/components/admin/AdminTopBar";
import PropertyList from "@/components/admin/PropertyList";
import DevelopmentList from "@/components/admin/DevelopmentList";
import { getProperties, getDevelopments } from "@/lib/store";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [properties, developments] = await Promise.all([
    getProperties(),
    getDevelopments(),
  ]);

  const sortedProperties = [...properties].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const sortedDevelopments = [...developments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const fractionalDevelopments = sortedDevelopments.filter(
    (d) => d.modality === "fractional" || d.modality === "both"
  );

  return (
    <>
      <AdminTopBar title="Panel Selveo" />
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-12 space-y-20">
        <section>
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

          <PropertyList initialProperties={sortedProperties} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl text-charcoal mb-1">Desarrollos</h2>
              <p className="text-charcoal-light text-sm">
                {developments.length} desarrollo{developments.length !== 1 ? "s" : ""} publicado
                {developments.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Link
              href="/panel-selveo/desarrollos/nueva"
              className="bg-charcoal text-cream px-6 py-3 text-sm tracking-widest2 uppercase hover:bg-gold-dark transition-colors duration-300"
            >
              + Agregar desarrollo
            </Link>
          </div>

          <DevelopmentList initialDevelopments={sortedDevelopments} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl text-charcoal mb-1">Fractionals</h2>
              <p className="text-charcoal-light text-sm">
                {fractionalDevelopments.length} desarrollo
                {fractionalDevelopments.length !== 1 ? "s" : ""} en modalidad Fractional
              </p>
            </div>
            <Link
              href="/panel-selveo/desarrollos/nueva?modality=fractional"
              className="bg-charcoal text-cream px-6 py-3 text-sm tracking-widest2 uppercase hover:bg-gold-dark transition-colors duration-300"
            >
              + Agregar fractional
            </Link>
          </div>

          {fractionalDevelopments.length === 0 ? (
            <p className="text-charcoal-light py-16 text-center border-t border-b border-gold/15">
              Aún no hay desarrollos en modalidad Fractional. Los que marques como
              &quot;Fractional&quot; o &quot;Full Ownership &amp; Fractional&quot; aparecerán aquí.
            </p>
          ) : (
            <DevelopmentList initialDevelopments={fractionalDevelopments} />
          )}
        </section>
      </main>
    </>
  );
}
