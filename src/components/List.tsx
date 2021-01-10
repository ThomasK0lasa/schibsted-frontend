import { Fragment, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import ListItem from './ListItem';
import ListFilter from './ListFilter';
import ListSort from './ListSort';
import ErrorComponent from './ErrorComponent';
import sort from '../utils/sort';
import query from '../utils/query';
import fetchData from '../utils/fetchData';
import './List.css';
import { IArticle } from '../interfaces/Article';
import { NetworkError } from '../exceptions/NetworkError';

function List() {
  // apiEndpoints - constant data could be defined in configuration
  const apiEndpoints = useRef<string[]>(['sports', 'fashion']);
  const sortDirection = useRef<string>(shouldSort());
  // Mapping of article categories to API Endpoints
  const mapApiToCat: { [key: string]: string; } = {
    'sport': 'sports',
    'fashion': 'fashion'
  };

  // live endpoints as every endpoint has 10% failure chance
  const [liveEndpoints, setLiveEndpoints] = useState<string[]>([]);
  const [data, setData] = useState<IArticle[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    let data: IArticle[] = [];
    let liveEndpoints: string[] = [];

    const getData = async () => {
      // looping through endpoints
      for (const endpoint of apiEndpoints.current) {
        try {
          const response = await fetchData(endpoint);
          liveEndpoints.push(endpoint); // setting Live Endpoints array
          data = [...data, ...response]; // summarizing data
        } catch (err) {
          if (err instanceof NetworkError) {
            toast.error('Network Error');
            setErrorMsg(err.message);
            return; // breaking the loop as this is breaking error
          } else {
            toast.error(err.message);
          }
        }
      }
      if (sortDirection.current !== 'natural') {
        data = sort(sortDirection.current, data); // sort data
      }
      setLiveEndpoints(liveEndpoints);
      setData(data);

      if (liveEndpoints.length === apiEndpoints.current.length) {
        toast('Loaded successfully :)');
      }
    };
    getData();
  }, []);

  useEffect(
    () => {
      let selected: string[] = [];

      // checking if all endpoints are live because of possible
      // conflict between live endpoints and selected ones in query
      if (query.checkParamKey('t') && liveEndpoints.length === apiEndpoints.current.length) { 
        for (const endpoint of apiEndpoints.current) {
          if (query.checkParamValue(endpoint)) {
            selected.push(endpoint);
          }
        }
      } else {
        selected = [...liveEndpoints];
      }
      setSelected(selected);
  }, [liveEndpoints]);

  // initial sorting if in query
  function shouldSort() {
    if (query.checkParamKey('s')) {
      return (query.checkParamValue('dsc')) ? 'dsc' : 'asc';
    }
    return 'natural';
  }

  // sorting data
  const sortData = (dir: string) => {
    setData(sort(dir, [...data]));
  };

  // selecting data in case of new selection
  const newSelection = (selected: Array<string>) => {
    setSelected(selected);
  };

  // checking if article is in selected data sources
  const isSelected = (category: string) => {
    return selected.includes(mapApiToCat[category]);
  };

  const listProps = {
    types: apiEndpoints.current,
    active: liveEndpoints,
    selected: selected,
    select: newSelection
  };

  // assuming there won't be empty list from working APIs
  return (
    <div id="content">
      {errorMsg !== '' ?
        <ErrorComponent errorMsg={errorMsg} />
        :
        data.length === 0 ?
          <main className="loading"><p>Loading...</p></main>
          :
          <Fragment>
            <ListFilter {...listProps} />
            {selected.length === 0 ?
              <main className="noSelection"><p>Please, select data source. :)</p></main>
              :
              <main>
                <ListSort sort={sortData} />
                {data.map(article => (
                  isSelected(article.category) ?
                    <ListItem key={article.id} {...article} /> : null
                ))}
              </main>
            }
          </Fragment>
      }
    </div>
  );
}

export default List;
