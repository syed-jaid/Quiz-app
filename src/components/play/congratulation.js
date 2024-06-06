import React, { useEffect, useState } from 'react';
import { HiShare } from "react-icons/hi";

const Congratulation = ({ questions }) => {

    const [result, setResult] = useState()

    useEffect(() => {
        let UserObject = localStorage.getItem('UserGamePlay')
        UserObject = JSON.parse(UserObject)
        setResult(UserObject)
    }, [])

    return (
        <div className="congratulations-container">
            <p className='congratulation-header'>
                {result?.game_data?.game.currentScore === 0 ? 'Try Harder Next Time' : 'Congratulations!'}
            </p>
            <p>
                STATS
            </p>

            <div className="stats">
                <div>
                    <p className="large-text large-text-sm">
                        {result?.game_data?.stats?.gamesPlayed ? result?.game_data?.stats?.gamesPlayed : 1}
                    </p>
                    <p className="small-text small-text-sm">Played</p>
                </div>
                <div>
                    <p className="large-text large-text-sm">
                        {((result?.game_data?.game.currentScore / 3) * 3 * 100 / (3 * questions.length)).toFixed(0)}
                    </p>
                    <p className="small-text small-text-sm">Score %</p>
                </div>
                <div>
                    <p className="large-text large-text-sm">
                        {result?.game_data?.stats?.currentStreak ? result?.game_data?.stats?.currentStreak : 1}
                    </p>
                    <p className="small-text small-text-sm">Current Streak</p>
                </div>
            </div>

            <button className="share-button">
                Share <HiShare className="share-icon" />
            </button>
        </div>

    );
};

export default Congratulation; 