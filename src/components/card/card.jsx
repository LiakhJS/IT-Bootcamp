import { useDispatch } from 'react-redux';
import { setOpenedUserCard } from '../../redux/characters';

import './card.scss';

export const Card = ({ userCard }) => {
  const dispatch = useDispatch();
  return (
    <div className='card__wrap' onClick={() => dispatch(setOpenedUserCard(userCard))}>
      <div className='card__wrap_img'>
        <img src={userCard.image} alt={`${userCard.id} ${userCard.name}`}></img>
      </div>
      <h2 className='card__wrap_name'>{userCard.name}</h2>
    </div>
  );
}
