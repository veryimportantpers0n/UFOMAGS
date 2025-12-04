interface ASCIILogoProps {
  className?: string;
}

export default function ASCIILogo({ className = '' }: ASCIILogoProps) {
  return (
    <div className={`ascii-logo ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2200 210"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        aria-label="ALIEN ADDICT ASCII Art Logo"
        className="glow-cyan"
      >
        <style>
          {`
            .ascii-art {
              font-family: 'Courier New', 'Consolas', monospace;
              font-size: 14px;
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
          <tspan x="0" dy="1.2em">                                                                                                                                                                                                  </tspan>
          <tspan x="0" dy="1.2em">         .8.          8 8888         8 8888 8 8888888888   b.             8                            .8.          8 888888888o.      8 888888888o.      8 8888     ,o888888o.8888888 8888888888 </tspan>
          <tspan x="0" dy="1.2em">        .888.         8 8888         8 8888 8 8888         888o.          8                           .888.         8 8888    `^888.   8 8888    `^888.   8 8888    8888     `88.    8 8888       </tspan>
          <tspan x="0" dy="1.2em">       :88888.        8 8888         8 8888 8 8888         Y88888o.       8                          :88888.        8 8888        `88. 8 8888        `88. 8 8888 ,8 8888       `8.   8 8888       </tspan>
          <tspan x="0" dy="1.2em">      . `88888.       8 8888         8 8888 8 8888         .`Y888888o.    8                         . `88888.       8 8888         `88 8 8888         `88 8 8888 88 8888             8 8888       </tspan>
          <tspan x="0" dy="1.2em">     .8. `88888.      8 8888         8 8888 8 888888888888 8o. `Y888888o. 8                        .8. `88888.      8 8888          88 8 8888          88 8 8888 88 8888             8 8888       </tspan>
          <tspan x="0" dy="1.2em">    .8`8. `88888.     8 8888         8 8888 8 8888         8`Y8o. `Y88888o8                       .8`8. `88888.     8 8888          88 8 8888          88 8 8888 88 8888             8 8888       </tspan>
          <tspan x="0" dy="1.2em">   .8' `8. `88888.    8 8888         8 8888 8 8888         8   `Y8o. `Y8888                      .8' `8. `88888.    8 8888         ,88 8 8888         ,88 8 8888 88 8888             8 8888       </tspan>
          <tspan x="0" dy="1.2em">  .8'   `8. `88888.   8 8888         8 8888 8 8888         8      `Y8o. `Y8                     .8'   `8. `88888.   8 8888        ,88' 8 8888        ,88' 8 8888 `8 8888       .8'   8 8888       </tspan>
          <tspan x="0" dy="1.2em"> .888888888. `88888.  8 8888         8 8888 8 8888         8         `Y8o.`                    .888888888. `88888.  8 8888    ,o88P'   8 8888    ,o88P'   8 8888    8888     ,88'    8 8888       </tspan>
          <tspan x="0" dy="1.2em">.8'       `8. `88888. 8 888888888888 8 8888 8 888888888888 8            `Yo                   .8'       `8. `88888. 8 888888888P'      8 888888888P'      8 8888     `8888888P'      8 8888       </tspan>
        </text>
      </svg>
    </div>
  );
}
