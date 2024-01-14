

import { useState } from 'react';
import './App.css';
import Modal from './Modal';

export default function App() {
  const [isShow, setIsShow] = useState(false);
  const [isOfferAccepted, setIsOfferAccepted] = useState(false);

  const handleOpenModal = () => {
    setIsShow(true);
  }

  const handleOfferAccept = () => {
    setIsOfferAccepted(true);
    setIsShow(false);
  }

  const handleClose = () => {
    setIsShow(false);
  }
  return (
    <div>
      <div className="show-offer">
        {!isOfferAccepted && <button
          onClick={handleOpenModal}
          className="offer-btn"
        >Show Offer
        </button>}

        {
          isOfferAccepted &&
          <div style={{ fontSize: 50 }}>Offer Accepted</div>
        }
      </div>

      {
        isShow &&
        <Modal
          handleClose={handleClose}
          handleOfferAccept={handleOfferAccept}
        />
      }
    </div>
  )
}