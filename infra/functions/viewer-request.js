const APEX_DOMAIN = "oiralion.dev";
const WWW_DOMAIN = `www.${APEX_DOMAIN}`;

// biome-ignore lint/correctness/noUnusedVariables: CloudFront Functionsが呼び出すエントリポイントのため
function handler(event) {
	const request = event.request;
	const host = request.headers.host ? request.headers.host.value : "";

	if (host === WWW_DOMAIN) {
		return {
			statusCode: 301,
			statusDescription: "Moved Permanently",
			headers: {
				location: {
					value: `https://${APEX_DOMAIN}${request.uri}${buildQuery(request.querystring)}`,
				},
			},
		};
	}

	return request;
}

function buildQuery(querystring) {
	const parts = [];
	for (const key in querystring) {
		const entry = querystring[key];
		const values = entry.multiValue ? entry.multiValue : [entry];
		for (let i = 0; i < values.length; i++) {
			parts.push(`${key}=${values[i].value}`);
		}
	}
	return parts.length > 0 ? `?${parts.join("&")}` : "";
}
