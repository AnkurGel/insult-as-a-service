# Insult as a Service (IaaS)

> *"Some cause happiness wherever they go; others, whenever they go."* — Oscar Wilde

A free, blazing-fast API that serves random witty insults. No auth, no signup, no nonsense. Just pure, eloquent disappointment — delivered over HTTPS.

Inspired by [No-as-a-Service](https://github.com/hotheadhacker/no-as-a-service).

## Try it

```bash
curl https://insult.ankurgoel.com/
```

```json
{
  "insult": "You're like a software update — whenever I see you, I think 'not now'."
}
```

That's it. That's the whole product.

## API

| Endpoint | What you get |
|---|---|
| `GET /` | Random insult (JSON) |
| `GET /insult` | Same thing, if you like being explicit |
| `GET /insult/text` | Plain text — for bots, terminals, and people who don't deserve JSON |
| `GET /count` | How many insults are loaded and ready to ruin your day |
| `GET /i` | Embeddable HTML with Open Graph tags — random insult |
| `GET /i/{slug}` | Embeddable HTML — same slug always returns the same insult |

### Response format

**JSON** (`/` and `/insult`)
```json
{ "insult": "You're the human equivalent of a participation trophy." }
```

**Plain text** (`/insult/text`)
```
I'd agree with you, but then we'd both be wrong.
```

### Embeddable links

Paste in Slack, Discord, Twitter, or anywhere that unfurls links:

```
https://insult.ankurgoel.com/i/hey-john
```

Shows a rich preview with title **"You've been roasted"** and a witty insult as the description. Change the slug to get a different insult — same slug always gives the same one, so the preview stays consistent after caching.

## The Collection

102 hand-curated insults. Every one of them:

- Clever enough to require a second thought
- Clean enough to use at work (probably)
- Generic enough to apply to anyone who deserves it

Sources range from Reddit threads to Churchill, Oscar Wilde, and Groucho Marx. See [`sources.json`](sources.json) for the full trail.

## Self-host

Runs on [Cloudflare Workers](https://workers.cloudflare.com/) (free tier).

```bash
git clone git@github.com:AnkurGel/insult-as-a-service.git
cd insult-as-a-service
npm install
npm run dev       # local dev at localhost:8787
npm run deploy    # ship it
```

## Contributing insults

Add to `insults.json`. The bar for entry:

1. Would it take someone a moment to realize they've been insulted? **Yes** → proceed
2. Does it target a specific group (race, gender, etc.)? **Yes** → no thanks
3. Is it actually funny? **Maybe** → add it, we'll workshop it

Update `sources.json` if you're pulling from a new source.

## License

MIT — insult responsibly.
