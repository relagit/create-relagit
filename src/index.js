#!/usr/bin/env node

import pc from './shared/color.js';
import context from './context.js';
import steps from './steps/index.js';

const exit = () => process.exit(0);
process.on('SIGINT', exit);
process.on('SIGTERM', exit);

export const run = async () => {
	console.clear();

	const ctx = await context();

	if (ctx.help) {
		console.log('Usage: create-relagit [options]');
		console.log('');
		console.log('Options:');
		console.log('  --help, -h         Show this help message');
		console.log('  --verbose, -v      Show additional debug information');
		console.log('  --name, -n         Name of the workflow');
		console.log('  --typescript, -ts  Use TypeScript');
		console.log('  --skip-intro, -s   Skip the introduction');
		console.log('');
		console.log('Example:');
		console.log('  create-relagit -n my-workflow -ts');

		return;
	}

	for (const step of steps) {
		await step(ctx);
	}
};

run().catch((error) => {
	console.error(pc.red(error));

	process.exit(1);
});
