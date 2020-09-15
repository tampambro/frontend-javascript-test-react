import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../fontawasomeLibrary';

import './index.css';


const Loading = () => (
  <div className="spinner">
    <FontAwesomeIcon icon="spinner" size="4x" spin />
  </div>
);

export default Loading;
