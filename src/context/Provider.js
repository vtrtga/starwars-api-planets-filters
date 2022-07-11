import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [planets, setPlanets] = useState([]);

  //   console.log(planets);
  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((res) => res.json())
      .then((data) => {
        setPlanets(data);
      });
    setLoading({ isLoading: false });
  }, []);

  const context = {
    ...planets,
    isLoading,
  };
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
