import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$images: process.env.NODE_ENV === 'development' ? '/images' : '/static/images',
			$audio: process.env.NODE_ENV === 'development' ? '/audio' : '/static/audio',
			$fonts: process.env.NODE_ENV === 'development' ? '/fonts' : '/static/fonts'
		}
	}
});
