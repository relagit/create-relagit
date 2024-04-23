import pc from '../shared/color.js';

import path from 'path';
import fs from 'fs';

import prompts from 'prompts';

const isDir = (/** @type {string} */ dir) => fs.existsSync(dir) && fs.lstatSync(dir).isDirectory();
const empty = (/** @type {string} */ dir) => {
	if (!isDir(dir)) {
		return false;
	}

	return fs.readdirSync(dir).length === 0;
};

export default async (/** @type {import('../shared').Context} */ ctx) => {
	const { location } = await prompts([
		{
			type: 'text',
			name: 'location',
			message: 'Where would you like to create your workflow?',
			initial:
				ctx.opt.name ?
					path.join('.', ctx.opt.name.trim().replace(/[\s]/g, '-'))
				:	'./my-workflow',
			validate: (/** @type {string} */ dir) => {
				if (dir === '') {
					return 'Directory cannot be empty.';
				}

				if (!dir.match(/^[a-zA-Z0-9-]+$/)) {
					return 'Directory name can only contain alphanumeric characters and hyphens.';
				}

				if (fs.existsSync(path.resolve(ctx.cwd, dir)) && !isDir(dir)) {
					return `${pc.italic(dir)} is not a directory.`;
				}

				if (
					fs.existsSync(path.resolve(ctx.cwd, dir)) &&
					!empty(path.resolve(ctx.cwd, dir))
				) {
					return `Directory ${pc.italic(dir)} already exists and is not empty.`;
				}

				return true;
			},
			format: (/** @type {string} */ dir) => path.join('.', dir.trim().replace(/[\s]/g, '-'))
		}
	]);

	if (fs.existsSync(path.resolve(ctx.cwd, location)) && !empty(path.resolve(ctx.cwd, location))) {
		throw new Error(`Directory ${pc.italic(location)} already exists.`);
	}

	ctx.opt.location = path.resolve(ctx.cwd, location);

	console.log(`\nCool! Your workflow will be created in ${pc.italic(location)}.\n`);

	const { template } = await prompts([
		{
			type: 'select',
			name: 'template',
			message: 'Which template would you like to use?',
			choices: [
				{ title: 'Basic', value: 'basic' },
				{ title: 'Basic with Native', value: 'native' },
				{ title: 'Advanced', value: 'advanced' }
			],
			initial: 1
		}
	]);

	console.log("\nYou've chosen the", pc.italic(template), 'template.\n');

	ctx.opt.template = template;

	const { typescript } = await prompts([
		{
			type: 'confirm',
			name: 'typescript',
			message: `Would you like to use ${pc.blue('TypeScript')}?`,
			initial: true
		}
	]);

	console.log(
		typescript ?
			`\nGreat! We will use ${pc.blue('TypeScript')} for your workflow.\n`
		:	`\nIncorrect, but fine we'll use ${pc.yellow('JS')}.\n`
	);

	ctx.opt.typescript = typescript;
};
