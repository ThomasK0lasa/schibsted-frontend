import { IArticle } from "../interfaces/Article";

// data sorting function
const sortData = (direction: string, data: IArticle[]) => {
  if (direction === 'dsc') {
    return data.sort((a, b) => {
      return sortByDate(b.date, a.date);
    })
  } else {
    return data.sort((a, b) => {
      return sortByDate(a.date, b.date)
    })
  }
}

// translations of months
const translate: { [key: string]: string } = {
  januar: 'January',
  februar: 'February',
  mars: 'March',
  april: 'April',
  mai: 'May',
  juni: 'June',
  juli: 'July',
  august: 'August',
  september: 'September',
  oktober: 'October',
  november: 'November',
  desember: 'December',
}

// sort by date function
function sortByDate(a: string, b: string) {
  const adate = a.trim().split(' ');
  const bdate = b.trim().split(' ');
  // example date format "1. oktober 2018" - 0: day, 1: month, 2: year
  adate[1] = translate[adate[1]];
  bdate[1] = translate[bdate[1]];
  adate[0] = adate[0].slice(0, -1); //removing dot from date as Firefox can't handle it
  bdate[0] = bdate[0].slice(0, -1); //removing dot from date as Firefox can't handle it
  return Date.parse(adate.join(' ')) - Date.parse(bdate.join(' '));
}

export default sortData;