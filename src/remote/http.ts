export interface HttpResponse<T> extends Response {
	parsedBody?: T;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
	const response: HttpResponse<T> = await fetch(request);

	try {
		// may be an error if there is no body
		response.parsedBody = await response.json();
	} catch (ex) {
		throw new Error('Error parsing response body');
	}

	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return response;
}
