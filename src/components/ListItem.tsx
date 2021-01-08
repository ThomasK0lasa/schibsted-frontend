import { FC } from 'react';
import './ListItem.css';
import { IArticle } from '../interfaces/Article';

const ListItem:FC<IArticle> = (props) => {
  // Not adding a placeholder for No-image cases
  return (
    <article>
      {props.image !== '' ?
        <div className='articleImgBox'>
          <img className='articleImg' src={props.image} alt={`${props.title}`} />
        </div>
        :
        null
      }
      <div className='articleContent'>
        <h2 className='articleTitle'>{props.title}</h2>
        <p className='articleDate'>{props.date}</p>
        <p className='articleIntro'>{props.preamble}</p>
      </div>
      <a className='articleMore' href='/' title={'Read more '+props.title}>read more</a>
    </article>
  );
}

export default ListItem;
