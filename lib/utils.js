export const to = promise => {
	return promise
		.then(data => ({ data, error: null }))
		.catch(error => ({ error, data: null }));
};

export const getCookies = (request) => {
	const cookies = {};
	request.headers && request.headers.cookie.split(';').forEach(function (cookie) {
		const parts = cookie.match(/(.*?)=(.*)$/);
		cookies[parts[1].trim()] = (parts[2] || '').trim();
	});
	return cookies;
};
