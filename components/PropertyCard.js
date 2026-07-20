import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/constants";
import { BedIcon, BathIcon, AreaIcon, MapPinIcon } from "@/components/icons";

export default function PropertyCard({ property }) {
  const cover = property.images?.[0];

  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className="group block bg-cream-light border border-gold/10 hover:border-gold/40 transition-colors duration-500 ease-premium"
    >
      <div className="relative img-zoom aspect-[4/3] overflow-hidden">
        {cover && (
          <Image
            src={cover}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        <span className="absolute top-4 left-4 bg-cream/95 text-charcoal text-[11px] tracking-widest2 uppercase px-3 py-1.5">
          {property.type === "venta" ? "Venta" : "Renta"}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1.5 text-gold-dark text-xs tracking-wide uppercase mb-2">
          <MapPinIcon className="w-3.5 h-3.5" />
          {property.zone}
        </div>

        <h3 className="font-serif text-xl text-charcoal leading-snug mb-2 group-hover:text-gold-dark transition-colors duration-300">
          {property.title}
        </h3>

        <p className="font-sans text-lg text-charcoal mb-4">
          {formatPrice(property.price, property.currency)}
          {property.type === "renta" && (
            <span className="text-sm text-charcoal-light"> /mes</span>
          )}
        </p>

        <div className="flex items-center gap-5 text-charcoal-light text-sm border-t border-gold/15 pt-4">
          <span className="flex items-center gap-1.5">
            <BedIcon className="w-4 h-4" />
            {property.bedrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <BathIcon className="w-4 h-4" />
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <AreaIcon className="w-4 h-4" />
            {property.area} m²
          </span>
        </div>
      </div>
    </Link>
  );
}
