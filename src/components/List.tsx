import React from 'react';
import ListItem from './ListItem';
import ListFilter from './ListFilter';
import ListSort from './ListSort';
import { toast } from 'react-toastify';
import './List.css';
import { Article } from '../interfaces/Article';
import sort from '../utils/sort';
import query from '../utils/query'
import fetchData from '../utils/fetch'

interface State {
  errorMsg: string;
  data: Array<Article>;
  sortDir: string;
  selected: Array<string>;
}

class List extends React.Component {
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
  }

  async getData() {
    let data: Array<Article> = [];
    let errorMsg = '';
    let selected: Array<String> = [];

    // fetching loop
    for (let i = 0; i < this.apiEndpoints.length; i++) {
      const response = await fetchData(this.apiEndpoints[i]);
      // handling errors
      if (response.errorMsg !== '') {
        if (response.errorMsg === 'Network error') {
          errorMsg = "We are sorry but, seems that all API endpoints have a problem. :("
          // Breaking the loop on Network Error
          toast.error(response.errorMsg);
          break;
        }
        toast.error(response.errorMsg);
      } else {
        // success
        data = [...data, ...response.data];
        this.liveEndpoints.push(this.apiEndpoints[i]);
      }
    }
    
    selected = this.shouldSelect();
    const sortDir = this.shouldSort();
    data = sortDir ? sort(sortDir, data) : data;
    this.setState({ data: data, errorMsg: errorMsg, selected: selected });
  }

  // initial sorting if query
  shouldSort() {
    if (query.checkParamKey('s')) {
      let newDir = (query.checkParamValue('dsc')) ? 'dsc' : 'asc';
      return newDir;
    } else {
      return false;
    }
  }

  // initial filtering if query
  shouldSelect() {
    let selected: Array<string> = [];
    if (this.liveEndpoints.length === this.apiEndpoints.length) {
      toast('Loaded successfully :)');
      if (query.checkParamKey('t')) {
        this.apiEndpoints.forEach(resource => {
          if (query.checkParamValue(resource)) {
            selected.push(resource);
          }
        });
      } else {
        selected = [...this.apiEndpoints];
      }
    } else {
      selected = [...this.liveEndpoints];
    }
    return selected;
  }

  // sort data
  sortData = (dir: string) => {
    this.setState(sort(dir, this.state.data));
  }

  // select data
  newSelection = (selected: Array<string>) => {
    this.setState({selected: selected});
  }

  // checking if article is in selected data sources
  ifSelected(category: string) {
    const index = this.state.selected.indexOf(this.APImapToCat[category]);
    return (index !== -1) ? true : false;
  }

  render() {
    const listProps = {
      types: this.apiEndpoints,
      active: this.liveEndpoints,
      selected: this.state.selected,
      select: this.newSelection
    }
    // assuming there won't be empty list from working APIs
    return (
      <div id="Content">
        {this.state.errorMsg !== '' ?
          <main className="error"><p>{this.state.errorMsg}</p></main> :
          this.state.data.length === 0 ?
            <main className="loading"><p>Loading...</p></main> :
            <React.Fragment>
              <ListFilter {...listProps} />
              {this.state.selected.length === 0 ?
                <main className="no-selection">
                  <p>Please, select data source. :)</p>
                </main> :
                <main>
                  <ListSort sort={this.sortData} />
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
