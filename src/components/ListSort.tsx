import { FC, useState } from 'react';
import './ListSort.css';
import query from '../utils/query';
import sortSVG from '../assets/gfx/sort.svg';
import sortUpSVG from '../assets/gfx/sort_up.svg';
import sortDownSVG from '../assets/gfx/sort_down.svg';

interface IProps {
  sort: (dir: string) => void;
}

const ListFilter: FC<IProps> = ({ sort }) => {
  const iconMapping: { [key: string]: string } = {
    'natural': sortSVG,
    'asc': sortUpSVG,
    'dsc': sortDownSVG,
  }

  // initial sorting if query 
  let initDirection = 'natural';
  if (query.checkParamKey('s')) {
    initDirection = (query.checkParamValue('dsc')) ? 'dsc' : 'asc';
  }
  const [direction, setDirection] = useState(initDirection);
  
  const callSort = () => {
    let newDirection = (direction === 'natural' || direction === 'asc') ? 'dsc' : 'asc';
    setDirection(newDirection);
    sort(newDirection);
    query.setSort(newDirection);
  }

  return (
    <button className="sortDateBtn" onClick={callSort}>
      <span className="text">Sort By Date</span>
      <img className="icon" src={iconMapping[direction]} alt="sorting icon" />
    </button>
  );
}

export default ListFilter;
