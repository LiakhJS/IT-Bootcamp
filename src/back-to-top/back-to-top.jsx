import React from 'react';
import { ReactComponent as BackToTopIcon } from '../assets/back-to-top-arrow.svg';

import './back-to-top.scss';
export const BackToTop = ({onClick}) => {
    return (
        <div className='back-to-top__wrapper' onClick={onClick}>
            <BackToTopIcon />
        </div>
    );
};

