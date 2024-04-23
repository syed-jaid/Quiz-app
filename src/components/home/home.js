import React, { useEffect, useState } from 'react';
import SettingsItems from './settingsItems';
import HowToPlayModal from './howToPlayModal';
import { Authenticator } from '@aws-amplify/ui-react';
import { IoMdSettings } from 'react-icons/io';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [showSettings, setShowSettings] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userLogIn, setIsUserLogIn] = useState(false);
    const [result, setResult] = useState()
    let navigate = useNavigate();

    useEffect(() => {
        let UserObject = localStorage.getItem('UserGamePlay')
        UserObject = JSON.parse(UserObject)
        setResult(UserObject)
        if (localStorage.getItem('userLogIn') === 'true') {
            setIsUserLogIn(true)
        }
    }, [])

    const handleNavigate = (path) => {
        navigate(path);
    }

    return (
        <div className='bg-[#E3E3E1]'>
            <div className='home-main-div'>

                <IoMdSettings
                    onClick={() => setShowSettings(!showSettings)}
                    className={`settings-icon ${showSettings ? 'rotate-icon-click' : 'rotate-icon'}`}
                />

                {showSettings && <SettingsItems {...{ setShowSettings }} />}

                <div className="flex-container">
                    <div className="logo-container">
                        <img
                            className="logo-image"
                            src="https://i.ibb.co/JkPGn5d/noun-counting-154887-Photoroom.png"
                            alt="logo of quiz app"
                        />
                    </div>

                    <h1 className="header">Teach Me To Count!</h1>
                    <p className="paragraph">
                        Get 3 Chances To Guess The Right Answers.
                        <br className="br-hidden" />{' '}
                        Learn Counting Now...!
                    </p>

                    <div className="button-container">
                        {result?.game_data?.game?.status === 'COMPLETED' ?
                            ''
                            :
                            <button onClick={() => setIsModalOpen(true)} className="button">
                                How To Play
                            </button>
                        }
                        {userLogIn ?
                            <Authenticator>
                                {({ signOut, user }) => (
                                    <button
                                        className="button"
                                        onClick={() => {
                                            localStorage.setItem('userLogIn', false)
                                            signOut()
                                            setIsUserLogIn(false)
                                        }}
                                    >
                                        Log Out
                                    </button>
                                )}
                            </Authenticator>
                            :
                            <button
                                className="button"
                                onClick={() => handleNavigate('/auth')}
                            >
                                Log In
                            </button>
                        }
                        <button
                            className="button special-button"
                            onClick={() => handleNavigate('/play')}
                        >
                            {result?.game_data?.game?.status === 'COMPLETED' ? 'See Stats' : 'Play'}
                        </button>
                    </div>

                    <p className="date-display">
                        Today's Date: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
            <HowToPlayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default HomePage;
