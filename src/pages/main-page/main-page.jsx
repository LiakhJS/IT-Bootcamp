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
    const isPagination = useSelector((state) => state.character.isPagination);

    return (
        <div className="wrapper">
            <header>Bootcamp</header>
            <main>
                {isPagination === false && <List  />}

                {isPagination === true && <ListWithPagination />}

            </main>
            <footer><button type='button' onClick={() => dispatch(setIsPagination(!isPagination))}>Pagination</button></footer>
        </div>
    );
}


