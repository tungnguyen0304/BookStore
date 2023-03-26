import React, { useState } from 'react';
import ModalLogin from './ModalLogin';

function ButtonModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setShowModal(true)}>Đăng nhập</button>
      {showModal ? (
        <ModalLogin onClose={() => setShowModal(false)} />
      ) : null}
    </div>
  );
}

export default ButtonModal;




