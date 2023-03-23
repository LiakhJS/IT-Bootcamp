import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCharacterThunk } from '../redux/character';
import { setCurrentPage } from '../redux/character';
import axios from 'axios';
import './list.css';

export const List = () => {
  // const dispatch = useDispatch();
  // const currentPage = useSelector((state) => state.character.currentPage);
  // let initialized1 = false;
  // let initialized2 = false;



  // useEffect(() => {

  //   if (!initialized1) {
  //     initialized1 = true;
  //     dispatch(getCharacterThunk(Number(currentPage)))
  //   }
  // },
  //   [currentPage]
  // );

  // useEffect(() => {
  //   document.addEventListener('scroll', (e) => {
  //     if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
  //       if (!initialized2) {
  //         initialized2 = true;
  //         dispatch(setCurrentPage(currentPage + 1));
  //         console.log(currentPage);

  //       }
  //     }
  //   })
  // }
  //   , [currentPage])


  let initialized1 = false;
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading,setIsLoading] =useState(false)
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

  return (
  isLoading && 
<div className="App">
      <div>
        {books.map((card) =><div>
        <div>{card.id}</div>
        <img src={card.image} alt='card.id'></img>
          <div>{card.name}</div>
          </div>
        )}
      </div>
    </div>
  );
}


