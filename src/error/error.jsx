import { useState } from 'react';
import { ReactComponent as ErrorIcon } from '../assets/attention-icon.svg';
import { ReactComponent as CloseIcon } from '../assets/error-cross-icon.svg';

import classNames from 'classnames';
import './error.scss';

export const Error = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={classNames('error__wrap', { hidden: !isOpen })}>
      <div className='error__wrap_content'>
        <ErrorIcon /> Что-то пошло не так. Обновите страницу через некоторое время.
      </div>
      <button className='closeBtn' type='button' onClick={() => setIsOpen(false)}>
        <CloseIcon width='100%' height='100%' />
      </button>
    </div>
  );
};
