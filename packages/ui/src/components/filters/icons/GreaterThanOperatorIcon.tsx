import React from 'react';
import { IIconProps } from './type';

const GreaterThanOperatorIcon = ({ className = '', width = '16', height = '16' }: IIconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10.2747 7.97525L3.33337 5.71392V3.33325L12.6667 7.03859V8.96125L3.33337 12.6666V10.2859L10.2747 7.97525Z"
            fill="#6E7190"
        />
    </svg>
);
export default GreaterThanOperatorIcon;
