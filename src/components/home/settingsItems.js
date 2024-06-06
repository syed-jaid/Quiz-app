import React from 'react';
import { IoClose } from 'react-icons/io5';

const SettingsItems = ({ setShowSettings }) => {

    const infoSections = [
        { id: 1, title: 'Feedback', linkText: 'Email', href: 'mailto:syed.jaid.7748@gmail.com' },
        { id: 2, title: 'Report a Bug', linkText: 'Email', href: 'mailto:syed.jaid.7748@gmail.com' },
        { id: 3, title: 'Questions ?', linkText: 'FAQ', href: '/faq' }
    ];

    return (
        <div className='setting-div'>

            <IoClose onClick={() => setShowSettings(false)} className='close-icon' />
            <p className='setting-text'>SETTING</p>

            {infoSections.map((section) => (
                <div key={section.id} className='setting-section'>
                    <p>{section.title}</p>
                    <a href={section.href}>
                        <p className='link-text'>{section.linkText}</p>
                    </a>
                </div>
            ))}
        </div>

    );
};

export default SettingsItems;