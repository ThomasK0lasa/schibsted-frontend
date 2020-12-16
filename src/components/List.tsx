import React from 'react';
import ListItem from './ListItem';
import './List.css';
import { Article } from './ArticleInterface';

interface State {
  errorMsg: string;
  data: Array<Article>;
}

class List extends React.Component {
  state: State = {
    errorMsg: '',
    data: []
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const apiURL = "http://localhost:6010/articles/";
    const apiResources = ['sports', 'fashion']
    let obj: Array<Object> = [];
    let errorMsg = '';
    for (let i = 0; i < apiResources.length; i++) {
      await fetchData(apiResources[i]);
    }
    this.setState({ data: obj, errorMsg: errorMsg })

    async function fetchData(resource: string) {
      try {
        const response = await fetch(apiURL + resource);
        const json = await response.json();
        const { articles } = json;
        if (articles ) {
          articles.forEach( (article:Article) => {
            obj.push(article);
          })
        }
      } catch (error) {
        errorMsg = error;
        console.error(error);
      }
    }
  }

  render() {
    return (
      <div id="Content">
        <nav></nav>
        <main>
          {Object.keys(this.state.data).length === 0 ?
            <p>Loading...</p>
            :
            <div>
              {
                this.state.data.map(article => (
                  <ListItem key={article.id} {...article} />
                ))}
            </div>
          }
        </main>
      </div>
    )
  }
}

export default List;
