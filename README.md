# Editorial Fabric

This is all the code for _The Student_'s new public website. The idea is simple: build a digital experience that plays an active role in storytelling, rather than simply existing as a vessel for regurgitating text documents. Some other principles involve:

- Ensure the site follows accessibility standards (this needs work)
- Server render as much as possible. Keep client side code as small as possible. Ideally, no JS should be sent for static pages.
- Follow modern development practices and progressive enhancement. Do as much as we can in the service worker. Use responsive images.
- Keep the cost of deploying updates low.

The repo is about to go under a significant change as we move from Preact to Svelte (SvelteKit). This will take place for a number of reasons, but it is mostly about using the right tool for the job:
1. Svelte lowers the barrier to contribution. Use the web languages rather than abstracting away to JSX.
2. Most of our site is static and using a client-side framework is unnecessary.
3. SveleteKit offers the DX of Next, but without using React (see point 2).

## How does it all work then?

1. Request for home page arrives from the internet
2. Request handled by server in `src/server/index.tsx`
3. Data for route extracted by gateway in `src/gateway/`
4. Page server-rendered in `src/web/home/server.tsx`, which renders the home component in `src/web/home/index.tsx`. Server side render wraps home page component in `<Page />` component which captures props and serializes them, includes the client side script, and handles common metadata and preloading semantics.
5. Static HTML sent to client. Any parts of the page inside a `<ClientGate />` will not be statically rendered and rendered only on the client during hydration. This keeps the HTML small enough that the hydration script is reached relatively quickly.
6. Hydration script in `src/web/home/client.tsx` is executed on the client. This attaches event handlers and renders `<ClientGate />` children.

# Contributors

This project wouldn't have been possible without the faith and support of _The Student_'s 20/21 committee. Specific contributors to the project include:

- **Nick Bush** (development, design)
- **Isabella Ronca** (design)

Would you like to get involved with design or development? Email [digital@studentnewspaper.org](mailto:digital@studentnewspaper.org).
