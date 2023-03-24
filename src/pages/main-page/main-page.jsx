import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ListWithPagination } from '../../list-with-pagination';
import { List } from '../../list/list';
import './main-page.css';
import { BackToTop } from '../../back-to-top';

import { setCurrentPage } from '../../redux/character';
import { CardModal } from '../../card-modal';
// import { CardModal } from '../../card-modal';
export const MainPage = () => {
    const dispatch = useDispatch();
    // const [userCardOpened, setUserCardOpened] = useState(false);
    const [isPagination, setIsPagination] = useState(false);

    // const [currentUser, setCurrentUser]=useState([]);
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
    const userCardOpened=useSelector((state)=> state.character.userCardOpened);
        // const closeCurrentCardModal=()=> {
        //   setUserCardOpened(false);
          
        //   }
 
    return (
        <div className="wrapper">
            <header><h2>IT Bootcamp</h2></header>
            <main>
                {isPagination === false && <List />}

                {isPagination === true && <ListWithPagination/>}

{userCardOpened&& <CardModal />}
            </main>
            <footer className={isPagination? 'pagination-is-active' : null}>
                <button onClick={setPagination}>{isPagination ? 'Dynamic ScrollView' : 'Pagination'}</button>
                <BackToTop isPagination={isPagination} onClick={moveToTop} />
            </footer>
        </div>
    );
}


