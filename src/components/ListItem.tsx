import './ListItem.css';
import { Article } from './ArticleInterface';

function ListItem(props:Article) {
  return (
    <article data-id={props.id} data-cat={props.category}>
      {props.date}
      {props.title}
      {props.image}
      {props.category}
      {props.preamble}
    </article>
  );
}

export default ListItem;
