import query from '../utils/query';
import './ListFilter.css';

interface props {
  types: Array<string>,
  active: Array<string>,
  selected: Array<string>,
  select: (newSelection: Array<string>) => void
}

function ListFilter(props: props) {
  // disabling checkboxes for broken APIs and in case there's only one working API  
  function disabled(type: string) {
    if (props.types.length - props.active.length === 1) {
      return true;
    } else {
      return props.active.indexOf(type) !== -1 ? false : true;
    }
  }

  // setting checked
  function checked(type: string) {
    return props.selected.indexOf(type) !== -1 ? true : false;
  }

  function select(element: any, type: string ) {
    const target = element.target;
    let newSelected: Array<string> = props.selected.slice();
    if (target.checked) {
      newSelected.push(type);
    } else {
      const index = props.selected.indexOf(type);
      newSelected.splice(index, 1);
    }
    query.setType(newSelected, props.types.length);
    props.select(newSelected);
  }

  // handling enter key on checkbox
  function keyDown(e: React.KeyboardEvent, type: string ) {
    if (e.key === 'Enter') {
      select(e, type);
    }
  }

  return (
    <nav>
      <p>Data sources: </p>
      <ul>
        {props.types.map(type => {
          return (
            <li key={type} className={disabled(type) ? 'disabled' : ''}>
              <label className="checkbox-container">
                <input type="checkbox"
                  disabled={disabled(type)}
                  checked={checked(type)}
                  onChange={ e => select(e, type)}
                  onKeyPress={ e => keyDown(e, type)} />
                  <span className="checkmark"></span>
                  <span className="checkbox-title">{type}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </nav>
  );
}

export default ListFilter;
