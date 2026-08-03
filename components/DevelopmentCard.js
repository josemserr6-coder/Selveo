import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/constants";
import { BuildingIcon, MapPinIcon } from "@/components/icons";

const MAX_VISIBLE_AMENITIES = 3;

export default function DevelopmentCard({ development }) {
  const cover = development.images?.[0];
  const amenities = development.amenities || [];
  const visibleAmenities = amenities.slice(0, MAX_VISIBLE_AMENITIES);
  const extraCount = amenities.length - visibleAmenities.length;

  return (
    <Link
      href={`/desarrollos/${development.slug}`}
      className="group block bg-cream-light border border-gold/10 hover:border-gold/40 transition-colors duration-500 ease-premium"
    >
      <div className="relative img-zoom aspect-[4/3] overflow-hidden">
        {cover && (
          <Image
            src={cover}
            alt={`${development.name} — desarrollo en ${development.zone}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        <span className="absolute top-4 left-4 bg-cream/95 text-charcoal text-[11px] tracking-widest2 uppercase px-3 py-1.5">
          Desarrollo
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1.5 text-gold-dark text-xs tracking-wide uppercase mb-2">
          <MapPinIcon className="w-3.5 h-3.5" />
          {development.zone}
        </div>

        <h3 className="font-serif text-xl text-charcoal leading-snug mb-2 group-hover:text-gold-dark transition-colors duration-300">
          {development.name}
        </h3>

        <p className="font-sans text-lg text-charcoal mb-1">
          Desde {formatPrice(development.priceFrom, development.currency)}
        </p>
        <p className="text-charcoal-light text-sm mb-4">{development.unitTypes}</p>

        <div className="flex items-center gap-2 text-charcoal-light text-sm border-t border-gold/15 pt-4 mb-3">
          <BuildingIcon className="w-4 h-4" />
          {development.unitsCount} unidades
        </div>

        {visibleAmenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleAmenities.map((a) => (
              <span
                key={a}
                className="text-[10px] tracking-wide uppercase text-charcoal-light border border-gold/25 px-2 py-1"
              >
                {a}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="text-[10px] tracking-wide uppercase text-gold-dark px-2 py-1">
                +{extraCount} más
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
