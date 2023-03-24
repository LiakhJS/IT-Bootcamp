
import './card.css';
import { useDispatch } from 'react-redux';
import { setOpenedUserCard } from '../redux/character';
export const Card = ({ card }) => {
  const dispatch = useDispatch();

  return (
    <div className='card__wrap' onClick={() => dispatch(setOpenedUserCard(card))}>
      <div className='card__wrap_img'>
        <img src={card.image} alt='card.id'></img>
      </div>
      <h2>{card.name}</h2>
    </div>
  );
}
