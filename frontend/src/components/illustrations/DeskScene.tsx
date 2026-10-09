type Props = {
  className?: string;
};

const DeskScene = ({ className }: Props) => {
  return (
    <svg
      viewBox="0 0 480 300"
      role="img"
      aria-label="ターミナルが映ったモニターと、机の向こうからのぞく猫2匹"
      className={`[&_*]:[vector-effect:non-scaling-stroke] ${className ?? ""}`}
    >
      <g
        fill="none"
        stroke="#1f2026"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <rect x="170" y="40" width="280" height="196" rx="6" />
        <rect x="182" y="52" width="256" height="172" rx="2" fill="#1c2233" />
        <path d="M302 236 V292 M318 236 V292" />
        <path d="M262 299 H358" />
        <g stroke="none" fontSize="13" className="font-mono whitespace-pre">
          <text x="202" y="86" fill="#e8e3d6">
            <tspan fill="#ff8a7a">$</tspan> whoami
          </text>
          <text x="202" y="108" fill="#a9bdf0">
            otami / Web engineer
          </text>
          <text x="202" y="138" fill="#e8e3d6">
            <tspan fill="#ff8a7a">$</tspan> ls skills/
          </text>
          <text x="202" y="160" fill="#8fd6a8">
            Kotlin SpringBoot PHP
          </text>
          <text x="202" y="190" fill="#ff8a7a">
            $
          </text>
        </g>
        <g transform="translate(14 254) scale(1.1)">
          <path d="M9 24 L13 2 L29 15 M51 24 L47 2 L31 15 M14 18 L15.5 9 L22 14.5 M46 18 L44.5 9 L38 14.5" />
          <ellipse cx="30" cy="35" rx="22" ry="20" fill="#e9e6e2" />
          <circle cx="22" cy="32" r="1.8" fill="#1f2026" stroke="none" />
          <circle cx="38" cy="32" r="1.8" fill="#1f2026" stroke="none" />
          <path d="M28 40 L32 40 L30 42.4 Z" />
        </g>
        <g transform="translate(80 246) scale(1.23)">
          <path d="M5 26 L9 0 L28 14 M55 26 L51 0 L32 14" />
          <ellipse cx="30" cy="35" rx="22" ry="20" fill="#b3aaa3" />
          <path d="M24 18 L26 23 M30 17 L30 23 M36 18 L34 23" />
          <circle cx="22" cy="32" r="1.8" fill="#1f2026" stroke="none" />
          <circle cx="38" cy="32" r="1.8" fill="#1f2026" stroke="none" />
          <path d="M28 40 L32 40 L30 42.4 Z" />
        </g>
      </g>
      <rect
        x="216"
        y="179"
        width="8"
        height="13"
        fill="#e8e3d6"
        className="motion-safe:animate-blink"
      />
    </svg>
  );
};
export default DeskScene;
