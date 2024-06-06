import React, { useEffect, useRef } from 'react';

const ClockTimer = ({ count, running, setCount, isMobile }) => {
    const timerRef = useRef(null);

    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => {
                setCount((prevCount) => Math.max(prevCount - 1, 0));
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [running, setCount]);
    return (
        <div>
            <Clock time={count} isMobile={isMobile} />
        </div>
    );
};
export default ClockTimer;

function Clock({ time, isMobile }) {

    return (
        <div className={isMobile ? 'timer-div-mobile' : 'timer-div'
        }>
            <h1 className='timer-display'>
                {time}s
            </h1>
        </div >
    );
}