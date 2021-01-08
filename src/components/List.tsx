import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

// components
import ListItem from './ListItem';
import ListFilter from './ListFilter';
import ListSort from './ListSort';
import Error from './Error';

// utils
import sort from '../utils/sort';
import query from '../utils/query'
import fetchData from '../utils/fetch'

// other
import './List.css';
import { IArticle } from '../interfaces/Article';

function List() {
  const apiEndpoints = useRef<string[]>(['sports', 'fashion']); // API Endpoints - constant data
  const sortDir = useRef<string>(shouldSort());
  const mapApiToCat: { [key: string]: string } = { // Mapping of article categories to API Endpoints
    'sport': 'sports',
    'fashion': 'fashion'
  }

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
        const response = await fetchData(endpoint);

        if (response.errorMsg !== '') { // handling errors
          if (response.errorMsg === 'Network error') {
            setErrorMsg("We are sorry but, seems that all API endpoints have a problem. :(");
            toast.error(response.errorMsg);
            break; // breaking the loop as this is breaking error
          }
          toast.error(response.errorMsg);

        } else { // handling success
          data = [...data, ...response.data]; // summarizing data
          liveEndpoints.push(endpoint); // setting Live Endpoints array
        }
      }

      if (sortDir.current !== 'natural') {
        data = sort(sortDir.current, data); // sort data
      }
      setData(data);
      setLiveEndpoints(liveEndpoints);

      // checking if all endpoints are live because of possible
      // conflict between live endpoints and selected ones (query)
      let selected: string[] = [];
      if (liveEndpoints.length === apiEndpoints.current.length) {
        toast('Loaded successfully :)');
        if (query.checkParamKey('t')) {
          apiEndpoints.current.forEach(endpoint => {
            if (query.checkParamValue(endpoint)) {
              selected.push(endpoint);
            }
          });
        } else {
          selected = [...apiEndpoints.current];
        }
      } else { // no selected endpoints so returning all live endpoints
        selected = [...liveEndpoints];
      }
      setSelected(selected);
    }
    getData();
  }, []);

  // initial sorting if query
  function shouldSort() {
    if (query.checkParamKey('s')) {
      return (query.checkParamValue('dsc')) ? 'dsc' : 'asc';
    } else {
      return 'natural';
    }
  }

  // sort data
  const sortData = (dir: string) => {
    setData(sort(dir, data));
  }

  // selecting data in case of new selection
  const newSelection = (selected: Array<string>) => {
    setSelected(selected);
  }

  // checking if article is in selected data sources
  const isSelected = (category: string) => {
    return selected.includes(mapApiToCat[category]);
  }

  const listProps = {
    types: apiEndpoints.current,
    active: liveEndpoints,
    selected: selected,
    select: newSelection
  }

  // assuming there won't be empty list from working APIs
  return (
    <div id="Content">
      {errorMsg !== '' ?
        <Error errorMsg={errorMsg} />
        :
        data.length === 0 ?
          <main className="loading"><p>Loading...</p></main>
          :
          <React.Fragment>
            <ListFilter {...listProps} />
            {selected.length === 0 ?
              <main className="noSelection">
                <p>Please, select data source. :)</p>
              </main>
              :
              <main>
                <ListSort sort={sortData} />
                { data.map(article => (
                    isSelected(article.category) ?
                      <ListItem key={article.id} {...article} /> : null
                ))}
              </main>
            }
          </React.Fragment>
      }
    </div>
  )
}

export default List;
