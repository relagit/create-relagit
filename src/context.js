import { exec } from 'node:child_process';

import process from 'process';
import arg from 'arg';
/**
 * @returns {Promise<import('./shared').Context>}
 */
export default async () => {
	const cwd = process.cwd();

	const args = arg(
		{
			'--help': Boolean,
			'--verbose': Boolean,
			'--name': String,
			'--typescript': Boolean,
			'--skip-intro': Boolean,

			'-h': '--help',
			'-v': '--verbose',
			'-n': '--name',
			'-t': '--typescript',
			'-s': '--skip-intro',
			'--skip': '--skip-intro'
		},
		{
			permissive: true,
			argv: process.argv.slice(2).filter((arg) => arg !== '-')
		}
	);

	const name = args['--name'] || 'my-workflow';
	const verbose = args['--verbose'] || false;
	const typescript = args['--typescript'] || false;
	const help = args['--help'] || false;
	const skipIntro = args['--skip-intro'] || false;

	return {
		cwd,
		verbose,
		help,
		skipIntro,
		opt: {
			name,
			typescript
		},
		username: await getName()
	};
};

// https://github.com/withastro/astro/blob/335879218e2dee057bd5bc7ecf33f8d3ebb4120e/packages/create-astro/src/messages.ts#L48
const getName = () =>
	new Promise((resolve) => {
		exec('git config user.name', { encoding: 'utf-8' }, (_1, gitName) => {
			if (gitName.trim()) {
				return resolve(gitName.split(' ')[0].trim());
			}
			exec('whoami', { encoding: 'utf-8' }, (_3, whoami) => {
				if (whoami.trim()) {
					return resolve(whoami.split(' ')[0].trim());
				}
				return resolve('astronaut');
			});
		});
	});
