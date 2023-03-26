import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../card';
import { Error } from '../error';
import { Loader } from '../loader';
import { getCharactersThunk, setCurrentPage } from '../../redux/characters';
import { createPagesArray } from '../utils/utils';

import './list-with-pagination.scss';

export const ListWithPagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.characters.currentPage);
  const loadingStatus = useSelector((state) => state.characters.status);
  const usersCards = useSelector((state) => state.characters.characters);
  const totalPagesCount = useSelector((state) => state.characters.allPages);


  const pagesCount = totalPagesCount;
  
  let isFetching = false;
  const pages = [];

  useEffect(() => {
    if (!isFetching) {
      isFetching = true;
      dispatch(getCharactersThunk(currentPage))
    }
  }, [currentPage]);

  createPagesArray(pages, pagesCount, currentPage);

  return (
    <React.Fragment>
      {loadingStatus === 'pending' && <Loader />}
      {loadingStatus === 'rejected' && <Error />}
      {loadingStatus === 'resolved' &&
        <div className="card-list">
          <div className='card-list__cards'>
            {usersCards.map((card, index) => <Card userCard={card} key={index} />
            )}
          </div>
          <div className="card-list__pag">
            <ul>
              {pages.map((page, index) => <li
                key={index}
                className={currentPage === page ? "current-page" : 'page'}
                onClick={() => dispatch(setCurrentPage(page))}>
                {page}</li>)}
              <div className='card-list__pag_hover-line'></div>
            </ul>
          </div>
        </div>
      }
    </React.Fragment>
  );
}


