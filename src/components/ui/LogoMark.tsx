/** Emblème hexagonal inspiré du logo INT GLOBAL SERVICES. */
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M16 2.5 27.7 9.25v13.5L16 29.5 4.3 22.75V9.25L16 2.5Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M21.2 11.4 16 8.4l-5.2 3v9.2l5.2 3 5.2-3"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="round"
        style={{ stroke: "var(--accent)" }}
      />
    </svg>
  );
}
