// I am not supporting history so that's why I am replacing state instead of pushing new one
const query = { 

  setSort: function (sort: string) {
    const params = new URLSearchParams(window.location.search);
    params.set('s', sort);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  },

  checkParamValue: function (param: string) {
    const params = new URLSearchParams(window.location.search);
    let exists = false;
    params.forEach((value) => {
      if (param === value) {
        exists = true;
      }
    })
    return exists;
  },

  checkParamKey: function (key: string) {
    const params = new URLSearchParams(window.location.search);
    return params.has(key) ? true : false;
  },

  setType: function (selectedTypes: string[], allTypesCount: number) {
    const params = new URLSearchParams(window.location.search);
    if (selectedTypes.length !== 0 && selectedTypes.length !== allTypesCount) {
      params.delete("t");
      selectedTypes.forEach(type => {
        params.append('t', type);
      });
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    } else {
      if (params.has('s')) {
        params.delete("t");
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
      } else {
        window.history.replaceState({}, '', `${window.location.pathname}`);
      }
    }
  }
}

export default query;
