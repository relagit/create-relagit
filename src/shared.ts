export type Context = {
	readonly cwd: string;
	verbose?: boolean;
	help?: boolean;
	skipIntro?: boolean;
	opt: Partial<{
		name: string;
		typescript: boolean;
		location: string;
		template: 'basic' | 'native' | 'advanced';
	}>;
	readonly username: string;
};
