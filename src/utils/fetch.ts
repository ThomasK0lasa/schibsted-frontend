import { Article } from "../interfaces/Article";

async function fetchData (resource: string) {
  let data: Array<Article> = [];
  let errorMsg: string = '';
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  // fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + resource);
    if (!response.ok) {
      throw response.status;
    }
    const json = await response.json();
    const { articles } = json;
    if (articles) {
      data = [...articles];
    }
  } catch (err) {
    if (err instanceof TypeError) {
      // fetch TypeError
       errorMsg = 'Network error';
    } else {
      // throwing separate error toast when part of API is 'down'
      errorMsg = ('Something is wrong with ' + resource.toUpperCase() + ' API endpoint!');
    }
  }
  return { data, errorMsg };
}

export default fetchData;