# FACEIT Feed test

### Setup

You should have Docker installed, since it uses Docker to start up a mock database.

1. Run Docker
2. Provide access to setup/teardown scripts

```
chmod +x ./scripts/setup.sh
chmod +x ./scripts/teardown.sh
```

3. Start up the dev environment

```
npm run dev
```

### Explanation

This app is built using Next.js 14, which uses the new App Router. Both frontend and backend are served by Next.js inside the `./src/app` folder, with `./src/app/api` exposing the backend endpoints.

State management is handled with Redux, using RTK and RTK Query for fetching information from the backend and then implementing pagination logic to achieve the infinite scrolling.

When starting up the dev environment, a Docker container with a MongoDB image is spun up with mock information filled from a generated JSON with all the posts information.

In order to mock the generation of new posts by other users, there's an extra endpoint to add new posts to the DB. I wanted the triggering of new posts to be completely independent of the RTK Query cache in order to best represent a real case scenario where new posts would be generated without the client even realising about it, so in order to achieve that, the trigger doesn't use a Redux mutation, but rather is just a regular POST call to the server. This way, the existing endpoint's subscription wouldn't cause an automatic refetch, which wouldn't be quite representative of a real-life situation.

Communication from the server to the client is achieved by using WebSockets with `socket.io`. Whenever there's a new post, the server sends a message to the client, which then proceeds to scroll to and highlight the new post.