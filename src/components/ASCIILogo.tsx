interface ASCIILogoProps {
  className?: string;
}

export default function ASCIILogo({ className = '' }: ASCIILogoProps) {
  return (
    <div className={`ascii-logo ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 130"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        aria-label="THE UFO ARCHIVE"
        className="glow-cyan"
      >
        <style>
          {`
            .ascii-art {
              font-family: 'Courier New', 'Consolas', monospace;
              font-size: 18px;
              font-weight: bold;
              white-space: pre;
              fill: var(--cyber-blue);
            }
            @media (max-width: 768px) {
              .ascii-art {
                font-size: 10px;
              }
            }
            @media (max-width: 480px) {
              .ascii-art {
                font-size: 6px;
              }
            }
          `}
        </style>
        <text x="0" y="0" className="ascii-art">
          <tspan x="0" dy="1.2em">████████╗██╗  ██╗███████╗    ██╗   ██╗███████╗ ██████╗      █████╗ ██████╗  ██████╗██╗  ██╗██╗██╗   ██╗███████╗</tspan>
          <tspan x="0" dy="1.2em">╚══██╔══╝██║  ██║██╔════╝    ██║   ██║██╔════╝██╔═══██╗    ██╔══██╗██╔══██╗██╔════╝██║  ██║██║██║   ██║██╔════╝</tspan>
          <tspan x="0" dy="1.2em">   ██║   ███████║█████╗      ██║   ██║█████╗  ██║   ██║    ███████║██████╔╝██║     ███████║██║██║   ██║█████╗  </tspan>
          <tspan x="0" dy="1.2em">   ██║   ██╔══██║██╔══╝      ██║   ██║██╔══╝  ██║   ██║    ██╔══██║██╔══██╗██║     ██╔══██║██║╚██╗ ██╔╝██╔══╝  </tspan>
          <tspan x="0" dy="1.2em">   ██║   ██║  ██║███████╗    ╚██████╔╝██║     ╚██████╔╝    ██║  ██║██║  ██║╚██████╗██║  ██║██║ ╚████╔╝ ███████╗</tspan>
          <tspan x="0" dy="1.2em">   ╚═╝   ╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚═╝      ╚═════╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝</tspan>
        </text>
      </svg>
    </div>
  );
}
