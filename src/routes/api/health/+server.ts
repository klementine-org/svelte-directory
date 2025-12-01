import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	return new Response(JSON.stringify({ status: 'ok' }), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
