export default function DetailBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  if (!value) return null;
  return (
    <div>
      <p className="mb-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-skala-accent">
        {label}
      </p>
      <p className="m-0 text-sm leading-7 text-skala-muted">{value}</p>
    </div>
  );
}
