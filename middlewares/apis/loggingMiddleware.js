export function loggingMiddleware(request) {
  return { response: request.method + " " + request.url, status: 200 };
}
