import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaCompress,
  FaExpand,
  FaPause,
  FaPlay,
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

// Reproductor con controles propios (portafolio y coberturas de eventos).
//
// - Pausado: botón grande de play al centro.
// - Reproduciendo: el centro queda libre (sin botón de pausa encima del
//   video); tocar el video pausa. La barra inferior (play/pausa, progreso,
//   tiempo, volumen, pantalla completa) se oculta sola tras unos segundos
//   sin actividad y vuelve al mover el mouse o tocar.
// - En touch, el primer toque mientras se reproduce sólo muestra los
//   controles (no pausa por accidente al querer subir el volumen).
// - Sin librerías ni requestAnimationFrame: todo sale de los eventos
//   nativos del <video> (timeupdate dispara ~4 veces por segundo).

interface Props {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  /** Clases del <video> fuera de pantalla completa. */
  className?: string;
  /** Clases del contenedor (el que pasa a pantalla completa). */
  wrapperClassName?: string;
  /** Para que el padre pueda pausar el video (cambio de slide, cerrar). */
  videoRef?: (el: HTMLVideoElement | null) => void;
  label?: string;
}

const HIDE_DELAY = 2200;

const formatTime = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

type WebkitVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

export default function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  className = "h-full w-full object-contain",
  wrapperClassName = "",
  videoRef,
  label = "Video",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const vRef = useRef<HTMLVideoElement | null>(null);
  const hideTimer = useRef<number | undefined>(undefined);
  const pointerType = useRef<string>("mouse");

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  // Muestra los controles y programa su ocultamiento (sólo si reproduce).
  const poke = useCallback(() => {
    setControlsVisible(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (vRef.current && !vRef.current.paused) setControlsVisible(false);
    }, HIDE_DELAY);
  }, []);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  useEffect(() => {
    const onFsChange = () =>
      setIsFullscreen(
        document.fullscreenElement !== null &&
          document.fullscreenElement === wrapRef.current,
      );
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const setRefs = (el: HTMLVideoElement | null) => {
    vRef.current = el;
    videoRef?.(el);
  };

  const togglePlay = () => {
    const v = vRef.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  };

  const onSurfaceClick = () => {
    // En touch, si se está reproduciendo con los controles ocultos, el
    // toque sólo los muestra.
    if (pointerType.current !== "mouse" && playing && !controlsVisible) {
      poke();
      return;
    }
    togglePlay();
  };

  const toggleMute = () => {
    const v = vRef.current;
    if (!v) return;
    if (v.muted || v.volume === 0) {
      v.muted = false;
      if (v.volume === 0) v.volume = 1;
    } else {
      v.muted = true;
    }
  };

  const onVolumeInput = (value: number) => {
    const v = vRef.current;
    if (!v) return;
    v.volume = value;
    v.muted = value === 0;
  };

  const toggleFullscreen = () => {
    const wrap = wrapRef.current;
    const v = vRef.current as WebkitVideo | null;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
    } else if (wrap?.requestFullscreen) {
      void wrap.requestFullscreen().catch(() => {});
    } else {
      // iOS Safari: sólo permite pantalla completa nativa del <video>.
      v?.webkitEnterFullscreen?.();
    }
  };

  const showControls = !playing || controlsVisible;
  const effectiveVolume = muted ? 0 : volume;
  const VolumeIcon =
    effectiveVolume === 0
      ? FaVolumeMute
      : effectiveVolume < 0.5
        ? FaVolumeDown
        : FaVolumeUp;

  // Los controles no deben disparar el toggle de la superficie, ni el
  // swipe del carrusel, ni cerrar el overlay del lightbox.
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  const iconButton =
    "inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition hover:bg-white/15 hover:text-skala-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skala-accent/60";

  return (
    <div
      ref={wrapRef}
      className={`group/player relative overflow-hidden ${isFullscreen ? "flex h-full w-full items-center justify-center bg-black" : ""} ${playing && !controlsVisible ? "cursor-none" : ""} ${wrapperClassName}`}
      onPointerDown={(e) => {
        pointerType.current = e.pointerType;
      }}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse") poke();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse" && playing) setControlsVisible(false);
      }}
    >
      <video
        ref={setRefs}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        playsInline
        preload="metadata"
        aria-label={label}
        className={isFullscreen ? "h-full w-full object-contain" : className}
        onClick={onSurfaceClick}
        onPlay={() => {
          setPlaying(true);
          poke();
        }}
        onPause={() => {
          setPlaying(false);
          setControlsVisible(true);
        }}
        onEnded={() => {
          setPlaying(false);
          setControlsVisible(true);
        }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          setMuted(e.currentTarget.muted);
          setVolume(e.currentTarget.volume);
        }}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onVolumeChange={(e) => {
          setMuted(e.currentTarget.muted);
          setVolume(e.currentTarget.volume);
        }}
      />

      {!playing && (
        <button
          type="button"
          aria-label="Reproducir video"
          onClick={(e) => {
            stop(e);
            togglePlay();
          }}
          className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-skala-accent/90 text-skala-text-secondary shadow-[0_10px_30px_rgba(92,216,252,0.3)] transition hover:scale-105"
        >
          <FaPlay className="translate-x-0.5" />
        </button>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 z-10 flex items-center gap-1.5 bg-linear-to-t from-black/75 via-black/40 to-transparent px-3 pb-2.5 pt-8 transition-opacity duration-300 sm:gap-2 ${showControls ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={stop}
        onPointerDown={stop}
        onTouchStart={stop}
        onTouchEnd={stop}
      >
        <button
          type="button"
          aria-label={playing ? "Pausar video" : "Reproducir video"}
          onClick={togglePlay}
          className={iconButton}
        >
          {playing ? <FaPause /> : <FaPlay className="translate-x-px" />}
        </button>

        <input
          type="range"
          min={0}
          max={duration || 0}
          step="any"
          value={Math.min(time, duration || 0)}
          aria-label="Progreso del video"
          onChange={(e) => {
            const v = vRef.current;
            if (v) v.currentTime = Number(e.currentTarget.value);
            poke();
          }}
          className="h-1 min-w-0 flex-1 cursor-pointer accent-skala-accent"
        />

        <span className="shrink-0 font-mono text-[0.68rem] tabular-nums text-white/85">
          {formatTime(time)} / {formatTime(duration)}
        </span>

        <button
          type="button"
          aria-label={effectiveVolume === 0 ? "Activar sonido" : "Silenciar"}
          onClick={toggleMute}
          className={iconButton}
        >
          <VolumeIcon />
        </button>

        {/* El volumen fino sólo con mouse y con espacio (sm+): en touch lo
            manejan los botones físicos del teléfono (iOS ni siquiera permite
            cambiarlo por JS), y en anchos chicos le quitaría lugar a la
            barra de progreso. */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={effectiveVolume}
          aria-label="Volumen"
          onChange={(e) => {
            onVolumeInput(Number(e.currentTarget.value));
            poke();
          }}
          className="hidden h-1 w-20 shrink-0 cursor-pointer accent-skala-accent sm:pointer-fine:block"
        />

        <button
          type="button"
          aria-label={
            isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"
          }
          onClick={toggleFullscreen}
          className={iconButton}
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>
    </div>
  );
}
