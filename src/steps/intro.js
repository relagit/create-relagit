import pc, { bgBrand } from '../shared/color.js';

const sleep = async (/** @type {number} */ ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async (/** @type {import('../shared').Context} */ ctx) => {
	if (ctx.skipIntro) return console.log(`Great! Let's get started! 🚀\n`);

	const message = `Are you ready to scaffold a new ${bgBrand(' RelaGit ')} workflow, ${pc.italic(ctx.username)}?\n`;

	for (const char of message) {
		process.stdout.write(char);
		await sleep(40);
	}

	await sleep(1000);

	console.clear();

	console.log(`Great! Let's get started! 🚀\n`);
};
