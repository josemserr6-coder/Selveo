"use client";

const inputClass =
  "w-full border border-gold/25 bg-cream px-4 py-3 text-charcoal focus:outline-none focus:border-gold";
const labelClass = "block text-sm text-charcoal-light mb-2";
const langTagClass = "text-[10px] tracking-widest2 uppercase text-gold-dark mb-1.5 block";

export default function BilingualField({
  label,
  esValue,
  enValue,
  onEsChange,
  onEnChange,
  textarea = false,
  placeholder,
}) {
  const Field = textarea ? "textarea" : "input";
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className={langTagClass}>Español</span>
          <Field
            required
            rows={textarea ? 5 : undefined}
            value={esValue}
            onChange={(e) => onEsChange(e.target.value)}
            className={`${inputClass} ${textarea ? "resize-y" : ""}`}
            placeholder={placeholder?.es}
          />
        </div>
        <div>
          <span className={langTagClass}>English</span>
          <Field
            required
            rows={textarea ? 5 : undefined}
            value={enValue}
            onChange={(e) => onEnChange(e.target.value)}
            className={`${inputClass} ${textarea ? "resize-y" : ""}`}
            placeholder={placeholder?.en}
          />
        </div>
      </div>
    </div>
  );
}
