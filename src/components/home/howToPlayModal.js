import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { AiFillLike, AiFillDislike } from "react-icons/ai";

const HowToPlayModal = ({ isOpen, onClose }) => {
    const [like, setLike] = useState('');

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <IoClose onClick={onClose} className="modal-close" aria-label="Close modal" />

                <p className='modal-title'>How To Play ?</p>
                <p className='modal-body'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis animi, tempora eius repellendus porro totam dolorum non sunt facere suscipit impedit ullam qui libero natus aperiam illum debitis praesentium excepturi assumenda ipsum amet, eligendi blanditiis consectetur quae! Doloremque, quasi? Voluptatum exercitationem natus cupiditate nostrum pariatur, quis sapiente. Itaque eius iusto minus quod reprehenderit fugit pariatur ipsum exercitationem! Ex dolores est ratione aliquam ut, iure repudiandae minima quia, hic culpa, minus error odio. Temporibus mollitia nulla reprehenderit voluptatem id natus, earum iure eaque saepe qui, ut pariatur tenetur, expedita quidem corrupti velit. Ipsa molestiae aut illo sint delectus corporis neque libero!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis animi, tempora eius repellendus porro totam dolorum non sunt facere suscipit impedit ullam qui libero natus aperiam illum debitis praesentium excepturi assumenda ipsum amet, eligendi blanditiis consectetur quae! Doloremque, quasi? Voluptatum exercitationem natus cupiditate nostrum pariatur, quis sapiente. Itaque eius iusto minus quod reprehenderit fugit pariatur ipsum exercitationem! Ex dolores est ratione aliquam ut, iure repudiandae minima quia, hic culpa, minus error odio. Temporibus mollitia nulla reprehenderit voluptatem id natus, earum iure eaque saepe qui, ut pariatur tenetur, expedita quidem corrupti velit. Ipsa molestiae aut illo sint delectus corporis neque libero!
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
    );
};

export default HowToPlayModal;
