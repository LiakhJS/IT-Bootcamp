import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCharacterThunk } from '../redux/character';
import { setCurrentPage } from '../redux/character';
// import axios from 'axios';
import './list-with-pagination.css';

export const ListWithPagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.character.currentPage);
  const loadingState = useSelector((state) => state.character.status);
  const books = useSelector((state)=> state.character.characters)
  let initialized2 = false;

  useEffect(() => {
    if (!initialized2) {
      initialized2 = true;
      dispatch(getCharacterThunk(currentPage))
    }
  },
    [currentPage]
  );
  
  const totalPagesCount = useSelector((state)=>  state.character.pages)
const pages = Array.from({length: totalPagesCount}, (_, index) => index + 1);
console.log(pages);

  return (
  loadingState === 'resolved' && 
<div className="App">
      <div>
        {books.map((card) =><div>
        <div>{card.id}</div>
        <img src={card.image} alt='card.id'></img>
          <div>{card.name}</div>
          </div>
        )}
      </div>
      <div className="pages">
                {pages.map((page, index) => <span
                    key={index}
                    className={currentPage === page ? "current-page" : "page"}
                    onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
            </div>
    </div>
  );
}


