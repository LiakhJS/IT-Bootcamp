import { setClosedUserCard } from '../redux/character';
import './card-modal.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export const CardModal = () => {
    const currentUser = useSelector((state) => state.character.currentUser);
    const dispatch = useDispatch();
    const closeModalWindow = () => {
        dispatch(setClosedUserCard());
    }
    const userCardOpened = useSelector((state) => state.character.userCardOpened);
    if (userCardOpened) {
    
        window.addEventListener('scroll', () => {

            dispatch(setClosedUserCard());
        }

        )
    }
    return (<div className='card-modal__wrap' onClick={closeModalWindow}>
        <div className="user-card">

            <img className="user-card__avatar" src={currentUser.image} alt='card.name'></img>
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
