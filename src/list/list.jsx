import React, { useState, useEffect } from 'react';
import { Loader } from '../loader';
import { Error } from '../error';
import './list.css';
import { Card } from '../card';
import { CardModal } from '../card-modal';
import { createPages } from '../redux/utils';


export const List = () => {
  let initialized1 = false;
  let initialized2 = false;
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingStatus, setIsLoadingStatus] = useState('pending');
  const [pageCoordinates, setPageCoordinates] = useState(0);


  const generateMoreDogImage = (page) => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then(
      (res) => {
        return res.json();
      }
    )
      .then(
        (data) => {
          setIsLoadingStatus('resolved');
          setBooks([...books, ...data.results]);

        })
      .catch((error) => {
        setIsLoadingStatus('rejected');
        console.log(error.name);
      })
  }

  useEffect(() => {
    if (!initialized2) {
      initialized2 = true;
      setIsLoadingStatus('pending');
      setTimeout(() => {
        generateMoreDogImage(page);
      }, 500)
    }
  }, [page]
  )
  useEffect(() => {
    document.documentElement.scrollTo(0, pageCoordinates);
  }, [isLoadingStatus]);

  useEffect(() =>
    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight === document.documentElement.offsetHeight) {
        if (!initialized1) {
          initialized1 = true;
          setPage(page + 1);
          setPageCoordinates(window.scrollY);
        }
      }
    }))

  return (
    <React.Fragment>
      {isLoadingStatus === 'pending' && <Loader />}
      {isLoadingStatus === 'rejected' && <Error />}
      {isLoadingStatus === 'resolved' &&
        <div className="App">
          <div className='app-cards'>
            {books.map((card) => <Card card={card}  />
            )}
            
          </div>

        </div>}
    </React.Fragment>
  );
}