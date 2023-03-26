import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setCurrentPage } from '../../redux/characters';
import { ListWithPagination } from '../../components/list-with-pagination';
import { ListScrollView } from '../../components/list-scroll-view';
import { BackToTop } from '../../components/back-to-top';
import { CardModal } from '../../components/card-modal';

import './main-page.scss';

export const MainPage = () => {
    const dispatch = useDispatch();
    const [isPagination, setIsPagination] = useState(false);
    const userCardIsOpened = useSelector((state) => state.characters.userCardIsOpened)

    const moveToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const setPagination = () => {
        setIsPagination(!isPagination);
        dispatch(setCurrentPage(1))
    }

    return (
        <div className="wrapper">
            <header>
                <h2>IT Bootcamp</h2>
            </header>
            <main>
                {isPagination === false && <ListScrollView />}
                {isPagination === true && <ListWithPagination />}
                {userCardIsOpened && <CardModal />}
            </main>
            <footer className={isPagination ? 'pag-is-active' : 'null '}>
                <button onClick={setPagination}>
                    {isPagination ? 'Dynamic ScrollView' : 'Pagination'}
                </button>
                <BackToTop isPagination={isPagination} onClick={moveToTop} />
            </footer>
        </div>
    );
}


