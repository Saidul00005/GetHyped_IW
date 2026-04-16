"use client";

import { Pause, Play } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export type AdaptiveVideoHandle = {
  play: () => void;
  pause: () => void;
  reset: () => void;
};

type AdaptiveVideoProps = {
  src: string;
  label: string;
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
  desktopBehavior?: "autoplay" | "manual";
  loadRootMargin?: string;
  showTouchControl?: boolean;
};

const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const AdaptiveVideo = forwardRef<AdaptiveVideoHandle, AdaptiveVideoProps>(
  (
    {
      src,
      label,
      className,
      containerClassName,
      buttonClassName,
      desktopBehavior = "autoplay",
      loadRootMargin = "200px 0px",
      showTouchControl = true,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [hasResolvedDevice, setHasResolvedDevice] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [manualPlaying, setManualPlaying] = useState(false);

    const usesManualPlayback =
      !isDesktop || prefersReducedMotion || desktopBehavior === "manual";
    const showPlaybackToggle =
      showTouchControl && (!isDesktop || prefersReducedMotion);

    useEffect(() => {
      const desktopQuery = window.matchMedia(DESKTOP_QUERY);
      const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

      const updateDesktop = () => {
        setIsDesktop(desktopQuery.matches);
      };
      const updateMotionPreference = () => {
        setPrefersReducedMotion(motionQuery.matches);
      };

      updateDesktop();
      updateMotionPreference();
      setHasResolvedDevice(true);

      desktopQuery.addEventListener("change", updateDesktop);
      motionQuery.addEventListener("change", updateMotionPreference);

      return () => {
        desktopQuery.removeEventListener("change", updateDesktop);
        motionQuery.removeEventListener("change", updateMotionPreference);
      };
    }, []);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);

          if (entry.isIntersecting) {
            setShouldLoad(true);
          }
        },
        { rootMargin: loadRootMargin },
      );

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }, [loadRootMargin]);

    useEffect(() => {
      if (!hasResolvedDevice || isDesktop) return;

      setShouldLoad(true);
    }, [hasResolvedDevice, isDesktop]);

    useEffect(() => {
      if (!isInView && usesManualPlayback) {
        setManualPlaying(false);
      }
    }, [isInView, usesManualPlayback]);

    useEffect(() => {
      if (!shouldLoad || !videoRef.current) return;

      videoRef.current.load();
    }, [shouldLoad]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const shouldPlay =
        shouldLoad && isInView && (usesManualPlayback ? manualPlaying : true);

      if (shouldPlay) {
        void video.play().catch(() => {
          // Ignore autoplay interruptions from the browser.
        });
        return;
      }

      video.pause();
    }, [isInView, manualPlaying, shouldLoad, usesManualPlayback]);

    const play = useCallback(() => {
      setShouldLoad(true);
      setManualPlaying(true);
    }, []);

    const pause = useCallback(() => {
      setManualPlaying(false);
    }, []);

    const reset = useCallback(() => {
      const video = videoRef.current;

      setManualPlaying(false);

      if (!video) return;

      video.pause();
      video.currentTime = 0;
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        play,
        pause,
        reset,
      }),
      [pause, play, reset],
    );

    return (
      <div
        ref={containerRef}
        className={cn(
          "pointer-events-none relative h-full w-full",
          containerClassName,
        )}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload={shouldLoad ? "auto" : "none"}
          disablePictureInPicture
          aria-label={label}
          className={cn("h-full w-full object-cover", className)}
        >
          {shouldLoad ? <source src={src} type="video/mp4" /> : null}
        </video>

        {showPlaybackToggle ? (
          <button
            type="button"
            onClick={() => {
              if (manualPlaying) {
                pause();
                return;
              }

              play();
            }}
            className={cn(
              "pointer-events-auto absolute right-3 bottom-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/92 text-gh-black shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-transform duration-200 hover:scale-105",
              buttonClassName,
            )}
            aria-label={manualPlaying ? `Pause ${label}` : `Play ${label}`}
          >
            {manualPlaying ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4 translate-x-px" aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>
    );
  },
);

AdaptiveVideo.displayName = "AdaptiveVideo";

export default AdaptiveVideo;
