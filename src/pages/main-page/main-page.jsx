import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { ListWithPagination } from '../../list-with-pagination';
import { List } from '../../list/list';
import { setIsPagination } from '../../redux/character';

import './main-page.css';

export const MainPage = () => {
    const dispatch = useDispatch();
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    let initialized1 = false;

    const generateMoreDogImage = (page) => {
      fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then(
        (res) => {
          return res.json();
        }
      )
        .then(
          (data) => { 
          setIsLoading(true);
          setBooks([...books, ...data.results]) })
    }
  
    useEffect(() =>
      generateMoreDogImage(page), []
    )
    useEffect(() =>
    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop === document.documentElement.scrollHeight - window.innerHeight) {
          if (!initialized1) {
        initialized1 = true;
        setPage((prev) => prev + 1);
        generateMoreDogImage(page);
      }}
    }),[page])
  

    //   useEffect(() => {

    //       dispatch(getCharacterThunk(currentPage))
    //     }
    //   },
    //     [currentPage]
    //   );
    const isPagination = useSelector((state) => state.character.isPagination);

    return (
        <div className="wrapper">
            <header>Bootcamp</header>
            <main>
                {isPagination === false && <List books={books} isLoading={isLoading} />}

                {isPagination === true && <ListWithPagination />}

            </main>
            <footer></footer>
        </div>
    );
}


