import { useState } from 'react';
import './ListSort.css';
import query from '../utils/query';
import sortSVG from '../assets/gfx/sort.svg';
import sortUpSVG from '../assets/gfx/sort_up.svg';
import sortDownSVG from '../assets/gfx/sort_down.svg';

interface Props {
  sort: (dir: string) => void;
}

function ListFilter(props: Props) {
  const iconMapping: { [key: string]: string } = {
    'natural': sortSVG,
    'asc': sortUpSVG,
    'dsc': sortDownSVG,
  }

  function sort() {
    let newDir = (dir === 'natural' || dir === 'asc') ? 'dsc' : 'asc';
    setDir(newDir);
    props.sort(newDir);
    query.setSort(newDir);
  }

  // initial sorting if query 
  let newDir = 'natural';
  if (query.checkParamKey('s')) {
    newDir = (query.checkParamValue('dsc')) ? 'dsc' : 'asc';
  }
  const [dir, setDir] = useState(newDir);

  return (
    <button className="sort-date-btn" onClick={sort}><span className="text">Sort By Date</span><img className="icon" src={iconMapping[dir]} alt="sorting icon" /></button>
  );
}

export default ListFilter;
