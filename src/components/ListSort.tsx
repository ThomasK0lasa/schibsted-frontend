import React from 'react';
import './ListSort.css';
import sortSVG from '../assets/gfx/sort.svg';
import sortUpSVG from '../assets/gfx/sort_up.svg';
import sortDownSVG from '../assets/gfx/sort_down.svg';

interface Props {
  sort: () => void;
  currDir: string;
}

function ListFilter(props: Props)  {
  const iconMapping: { [key: string]: string } = {
    'natural': sortSVG,
    'asc': sortUpSVG,
    'dsc': sortDownSVG,
  }
  
  return (
    <button className="sort-date-btn" onClick={props.sort}><span className="text">Sort By Date</span><img className="icon" src={iconMapping[props.currDir]} alt="sorting icon"/></button>
  );
}

export default ListFilter;
