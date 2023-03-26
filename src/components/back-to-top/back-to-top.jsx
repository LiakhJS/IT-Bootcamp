import { ReactComponent as BackToTopIcon } from '../../assets/back-to-top-arrow.svg';

import './back-to-top.scss';

export const BackToTop = ({ onClick, isPagination }) => {
    return (
        <div className={isPagination ? 'back-to-top__wrapper pagination-is-active' : 'back-to-top__wrapper'} onClick={onClick}>
            <BackToTopIcon />
        </div>
    );
};

