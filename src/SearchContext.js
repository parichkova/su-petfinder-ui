import React from 'react';

const SearchContext = React.createContext({
  location: '',
  breed: '',
  animal: '',
  breeds: [],
  handleAnimalChange() {},
  handleLocationChange() {},
  handleBreedChange() {},
  getBreeds() {}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;