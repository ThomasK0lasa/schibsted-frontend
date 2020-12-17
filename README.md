# Schibsted Frontend assignment App
Application built with use of React

## Assumptions about the App
- application seems like news aggregating/displaying software
- the App supposed to work even if some API endpoints won't work
- App will fetch new data only on refresh (no new requests when selecting Data sources checkboxes, just hiding and showing existing data). This, of course could be build differently with refresh on every new selection.
- API have 10% failure chance and depending on responses the App will display different errors.
- thought about Redux and Materializecss and decided to go without it

## Setting up the Application

### LOCAL

Clone the git repo:
> `git clone https://github.com/ThomasK0lasa/schibsted-frontend`

To run the API server do:
> `node server.js`

To run the App developer version do:
> `npm run start`

### ONLINE

You can find production here:
https://news-previews.herokuapp.com/

And live API here:
https://news-previews-api.herokuapp.com/

## Others
API git repo: https://github.com/ThomasK0lasa/schibsted-frontend-api
