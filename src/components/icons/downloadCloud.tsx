'use client';
import React from 'react';
import { IconPropsNative } from './';
const DownloadCloud = ({ size = 24, color, style, ...props }: IconPropsNative) => {
	return (
		<svg
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			shapeRendering="geometricPrecision"
			viewBox="0 0 24 24"
			{...props}
			height={size}
			width={size}
			style={{ ...style, color: color }}
		>
			<path d="m8 17 4 4 4-4M12 12v9" />
			<path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
		</svg>
	);
};
export default DownloadCloud;
