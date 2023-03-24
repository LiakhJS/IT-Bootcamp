import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Card } from '../card';
import { CardModal } from '../card-modal';
import { Error } from '../error';
import { Loader } from '../loader';
import { getCharacterThunk } from '../redux/character';
import { setCurrentPage } from '../redux/character';
import { createPages } from '../redux/utils';

// import axios from 'axios';
import './list-with-pagination.scss';

export const ListWithPagination = ({ openCurrentCardModal, userCardOpened, closeCurrentCardModal }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.character.currentPage);
  const loadingStatus = useSelector((state) => state.character.status);
  const books = useSelector((state) => state.character.characters)
  let initialized2 = false;

  useEffect(() => {
    if (!initialized2) {
      initialized2 = true;
      dispatch(getCharacterThunk(currentPage))
    }
  },
    [currentPage]
  );

  const totalPagesCount = useSelector((state) => state.character.pages);

  const pagesCount = totalPagesCount;
  const pages = [];
  // const pages = Array.from({ length: totalPagesCount }, (_, index) => index + 1);
  // console.log(pages);



  createPages(pages, pagesCount, currentPage);
  console.log(pages);
  
  return (
    <React.Fragment>
      {loadingStatus === 'pending' && <Loader />}
      {loadingStatus === 'rejected' && <Error />}
      {loadingStatus === 'resolved' &&
        <div className="App">
          <div className='app-cards'>
            {books.map((card) => <Card card={card} />
            )}

          </div>
          {userCardOpened && <CardModal />}
          <div className="flex">
            <ul>
              {pages.map((page, index) => <li
                key={index}
                className={currentPage === page ? "current-page" : "page"}
                onClick={() => dispatch(setCurrentPage(page))}>
                {page}</li>)}
              <div className='bar'></div>
            </ul>

          </div>
        </div>
      }
    </React.Fragment>
  );
}


