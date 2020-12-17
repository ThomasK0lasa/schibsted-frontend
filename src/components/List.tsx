import React from 'react';
import ListItem from './ListItem';
import ListFilter from './ListFilter';
import ListSort from './ListSort';
import './List.css';
import { Article } from './ArticleInterface';

interface State {
  errorMsg: string;
  data: Array<Article>;
  sortDir: string;
  selected: Array<String>;
}

interface Props {
  onToast: (message: string, type?: string) => void;
}

class List extends React.Component<Props, {}> {
  // Defined APIs for App initial checking
  apiResources: Array<string> = ['sports', 'fashion'];
  // List of working APIs
  liveResources: Array<string> = [];
  // Mapping of API categories to article category
  APImapToCat: { [key: string]: string } = {
    'sport': 'sports',
    'fashion': 'fashion'
  }

  state: State = {
    errorMsg: '',
    data: [],
    sortDir: 'natural',
    selected: []
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const apiURL = "http://localhost:6010/articles/";
    let obj: Array<Object> = [];
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
          this.liveResources.push(resource);
          selected.push(resource);
          articles.forEach((article: Article) => {
            obj.push(article);
          })
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
    for (let i = 0; i < this.apiResources.length; i++) {
      await fetchData(this.apiResources[i]);
    }

    // throwing one toast on errorMsg as probably there's network error 
    if (errorMsg === 'Network error') {
      this.props.onToast('Network error!', 'error');
    }
    let noErrors = this.liveResources.length === this.apiResources.length;

    // Succes toast when there's no errors :)
    if (noErrors && !errorMsg) {
      this.props.onToast('Loaded successfully :)');
    } else if (this.liveResources.length === 0) {
      // When all APIs throw error showing error text in <main> 
      errorMsg = "We are sorry but, seems that all APIs have a problem. :("
    }
    this.setState({ data: obj, errorMsg: errorMsg, selected: selected });
  }

  // data sorting function
  sortData = () => {
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
    } else {
      this.setState({
        data: this.state.data.sort((a, b) => {
          return sortByDate(b.date, a.date)
        }),
        sortDir: 'dsc'
      });
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
  }

  // checking if article is in selected data sources
  ifSelected(category: string) {
    const index = this.state.selected.indexOf(this.APImapToCat[category]);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
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
              <ListFilter types={this.apiResources} active={this.liveResources} select={this.select} />
              {this.state.selected.length === 0 ?
                <main className="no-selection"><p>Please, select data source. :)</p></main> :
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
