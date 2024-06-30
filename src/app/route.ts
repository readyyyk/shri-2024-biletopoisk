export const GET = (req: Request) => {
    const url = new URL(req.url);
    url.pathname = '/search';
    return Response.redirect(url.toString(), 302);
};
