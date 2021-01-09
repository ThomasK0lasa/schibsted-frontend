import { IArticle } from "../interfaces/Article";
import { NetworkError } from "../exceptions/NetworkError";


async function fetchData(endpoint: string) {
  let data: IArticle[] = [];
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  // fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + endpoint);
    if (!response.ok) {
      throw response.status;
    }
    const json = await response.json();
    data = [...json.articles];
  } catch (err) {
    if (err instanceof TypeError) {
      // fetch TypeError
      throw new NetworkError('Network Error');
    } else {
      throw new Error(`Something is wrong with ${endpoint.toUpperCase()} API endpoint!`);
    }
  }
  return data;
}

export default fetchData;