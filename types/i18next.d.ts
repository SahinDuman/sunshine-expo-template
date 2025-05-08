import en from '../translations/en.json';

declare module 'i18next' {
	export interface CustomTypeOptions {
		resources: typeof en;
	}
}
