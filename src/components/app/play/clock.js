import React, { useEffect, useRef } from 'react';

const ClockTimer = ({ count, running, setCount }) => {
    const timerRef = useRef(null);

    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => {
                setCount((prevCount) => Math.max(prevCount - 1, 0));
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [running]);
    return (
        <div>
            <Clock time={count} />
        </div>
    );
};
export default ClockTimer;

function Clock({ time }) {

    return (
        <div className='timer-div flex justify-center'>
            <h1 className='timer-display'>
                {time}s
            </h1>
        </div>
    );
}