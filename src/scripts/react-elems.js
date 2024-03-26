import React, { useState } from 'react';
import './styles.css'; // Import CSS for styling
import { ReactDOM } from 'react-dom';

function ImageModal() {
    return (
        <div>
            <img src='/images/pic1.svg' alt="Image" data-bs-toggle="modal" data-bs-target="#imageExample" />
            <div className="modal-overlay" id="imageExample" tabIndex={-1} aria-hidden="true">
                <div className="modal-content">
                    <div className='modal-body'>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        <img src="/images/pic1.svg" className='d-block w-100'></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageModal;

ReactDOM.render(
    <React.StrictMode>
        <ImageModal />
    </React.StrictMode>,
    document.getElementById('react-modal-container')
);