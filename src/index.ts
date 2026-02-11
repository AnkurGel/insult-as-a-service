import insults from "../insults.json";

function pickInsult(slug: string): string {
  if (!slug) return insults[Math.floor(Math.random() * insults.length)];
  // Deterministic pick from slug so the same URL always unfurls the same insult
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return insults[Math.abs(hash) % insults.length];
}

function embedHtml(insult: string, baseUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta property="og:title" content="You've been roasted">
  <meta property="og:description" content="${insult.replace(/"/g, "&quot;")}">
  <meta property="og:site_name" content="Insult as a Service">
  <meta property="og:url" content="${baseUrl}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="You've been roasted">
  <meta name="twitter:description" content="${insult.replace(/"/g, "&quot;")}">
  <title>You've been roasted</title>
</head>
<body>
  <p>${insult.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
</body>
</html>`;
}

export default {
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...headers,
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (req.method !== "GET") {
      return Response.json({ error: "Method not allowed" }, { status: 405, headers });
    }

    // GET / — random insult
    if (url.pathname === "/" || url.pathname === "/insult") {
      const insult = insults[Math.floor(Math.random() * insults.length)];
      return Response.json({ insult }, { headers });
    }

    // GET /insult/text — plain text response
    if (url.pathname === "/insult/text") {
      const insult = insults[Math.floor(Math.random() * insults.length)];
      return new Response(insult, {
        headers: { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" },
      });
    }

    // GET /i or /i/{slug} — embeddable HTML with OG tags
    if (url.pathname === "/i" || url.pathname.startsWith("/i/")) {
      const slug = url.pathname.slice(3); // everything after "/i/"
      const insult = pickInsult(slug);
      return new Response(embedHtml(insult, url.href), {
        headers: { "Content-Type": "text/html;charset=utf-8", "Access-Control-Allow-Origin": "*" },
      });
    }

    // GET /count — total insults available
    if (url.pathname === "/count") {
      return Response.json({ count: insults.length }, { headers });
    }

    return Response.json({ error: "Not found" }, { status: 404, headers });
  },
};
