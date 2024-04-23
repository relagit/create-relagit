const commonFiles = {
	'package.json': `{\n\t"name": {{OPT.NAME}},\n\t"version": "1.0.0",\n\t"description": "A workflow that does something.",\n\t"type": "module",\n\t"main": "index.js",\n\t"scripts":\n\t{\n\t\t"build": "vite build",\n\t\t"dev": "vite build -w"},\n\t"keywords": [],\n\t"author": {{OPT.AUTHOR}},\n\t"license": "ISC",\n\t"devDependencies": {}\n}`,
	'.gitignore': `node_modules/\ndist/\nout/\n`,
	'relagit.json': `{\n\t"plugin": "src/index.ts"\n}`
};

export const templates = {
	basic: {
		ts: {
			dependencies: [
				'@relagit/vite',
				'@types/primer__octicons',
				'relagit',
				'typescript',
				'vite'
			],
			files: {
				...commonFiles,
				'vite.config.ts': `import { defineConfig } from "@relagit/vite";\n\nexport default defineConfig();`,
				'src/index.ts': `/// <reference types="relagit" />\n/// <reference types="relagit/global" />\n\nimport { Workflow } from "relagit:actions";\n\nexport default new Workflow({\n\tname: {{OPT.NAME}},\n\tdescription: "A workflow that does something.",\n\thooks: {\n\t\tcommit(_, repo, details) {\n\t\t\tconsole.log("You just commit a change:", details.message)\n\t\t}\n\t},\n})`
			}
		},
		js: {
			dependencies: ['@relagit/vite', '@types/primer__octicons', 'relagit', 'vite'],
			files: {
				...commonFiles,
				'vite.config.js': `import { defineConfig } from "@relagit/vite";\n\nexport default defineConfig();`,
				'src/index.js': `import { Workflow } from "relagit:actions";\n\nexport default new Workflow({\n\tname: {{OPT.NAME}},\n\tdescription: "A workflow that does something.",\n\thooks: {\n\t\tcommit(_, repo, details) {\n\t\t\tconsole.log("You just commit a change:", details.message)\n\t\t}\n\t},\n})`
			}
		}
	},
	native: {
		ts: {
			dependencies: [
				'@relagit/vite',
				'@types/primer__octicons',
				'relagit',
				'typescript',
				'vite'
			],
			files: {
				...commonFiles,
				'vite.config.ts': `import { defineConfig } from "@relagit/vite";\n\nexport default defineConfig();`,
				'relagit.json': `{\n\t"plugin": "src/index.ts",\n\t"native": "src/native.ts"\n}`,
				'global.d.ts': `import * as _native from "./src/native";\n\ndeclare global {\n\tconst native: typeof _native;\n}`,
				'src/index.ts': `/// <reference types="relagit" />\n/// <reference types="relagit/global" />\n\nimport { Workflow } from "relagit:actions";\n\nexport default new Workflow({\n\tname: {{OPT.NAME}},\n\tdescription: "A workflow that does something.",\n\thooks: {\n\t\tcommit(_, repo, details) {\n\t\t\tnative.commit(details)\n\t\t}\n\t},\n})`,
				'src/native.ts': `export const commit = (details: { message: string, description: string }) => {\n\tconsole.log("You just commit a change:", details.message)\n}`
			}
		},
		js: {
			dependencies: ['@relagit/vite', '@types/primer__octicons', 'relagit', 'vite'],
			files: {
				...commonFiles,
				'vite.config.js': `import { defineConfig } from "@relagit/vite";\n\nexport default defineConfig();`,
				'relagit.json': `{\n\t"plugin": "src/index.ts",\n\t"native": "src/native.ts"\n}`,
				'src/index.js': `import { Workflow } from "relagit:actions";\n\nexport default new Workflow({\n\tname: {{OPT.NAME}},\n\tdescription: "A workflow that does something.",\n\thooks: {\n\t\tcommit(_, repo, details) {\n\t\t\tnative.commit(details)\n\t\t}\n\t},\n})`,
				'src/native.js': `export const commit = (details) => {\n\tconsole.log("You just commit a change:", details.message)\n}`
			}
		}
	},
	advanced: {
		ts: {
			dependencies: [
				'@relagit/vite',
				'@types/primer__octicons',
				'relagit',
				'typescript',
				'vite'
			],
			files: {
				...commonFiles,
				'vite.config.ts': `import { defineConfig } from "@relagit/vite";\n\nexport default defineConfig();`,
				'relagit.json': `{\n\t"plugin": "src/index.ts",\n\t"native": "src/native.ts"\n}`,
				'global.d.ts': `import * as _native from "./src/native";\n\ndeclare global {\n\tconst native: typeof _native;\n}`,
				'src/index.ts': `/// <reference types="relagit" />\n/// <reference types="relagit/global" />\n\nimport { Workflow, app, menu } from 'relagit:actions';\n\nexport default new Workflow({\n\tname: 'my-workflow',\n\tdescription: 'A workflow that does something.',\n\thooks: {\n\t\tcommit(_, repo, details) {\n\t\t\tnative.commit(details);\n\t\t}\n\t}\n});\napp.registerSettingsPane('my-workflow', {\n\tchildren: [],\n\tname: 'My Workflow',\n\ticon: 'apps'\n});\n\nmenu.extend('sidebar-item', [\n\t{\n\t\tlabel: 'My Workflow',\n\t\ttype: 'item',\n\t\tonClick: () => {\n\t\t\tconsole.log('Hello World');\n\t\t}\n\t}\n]);\n`,
				'src/native.ts': `export const commit = (details: { message: string, description: string }) => {\n\tconsole.log("You just commit a change:", details.message)\n}`
			}
		},
		js: {
			dependencies: ['@relagit/vite', '@types/primer__octicons', 'relagit', 'vite'],
			files: {
				...commonFiles,
				'vite.config.js': `import { defineConfig } from "@relagit/vite";\n\nexport default defineConfig();`,
				'relagit.json': `{\n\t"plugin": "src/index.ts",\n\t"native": "src/native.ts"\n}`,
				'src/index.js': `import { Workflow, app, menu } from 'relagit:actions';\n\nexport default new Workflow({\n\tname: 'my-workflow',\n\tdescription: 'A workflow that does something.',\n\thooks: {\n\t\tcommit(_, repo, details) {\n\t\t\tnative.commit(details);\n\t\t}\n\t}\n});\napp.registerSettingsPane('my-workflow', {\n\tchildren: [],\n\tname: 'My Workflow',\n\ticon: 'apps'\n});\n\nmenu.extend('sidebar-item', [\n\t{\n\t\tlabel: 'My Workflow',\n\t\ttype: 'item',\n\t\tonClick: () => {\n\t\t\tconsole.log('Hello World');\n\t\t}\n\t}\n]);\n`,
				'src/native.js': `export const commit = (details) => {\n\tconsole.log("You just commit a change:", details.message)\n}`
			}
		}
	}
};
