import React from 'react';
import ListItem from './ListItem';
import ListFilter from './ListFilter';
import ListSort from './ListSort';
import './List.css';
import { Article } from './ArticleInterface';
import query from '../router/searchQuery'
import apiURL from '../config';

interface State {
  errorMsg: string;
  data: Array<Article>;
  sortDir: string;
  selected: Array<string>;
}

interface Props {
  onToast: (message: string, type?: string) => void;
}

class List extends React.Component<Props, {}> {
  apiEndpoints: Array<string> = ['sports', 'fashion']; // API Endpoints
  liveEndpoints: Array<string> = []; // working Endpoints
  // Mapping of article categories to API Endpoints
  APImapToCat: { [key: string]: string } = {
    'sport': 'sports',
    'fashion': 'fashion'
  }

  state: State = {
    errorMsg: '', // error message
    data: [], // articles
    sortDir: 'natural', // sorting direction
    selected: [] // selected categories
  }

  async componentDidMount() {
    await this.getData();
    this.shouldSort()
  }

  async getData() {
    let data: Array<object> = [];
    let errorMsg = '';
    let selected: Array<String> = [];

    // fetching and error handling function
    const fetchData = async (resource: string) => {
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      // fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500
      try {
        const response = await fetch(apiURL + resource);
        if (!response.ok) {
          throw response.status;
        }
        const json = await response.json();
        const { articles } = json;
        if (articles) {
          this.liveEndpoints.push(resource);
          selected.push(resource);
          data = [...data, ...articles];
        }
      } catch (err) {
        if (err instanceof TypeError) {
          errorMsg = 'Network error'
        } else {
          // throwing separate error toast when part of API is 'down'
          this.props.onToast('Something wrong with ' + resource.toUpperCase() + ' API!', 'error');
        }
      }
    }

    // fetching loop
    for (let i = 0; i < this.apiEndpoints.length; i++) {
      await fetchData(this.apiEndpoints[i]);
    }

    // respecting search query if all API endpoints working fine
    const noErrors = this.liveEndpoints.length === this.apiEndpoints.length;
    if (query.checkParamKey('t') && noErrors) {
      selected = [];
      this.liveEndpoints.forEach(resource => {
        if (query.checkParamValue(resource)) {
          selected.push(resource);
        }
      });
    }

    // throwing one toast on errorMsg as probably there's network error 
    if (errorMsg === 'Network error') {
      this.props.onToast('Network error!', 'error');
    }

    // Succes toast when there's no errors :)
    if (noErrors && !errorMsg) {
      this.props.onToast('Loaded successfully :)');
    } else if (this.liveEndpoints.length === 0) {
      // When all APIs throw error showing error text in <main> 
      errorMsg = "We are sorry but, seems that all API endpoints have a problem. :("
    }
    this.setState({ data: data, errorMsg: errorMsg, selected: selected });
  }

  // initial sorting if query 
  shouldSort() {
    if (query.checkParamKey('s')) {
      if (query.checkParamValue('dsc')) {
        this.sortData(true);
      } else if (query.checkParamValue('asc')) {
        this.setState({ sortDir: 'dsc' })
        this.sortData(true);
      }
    }
  }

  // data sorting function
  sortData = (oldQuery?: Boolean) => {
    // translations of months
    let trans: { [key: string]: string } = {
      januar: 'January',
      februar: 'February',
      mars: 'March',
      april: 'April',
      mai: 'May',
      juni: 'June',
      juli: 'July',
      august: 'August',
      september: 'September',
      oktober: 'October',
      november: 'November',
      desember: 'December',
    }
    if (this.state.sortDir === 'dsc') {
      this.setState({
        data: this.state.data.sort((a, b) => {
          return sortByDate(a.date, b.date)
        }),
        sortDir: 'asc'
      });
      if (oldQuery)
        query.setSort('asc');
    } else {
      this.setState({
        data: this.state.data.sort((a, b) => {
          return sortByDate(b.date, a.date)
        }),
        sortDir: 'dsc'
      });
      if (oldQuery)
        query.setSort('dsc');
    }

    // sort by date function
    function sortByDate(a: string, b: string) {
      const adate = a.trim().split(' ');
      const bdate = b.trim().split(' ');
      adate[1] = trans[adate[1]];
      bdate[1] = trans[bdate[1]];
      return Date.parse(adate.join(' ')) - Date.parse(bdate.join(' '));
    }
  }

  // selecting and deselecting function
  select = (type: string) => {
    const index = this.state.selected.indexOf(type);
    const newSelected = this.state.selected.slice();
    if (index === -1) {
      newSelected.push(type)
      this.setState({ selected: newSelected })
    } else {
      newSelected.splice(index, 1)
      this.setState({ selected: newSelected })
    }
    query.setType(newSelected, this.liveEndpoints.length);
  }

  // checking if article is in selected data sources
  ifSelected(category: string) {
    const index = this.state.selected.indexOf(this.APImapToCat[category]);
    return (index !== -1) ? true : false;
  }

  render() {
    // assuming there won't be empty list from working APIs
    return (
      <div id="Content">
        {this.state.errorMsg !== '' ?
          <main className="error"><p>{this.state.errorMsg}</p></main> :
          this.state.data.length === 0 ?
            <main className="loading"><p>Loading...</p></main> :
            <React.Fragment>
              <ListFilter
                types={this.apiEndpoints}
                active={this.liveEndpoints}
                selected={this.state.selected}
                select={this.select} />
              {this.state.selected.length === 0 ?
                <main className="no-selection">
                  <p>Please, select data source. :)</p>
                </main> :
                <main>
                  <ListSort sort={this.sortData} currDir={this.state.sortDir} />
                  {
                    this.state.data.map(article => (
                      this.ifSelected(article.category) ?
                        <ListItem key={article.id} {...article} /> : ''
                    ))}
                </main>
              }
            </React.Fragment>
        }
      </div>
    )
  }
}

export default List;
