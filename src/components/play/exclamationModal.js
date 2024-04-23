import React, { useState } from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

const ExclamationModal = ({ isOpen, onClose }) => {
    const [like, setLike] = useState('');

    if (!isOpen) return null;

    return (
        <div>
            <div className="modal-overlay">
                <div className="modal-content">
                    <IoClose onClick={onClose} className="modal-close" aria-label="Close modal" />

                    <p className='modal-title'>Memorize this picture! </p>
                    <p className='modal-body'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit saepe tenetur quae reiciendis earum laborum non aliquid alias eum, molestiae tempora dolore magnam numquam ullam placeat error? Commodi, recusandae aliquid!
                    </p>

                    <div className='modal-feedback'>
                        <p className='font-semibold'>Did you find it helpful?</p>
                        <AiFillLike
                            onClick={() => setLike('like')}
                            className={`feedback-icon ${like === 'like' ? 'active' : ''}`}
                        />
                        <AiFillDislike
                            onClick={() => setLike('disLike')}
                            className={`feedback-icon ${like === 'disLike' ? 'active' : ''}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExclamationModal;