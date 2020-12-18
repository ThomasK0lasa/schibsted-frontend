import { Article } from "../interfaces/Article";

// data sorting function
const sortData = (newDir: string, data: Array<Article>) => {
  if (newDir === 'dsc') {
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
const trans: { [key: string]: string } = {
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
  adate[1] = trans[adate[1]];
  bdate[1] = trans[bdate[1]];
  adate[0] = adate[0].slice(0, -1); //removing dot from date as Firefox cant handle it
  bdate[0] = bdate[0].slice(0, -1); //removing dot from date as Firefox cant handle it
  return Date.parse(adate.join(' ')) - Date.parse(bdate.join(' '));
}

export default sortData;