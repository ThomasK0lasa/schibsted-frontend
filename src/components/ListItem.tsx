import './ListItem.css';
import { Article } from '../interfaces/Article';

function ListItem(props: Article) {
  // Leaving the data-id and data-cat for debugging purpose
  // Not adding a placeholder for No-image cases
  return (
    <article data-id={props.id} data-cat={props.category}>
      {props.image !== '' ?
        <div className='article-img-box'>
          <img className='article-img' src={props.image} alt={`${props.title}`} />
        </div> :
        ''
      }
      <div className='article-content'>
        <h2 className='article-title'>{props.title}</h2>
        <p className='article-date'>{props.date}</p>
        <p className='article-intro'>{props.preamble}</p>
      </div>
      <a className='article-more' href='/' title={'Read more '+props.title}>read more</a>
    </article>
  );
}

export default ListItem;
