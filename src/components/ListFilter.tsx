import './ListFilter.css';

function ListFilter(props: {
  types: Array<string>,
  active: Array<string>,
  selected: Array<string>,
  select: (type: string) => void
}) {

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

  // calling select from parent on click
  function selection(type: string) {
    props.select(type);
  }

  // handling enter key on checkbox
  function keyDown(e: React.KeyboardEvent, type: string ) {
    if (e.key === 'Enter') {
      selection(type);
    }
  }

  //
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
                  onChange={() => selection(type)}
                  onKeyPress={e => keyDown(e, type)} />
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
