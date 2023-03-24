import { ReactComponent as LoaderIcon } from '../assets/loader.svg';

import './loader.css';

export const Loader = () => (
  <div className='container' data-test-id='loader'>
    <div className='loader'>
      <LoaderIcon />
    </div>
  </div>
);
