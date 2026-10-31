export default {
  fetch(request) {
    const { pathname } = new URL(request.url);
    const repo = request.headers.get("Referer")?.match(/^https:\/\/github\.com\/Kludex\/([\w.-]+)/i)?.[1];
    if (!repo) return Response.redirect("https://github.com/Kludex", 307);
    return Response.redirect(`https://github.com/Kludex/${repo}${pathname === "/" ? "" : pathname}`, 307);
  },
};
