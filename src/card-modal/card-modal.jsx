import { setIsClosedUserCard } from '../redux/characters';
import { useDispatch, useSelector } from 'react-redux';

import './card-modal.scss';

export const CardModal = () => {
    const currentUser = useSelector((state) => state.characters.currentUser);
    const dispatch = useDispatch();

    const closeModalWindow = () => {
        dispatch(setIsClosedUserCard());
    }

    const userCardIsOpened = useSelector((state) => state.characters.userCardIsOpened);
    if (userCardIsOpened) {
        window.addEventListener('scroll', () => {
            dispatch(setIsClosedUserCard());
        });
    }
    return (
        <div className='card-modal__wrap' onClick={closeModalWindow}>
            <div className="user-card">
                <img className="user-card__avatar"
                    src={currentUser.image}
                    alt={`${currentUser.id} ${currentUser.name}`}>
                </img>
                <div className="user-card__inf">
                    <div className="user-card__inf_col1">
                        <div>
                            <h3>Name</h3>
                            <span>{currentUser.name}</span>
                        </div>
                        <div>
                            <h3>Status</h3>
                            <span>{currentUser.status}</span>
                        </div>
                        <div>
                            <h3>Species</h3>
                            <span>{currentUser.species}</span>
                        </div>
                    </div>
                    <div className="user-card__inf_col2">
                        <div>
                            <h3>Origin</h3>
                            <span>{currentUser.origin.name}</span>
                        </div>
                        <div>
                            <h3>Location</h3>
                            <span>{currentUser.location.name}</span>
                        </div>
                        <div>
                            <h3>Gender</h3>
                            <span>{currentUser.gender}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
