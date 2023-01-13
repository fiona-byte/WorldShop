const db = {
  insert: (data) => {
    localStorage.setItem('items', JSON.stringify(data));
  },

  findAll: () => {
    const data = localStorage.getItem('items');
    return data ? JSON.parse(data) : [];
  },

  find: (id) => {
    const data = localStorage.getItem('items');
    const parsedData = data ? JSON.parse(data) : [];
    return parsedData?.find((data) => data.id === id);
  },

  update: (id, item) => {
    const data = localStorage.getItem('items');
    const parsedData = data ? JSON.parse(data) : [];
    const currentData = parsedData?.find((data) => data.id === id);
    const currentDataIndex = parsedData?.findIndex((data) => data.id === id);
    if (currentData) {
      const updatedData = { ...currentData, ...item };
      const newData = parsedData.splice(currentDataIndex, 1, updatedData);
      localStorage.setItem('items', JSON.stringify(newData));
      return updatedData;
    }
  },

  delete: (id) => {
    const data = localStorage.getItem('items');
    const parsedData = data ? JSON.parse(data) : [];
    return parsedData?.filter((data) => data.id !== id) || [];
  },

  deleteAll: () => {
    localStorage.setItem('items', JSON.stringify([]));
    return [];
  },
};

export default Object.freeze(db);
