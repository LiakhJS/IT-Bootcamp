import React, { useState, useEffect } from 'react';
import './list.css';

export const List = () => {
  let initialized1 = false;
  let initialized2 = false;
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

  useEffect(() => {
    if (!initialized2) {
      initialized2 = true;
    generateMoreDogImage(page)}}, [page]
  )
  useEffect(() =>
  window.addEventListener('scroll', () => {       
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) ===0){
        if (!initialized1) {
      initialized1 = true;
      setPage(page+1);
      console.log(page)
    }}
  }))
  
  console.log(page);
  console.log(books);

  return (
  isLoading && 
<div className="App">
      <div  className='app-cards'>
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