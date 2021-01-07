# Schibsted Frontend assignment App
Application built with use of React. [Live version on Heroku](https://news-previews.herokuapp.com/).

## Assumptions about the App
- application seems like news aggregating/displaying software
- the App supposed to work even if some API endpoints won't work
- App will fetch new data only on refresh (no new requests when selecting Data sources checkboxes, just hiding and showing existing data). This, of course could be build differently with refresh on every new selection.
- API have 10% failure chance and depending on responses the App will display different errors.
- thought about Redux and Materializecss and decided to go without it

## Remarks
As I was rejected without any conversation seems like I need to explain some things:
- "webvitals package shouldn't be in production" - pacakge web-vitals is added to production dependencies by default when using Create React App and I left like this
- "using selectors instead of classes" - if there would be people overriding my CSS then using classes would be a good thing. But as this is demo Application I let myself for some selectors
- "variable and function naming everywhere is different" - no, not really as I went with: camelCase in tsx, ts and js; PascalCase for Ids; kebab-case for classes - even if You don't like it there's order. Of course there could be different naming and I wouldn't mind it, but I can't agree on this one.
- "candidate has not demonstrated knowledge of ES6" - I used: arrow functions, classes, destructuring, spread, template strings, modules, ES8 - async, await, ES9 - spread properties (technically this was supported by react earlier), and of course let and const
- "utils/query bad writing" - I agree, for my explanation: I didn't want to use more time on this, and this was done as extra feature (url queries)
- "TypeScript disturbed rather than helped" - I don't understand this one
- "no use of type for State and Props in components where would be particularly useful" - there're types for props and states, there are types for almost everything and in only one place I used 'any' type

Besides those remarks there were also mentioned positives - that's nice, but it doesn't change fact that rejecting without conversation sucks. :(

## Setting up the Application

### LOCAL

Clone the git repo:
> `git clone https://github.com/ThomasK0lasa/schibsted-frontend`

To run the API server do:
> `node server.js`

To run the App developer version do:

> `mv env.template .env` // on Mac\Linux<br>
> `move env.template .env` // on Windows<br>
> `npm install`<br>
> `npm run start`

### ONLINE

You can find online App here (unvisited heroku apps are kept in sleep state so if You receive error please reload the page again):
https://news-previews.herokuapp.com/

And live API here:
https://news-previews-api.herokuapp.com/

## Others
API git repo: https://github.com/ThomasK0lasa/schibsted-frontend-api
