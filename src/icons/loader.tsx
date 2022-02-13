import React from 'react';
import { TIconProps } from '../types/common';

const Loader: React.FC<TIconProps> = ({
  width = 86,
  height = 86
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    stroke="currentColor"
    viewBox="0 0 38 38"
  >
    <g
      fill="none"
      fillRule="evenodd"
      strokeWidth="2"
      transform="translate(1 1)"
    >
      <circle cx="18" cy="18" r="18" strokeOpacity="0.5" />
      <path d="M36 18c0-9.94-8.06-18-18-18">
        <animateTransform
          attributeName="transform"
          dur="1s"
          from="0 18 18"
          repeatCount="indefinite"
          to="360 18 18"
          type="rotate"
        />
      </path>
    </g>
  </svg>
);

export default Loader;
