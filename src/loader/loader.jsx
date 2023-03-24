import { ReactComponent as LoaderIcon } from '../assets/loader.svg';

import './loader.scss';

export const Loader = () => (
  <div className='container' >
    <div className='loader'>
      <LoaderIcon />
    </div>
  </div>
);
