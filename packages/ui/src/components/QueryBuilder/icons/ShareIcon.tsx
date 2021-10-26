import React from 'react';
import IIconProps from './type';

const ShareIcon = ({ className = '' }: IIconProps) => (
    <svg className={`${className}`} fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.75 10.375C11.3047 10.375 10.8937 10.5312 10.5719 10.7922L7.33437 8.45C7.38859 8.15245 7.38859 7.84755 7.33437 7.55L10.5719 5.20781C10.8937 5.46875 11.3047 5.625 11.75 5.625C12.7844 5.625 13.625 4.78437 13.625 3.75C13.625 2.71563 12.7844 1.875 11.75 1.875C10.7156 1.875 9.875 2.71563 9.875 3.75C9.875 3.93125 9.9 4.10469 9.94844 4.27031L6.87344 6.49687C6.41719 5.89219 5.69219 5.5 4.875 5.5C3.49375 5.5 2.375 6.61875 2.375 8C2.375 9.38125 3.49375 10.5 4.875 10.5C5.69219 10.5 6.41719 10.1078 6.87344 9.50313L9.94844 11.7297C9.9 11.8953 9.875 12.0703 9.875 12.25C9.875 13.2844 10.7156 14.125 11.75 14.125C12.7844 14.125 13.625 13.2844 13.625 12.25C13.625 11.2156 12.7844 10.375 11.75 10.375ZM11.75 2.9375C12.1984 2.9375 12.5625 3.30156 12.5625 3.75C12.5625 4.19844 12.1984 4.5625 11.75 4.5625C11.3016 4.5625 10.9375 4.19844 10.9375 3.75C10.9375 3.30156 11.3016 2.9375 11.75 2.9375ZM4.875 9.375C4.11719 9.375 3.5 8.75781 3.5 8C3.5 7.24219 4.11719 6.625 4.875 6.625C5.63281 6.625 6.25 7.24219 6.25 8C6.25 8.75781 5.63281 9.375 4.875 9.375ZM11.75 13.0625C11.3016 13.0625 10.9375 12.6984 10.9375 12.25C10.9375 11.8016 11.3016 11.4375 11.75 11.4375C12.1984 11.4375 12.5625 11.8016 12.5625 12.25C12.5625 12.6984 12.1984 13.0625 11.75 13.0625Z" />
    </svg>
);
export default ShareIcon;