import React from 'react';
import './loading.css'
import gear from '../../assets/Gear.svg';

function Loading() {
  return (
    <div className="loading">
      <img src={gear} alt="Engrenagem" />
    </div>
  )
}

export default Loading;
