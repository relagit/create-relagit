import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

import pc from '../shared/color.js';
import { templates } from '../shared/templates.js';

import prompts from 'prompts';
import ns from 'nanospinner';

export default async (/** @type {import('../shared').Context} */ ctx) => {
	const { confirm } = await prompts({
		type: 'confirm',
		name: 'confirm',
		message: `Are you ready to create your ${ctx.opt.template} ${ctx.opt.typescript ? 'TS' : 'JS'} template in ${path.relative(ctx.cwd, ctx.opt.location)}?`
	});

	console.log('');

	if (!confirm) {
		console.log(`\n${pc.red('Aborted')}!`);
		process.exit(0);
	}

	const template = templates[ctx.opt.template][ctx.opt.typescript ? 'ts' : 'js'];

	fs.mkdirSync(ctx.opt.location, { recursive: true });
	fs.mkdirSync(`${ctx.opt.location}/src`, { recursive: true });

	for (const [file, content] of Object.entries(template.files)) {
		fs.writeFileSync(
			`${ctx.opt.location}/${file}`,
			content
				.replace('{{OPT.NAME}}', JSON.stringify(ctx.opt.name))
				.replace('{{OPT.AUTHOR}}', JSON.stringify(ctx.username))
		);
	}

	const { packageManager } = await prompts({
		type: 'select',
		name: 'packageManager',
		message:
			'Now we need to install the dependencies, which package manager would you like to use?',
		choices: [
			{ title: 'pnpm', value: 'pnpm' },
			{ title: 'yarn', value: 'yarn' },
			{ title: 'bun', value: 'bun' },
			{ title: 'npm', value: 'npm' }
		],
		initial: 0
	});

	console.log('\nThis may take a while, so grab a coffee ☕️\n');

	const spinner = ns.createSpinner('Installing dependencies');

	spinner.start();

	await new Promise((resolve) => {
		exec(
			`${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} ${template.dependencies.join(' ')}`,
			{
				cwd: ctx.opt.location
			},
			(err) => {
				if (err) {
					console.error(err);
					process.exit(1);
				}

				resolve();
			}
		);
	});

	spinner.stop();

	console.log(
		`\n${pc.green('Success!')} Your ${ctx.opt.template} ${ctx.opt.typescript ? 'TS' : 'JS'} template has been created in ${path.relative(ctx.cwd, ctx.opt.location)}! 🚀\n`
	);

	console.log(`To get started, run the following commands:\n`);
	console.log(`cd ${path.relative(ctx.cwd, ctx.opt.location)}`);
	console.log(`${packageManager}${packageManager === 'npm' ? ' run ' : ' '}dev\n`);
	console.log('');
	console.log(
		'To learn how to install your workflow in RelaGit, visit https://rela.dev/docs/workflows/installing-workflows'
	);
};
