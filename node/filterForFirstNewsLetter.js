let filterForFirstNewsLetter = (subscribers) => {
  return subscribers.filter(subscriber => subscriber['1e via email'].trim() === 'x');
};

module.exports = {
  filterForFirstNewsLetter: filterForFirstNewsLetter
};