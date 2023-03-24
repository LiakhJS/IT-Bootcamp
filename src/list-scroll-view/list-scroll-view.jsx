import React, { useState, useEffect } from 'react';
import { Loader } from '../loader';
import { Error } from '../error';
import { Card } from '../card';

import '../pages/main-page/main-page.css';
import './list-scroll-view.scss';

export const ListScrollView = () => {
  let isFetching = false;
  let isRendering = false;
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState('pending');
  const [pageCoordinates, setPageCoordinates] = useState(0);

  const getCharacters = (page) => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then(
      (res) => {
        return res.json();
      }
    )
      .then(
        (data) => {
          setLoadingStatus('resolved');
          setUsers([...users, ...data.results]);
        })
      .catch((error) => {
        setLoadingStatus('rejected');
      })
  }

  useEffect(() => {
    if (!isRendering) {
      isRendering = true;
      setLoadingStatus('pending');
      setTimeout(() => {
        getCharacters(page);
      }, 500)
    }
  }, [page]
  )
  useEffect(() => {
    document.documentElement.scrollTo(0, pageCoordinates);
  }, [loadingStatus]);

  useEffect(() =>
    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight === document.documentElement.offsetHeight) {
        if (!isFetching) {
          isFetching = true;
          setPage(page + 1);
          setPageCoordinates(window.scrollY);
        }
      }
    }))

  return (
    <React.Fragment>
      {loadingStatus === 'pending' && <Loader />}
      {loadingStatus === 'rejected' && <Error />}
      {loadingStatus === 'resolved' &&
        <div className="card-list">
          <div className='card-list__cards'>
            {users.map((user, index) =>
              <Card userCard={user}  key={index} />
            )}
          </div>
        </div>}
    </React.Fragment>
  );
}