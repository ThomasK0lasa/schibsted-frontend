const query = {
  setType: function (types: Array<string>, typesCount: number) {
    const params = new URLSearchParams(window.location.search);
    if (types.length !== 0 && types.length !== typesCount) {
      params.delete("t");
      if (types.length !== typesCount) {
        types.forEach(type => {
          params.append('t', type);
        });
      }
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    } else {
      if (params.has('s')){
        params.delete("t");
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
      } else {
        window.history.replaceState({}, '', `${window.location.pathname}`);
      }
    }
  },
  
  setSort: function (sort: string) {
    const params = new URLSearchParams(window.location.search);
    params.set('s', sort)
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  },
  
  checkParamValue: function (param: string) {
    const params = new URLSearchParams(window.location.search);
    let exists = false;
    params.forEach( (value, key) => {
      if (param === value) {
        exists = true;
      }
    })
    return exists;
  },
  
  checkParamKey: function(key: string) {
    const params = new URLSearchParams(window.location.search);
    if (params.has(key)){
      return true;
    } else {
      return false;
    }
  }
}

export default query;
