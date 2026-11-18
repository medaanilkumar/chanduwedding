// Animated SVG Mandala that rotates and pulses
export default function Mandala({ size = 400, className = '' }) {
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={className}
      style={{ pointerEvents: 'none' }}
    >
      <defs>
        <radialGradient id="mandalaGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#f1d98e" stopOpacity="0.6" />
          <stop offset="60%"  stopColor="#d9a84e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8a9a6b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer ring — slow rotation */}
      <g style={{ transformOrigin: '200px 200px', animation: 'mandala-spin-cw 40s linear infinite' }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 360;
          return (
            <g key={i} style={{ transform: `rotate(${angle}deg)`, transformOrigin: '200px 200px' }}>
              <ellipse cx="200" cy="70" rx="5" ry="18" fill="rgba(217,168,78,0.3)" />
              <circle cx="200" cy="52" r="3" fill="rgba(241,217,142,0.5)" />
            </g>
          );
        })}
      </g>

      {/* Mid ring — counter rotation */}
      <g style={{ transformOrigin: '200px 200px', animation: 'mandala-spin-ccw 25s linear infinite' }}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * 360;
          return (
            <g key={i} style={{ transform: `rotate(${angle}deg)`, transformOrigin: '200px 200px' }}>
              <path
                d="M200 100 C210 130 195 150 200 165 C205 150 190 130 200 100Z"
                fill="rgba(138,154,107,0.35)"
              />
            </g>
          );
        })}
      </g>

      {/* Inner geometric rings */}
      <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(217,168,78,0.12)" strokeWidth="1" />
      <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(217,168,78,0.18)" strokeWidth="0.8"
        strokeDasharray="6 4" style={{ animation: 'mandala-spin-cw 20s linear infinite', transformOrigin: '200px 200px' }} />
      <circle cx="200" cy="200" r="70"  fill="none" stroke="rgba(138,154,107,0.2)"  strokeWidth="1" />
      <circle cx="200" cy="200" r="45"  fill="none" stroke="rgba(217,168,78,0.25)"  strokeWidth="0.8"
        strokeDasharray="3 5" style={{ animation: 'mandala-spin-ccw 15s linear infinite', transformOrigin: '200px 200px' }} />

      {/* Inner petals */}
      <g style={{ transformOrigin: '200px 200px', animation: 'mandala-spin-cw 30s linear infinite' }}>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * 360;
          return (
            <g key={i} style={{ transform: `rotate(${angle}deg)`, transformOrigin: '200px 200px' }}>
              <ellipse cx="200" cy="155" rx="6" ry="20" fill="rgba(217,168,78,0.25)" />
            </g>
          );
        })}
      </g>

      {/* Center dot */}
      <circle cx="200" cy="200" r="6" fill="rgba(241,217,142,0.6)" />
      <circle cx="200" cy="200" r="3" fill="rgba(255,255,255,0.8)" />

      <style>{`
        @keyframes mandala-spin-cw  { to { transform: rotate(360deg); } }
        @keyframes mandala-spin-ccw { to { transform: rotate(-360deg); } }
      `}</style>
    </svg>
  );
}
