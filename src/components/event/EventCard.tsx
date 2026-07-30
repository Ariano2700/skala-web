import { FiCalendar, FiMapPin } from "react-icons/fi";
import { formatEventDate, getEventStatusLabel } from "../../data/event";
import type { Event } from "../../sanity/event/event-mapper";

interface Props {
  event: Event;
}

export default function EventCardReact({ event }: Props) {
  const status = getEventStatusLabel(event);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-skala-border bg-white/3 transition duration-300 hover:-translate-y-1 hover:border-skala-accent/40">
      <a
        href={`/cobertura-eventos/${event.slug}/`}
        title={event.title}
        aria-label={`Ver cobertura de ${event.title}`}
        className="block"
      >
        <div className="relative aspect-4/5 overflow-hidden">
          {event.hero.imageUrl && (
            <img
              src={event.hero.imageUrl}
              alt={event.hero.imageAlt || event.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#04142e]/95 via-[#04142e]/10 to-transparent" />

          <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/20 bg-[#04142e]/70 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.14em] text-skala-text backdrop-blur">
            {status}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="m-0 flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-skala-accent">
              <FiCalendar className="h-3.5 w-3.5" aria-hidden="true" />
              {formatEventDate(event)}
            </p>
            <h3 className="mt-2 font-display text-2xl font-black leading-[1.02] tracking-[-0.03em] text-skala-text">
              {event.title}
            </h3>
            {event.location?.venue && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-skala-muted">
                <FiMapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {event.location.venue}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {event.categories.slice(0, 3).map((cat) => (
                <span
                  key={cat.id || cat.slug}
                  className="rounded-full border border-skala-border px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-skala-muted"
                  style={
                    cat.accent ? { borderColor: `${cat.accent}55` } : undefined
                  }
                >
                  {cat.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}