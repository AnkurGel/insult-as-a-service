import insults from "../insults.json";

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

    // GET /count — total insults available
    if (url.pathname === "/count") {
      return Response.json({ count: insults.length }, { headers });
    }

    return Response.json({ error: "Not found" }, { status: 404, headers });
  },
};
