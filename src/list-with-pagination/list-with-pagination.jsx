import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Card } from '../card';
import { CardModal } from '../card-modal';
import { Error } from '../error';
import { Loader } from '../loader';
import { getCharacterThunk } from '../redux/character';
import { setCurrentPage } from '../redux/character';

// import axios from 'axios';
import './list-with-pagination.css';

export const ListWithPagination = ({openCurrentCardModal, userCardOpened, closeCurrentCardModal}) => {
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
    const pages = []
  // const pages = Array.from({ length: totalPagesCount }, (_, index) => index + 1);
  // console.log(pages);


  const createPages=(pages, pagesCount, currentPage)=> {
    if(pagesCount > 10) {
        if(currentPage > 5) {
            for (let i = currentPage-4; i <= currentPage+5; i++) {
                pages.push(i)
                if(i == pagesCount) break
            }
        }
        else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i)
                if(i == pagesCount) break
            }
        }
    }  else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
}

  createPages(pages, pagesCount, currentPage);
  return (
    <React.Fragment>
      {loadingStatus === 'pending' && <Loader />}
      {loadingStatus === 'rejected' && <Error />}
      {loadingStatus === 'resolved' &&
        <div className="App">
        <div className='app-cards'>
          {books.map((card) => <Card card={card}  />
          )}
          
        </div>
      {userCardOpened && <CardModal />}
          <div className="pagination">
            {pages.map((page, index) => <span
              key={index}
              className={currentPage === page ? "current-page" : "page"}
              onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
          </div>
        </div>
      }
    </React.Fragment>
  );
}


