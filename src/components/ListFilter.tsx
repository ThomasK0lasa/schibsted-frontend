import { FC } from 'react';
import query from '../utils/query';
import './ListFilter.css';

interface IProps {
  types: string[],
  active: string[],
  selected: string[],
  select: (newSelection: string[]) => void
}

const ListFilter:FC<IProps> = ( props ) => {
  const isDisabled = (type: string) => {
    return !props.active.includes(type);
  }

  const isChecked = (type: string) => {
    return props.selected.includes(type);
  }

  // handling click on checkbox
  const onClick = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    select(e.target.checked, type);
  }
  
  // handling enter key on checkbox
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: string) => {
    if (e.key === 'Enter') {
      select(!e.currentTarget.checked, type);
    }
  }

  const select = (state: Boolean, type: string) => {
    let newSelected = [...props.selected];
    if (state) {
      newSelected.push(type);
    } else {
      newSelected = newSelected.filter(ele => ele !== type);
    }
    query.setType(newSelected, props.types.length);
    props.select(newSelected);
  }

  return (
    <nav>
      <p>Data sources: </p>
      <ul>
        {props.types.map(type => {
          return (
            <li key={type} className="itemsFilter">
              <label className={`checkboxContainer ${isDisabled(type) ? 'disabled' : ''}`}>
                <input type="checkbox" className="checkbox"
                  disabled={isDisabled(type)}
                  checked={isChecked(type)}
                  onChange={e => onClick(e, type)}
                  onKeyPress={e => onKeyDown(e, type)} />
                <span className="checkmark"></span>
                <span className="checkboxTitle">{type}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </nav>
  );
}

export default ListFilter;
