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
  let newDir = 'natural';
  if (query.checkParamKey('s')) {
    newDir = (query.checkParamValue('dsc')) ? 'dsc' : 'asc';
  }
  const [dir, setDir] = useState(newDir);
  
  const callSort = () => {
    let newDir = (dir === 'natural' || dir === 'asc') ? 'dsc' : 'asc';
    setDir(newDir);
    sort(newDir);
    query.setSort(newDir);
  }

  return (
    <button className="sortDateBtn" onClick={callSort}>
      <span className="text">Sort By Date</span>
      <img className="icon" src={iconMapping[dir]} alt="sorting icon" />
    </button>
  );
}

export default ListFilter;
