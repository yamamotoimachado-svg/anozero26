// Use type safe message keys with `next-intl`
type Messages = typeof import('./i18n/pt.json');
declare interface IntlMessages extends Messages {}

// Asset module declarations for importing images (SVG, WebP, PNG, JPG, GIF)
declare module '*.svg' {
	import type { StaticImageData } from 'next/image';
	const content: string | StaticImageData;
	export default content;
}

declare module '*.webp' {
	import type { StaticImageData } from 'next/image';
	const content: string | StaticImageData;
	export default content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';