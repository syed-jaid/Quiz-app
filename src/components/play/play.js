import React, { useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { FaExclamation } from "react-icons/fa6";
import '@splidejs/splide/dist/css/splide.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import ClockTimer from './clock';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import Congratulation from './congratulation';
import ExclamationModal from './exclamationModal';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Play = () => {
    const splideRef = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizStart, setQuizStart] = useState(false);
    const [showQus, setShowQus] = useState(false);
    const [questions, setQuestions] = useState();
    const [questionIndex, setQuestionIndex] = useState(0);

    const [tryNumber, setTryNumber] = useState(0);
    const [givenAnswerIndex1, setGivenAnswerIndex1] = useState('');
    const [givenAnswerIndex2, setGivenAnswerIndex2] = useState('');
    const [givenAnswerIndex3, setGivenAnswerIndex3] = useState('');

    const [showRightAns, setShowRightAns] = useState(false);
    const [answerChecking, setAnswerChecking] = useState(false);
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const mobileMediaQuery = window.matchMedia("(max-width: 1000px)");
        const landscapeMediaQuery = window.matchMedia("(orientation: landscape)");

        const handleMobileMediaQueryChange = (mq) => {
            setIsMobile(mq.matches);
        };

        const handleLandscapeMediaQueryChange = (mq) => {
            setIsLandscape(mq.matches);
        };

        setIsMobile(mobileMediaQuery.matches);
        setIsLandscape(landscapeMediaQuery.matches);

        mobileMediaQuery.addListener(handleMobileMediaQueryChange);
        landscapeMediaQuery.addListener(handleLandscapeMediaQueryChange);

        return () => {
            mobileMediaQuery.removeListener(handleMobileMediaQueryChange);
            landscapeMediaQuery.removeListener(handleLandscapeMediaQueryChange);
        };
    }, []);

    const handleCountdown = (seconds) => {
        setCount(seconds);
        setRunning(true)
    };

    const goToRight = () => {
        splideRef.current.splide.go('>');
    };

    useEffect(() => {

        let UserGamePlayObject = localStorage.getItem('UserGamePlay')
        UserGamePlayObject = JSON.parse(UserGamePlayObject)
        let UserGamePlayState = localStorage.getItem('UserGameState')
        UserGamePlayState = JSON.parse(UserGamePlayState)

        if (UserGamePlayObject) {
            const fetchData = async () => {
                try {
                    const response = await fetch('https://raw.githubusercontent.com/moatsoliman/projectresources/main/questions.json');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    if (UserGamePlayObject.game_data.game.status === 'COMPLETED') {
                        setShowResult(true)
                        setQuestions(data);
                    }
                    else {
                        if (!showQus) {
                            if (UserGamePlayObject.game_data.game.hasSeenPicture === 0) {
                                setQuestions(data);
                                setQuestionIndex(0)
                                handleCountdown(data?.durationInSecs)
                                setQuizStart(true)
                                pictureSeen(false)
                            }
                            else {
                                if (UserGamePlayState?.length) {
                                    if (UserGamePlayState.length === 1) {
                                        setGivenAnswerIndex1(UserGamePlayState[0])
                                        setAnswerChecking(true)
                                        setTryNumber(1)
                                    }
                                    if (UserGamePlayState.length === 2) {
                                        setGivenAnswerIndex1(UserGamePlayState[0])
                                        setGivenAnswerIndex2(UserGamePlayState[1])
                                        setAnswerChecking(true)
                                        setTryNumber(2)
                                    }
                                    if (UserGamePlayState.length === 3) {
                                        setGivenAnswerIndex1(UserGamePlayState[0])
                                        setGivenAnswerIndex2(UserGamePlayState[1])
                                        setGivenAnswerIndex3(UserGamePlayState[2])
                                        setAnswerChecking(true)
                                    }
                                }
                                setQuestions(data);
                                setQuestionIndex(UserGamePlayObject.game_data.game.currentQuestionIndex)
                                setQuizStart(true)
                            }
                        }
                    }
                } catch (error) {
                    console.error("Could not fetch the data", error);
                }
            };
            fetchData();
        }
        else {
            const fetchData = async () => {
                try {
                    const response = await fetch('https://raw.githubusercontent.com/moatsoliman/projectresources/main/questions.json');

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();

                    if (!showQus) {

                        let UserGamePlayObject = {
                            game_data: {
                                game: {
                                    gameState: [],
                                    hasSeenPicture: 0,
                                    currentQuestionIndex: 0,
                                    currentScore: 0,
                                    id: data.id,
                                    status: "IN_PROGRESS",
                                    timestamps: {
                                        lastCompleted: 0,
                                        lastPlayed: 0
                                    }
                                },
                                stats: {
                                    gamesPlayed: 0,
                                    currentStreak: 0,
                                    gamesWon: 0,
                                    AvgScorePercentage: 0,
                                }
                            },
                            puzzle_id: data.id,
                            timestamp: Date.now()
                        };

                        localStorage.setItem('UserGamePlay', JSON.stringify(UserGamePlayObject));
                        setQuestions(data);
                        setQuestionIndex(0)
                        handleCountdown(data?.durationInSecs)
                        setQuizStart(true)
                        pictureSeen(false)
                        const timer = setTimeout(() => {
                            pictureSeen(true)
                        }, 10000);
                        return () => clearTimeout(timer);
                    }
                } catch (error) {
                    console.error("Could not fetch the data", error);
                }
            };
            fetchData();
        }

    }, []);

    const pictureSeen = (skip) => {
        let UserObject = localStorage.getItem('UserGamePlay')
        UserObject = JSON.parse(UserObject)
        const { game_data, puzzle_id, timestamp } = UserObject;
        const { gameState, hasSeenPicture, currentQuestionIndex, currentScore, status, id, timestamps } = game_data.game;
        const { stats } = game_data;
        if (skip) {
            let UserGamePlayObject = {
                game_data: {
                    game: {
                        gameState: gameState,
                        hasSeenPicture: 1,
                        currentQuestionIndex: currentQuestionIndex,
                        currentScore: currentScore,
                        id: id,
                        status: "IN_PROGRESS",
                        timestamps: {
                            lastCompleted: timestamps.lastCompleted,
                            lastPlayed: timestamps.lastPlayed
                        }
                    },
                    stats: {
                        gamesPlayed: stats.gamesPlayed,
                        currentStreak: stats.currentStreak,
                        gamesWon: stats.gamesWon,
                        AvgScorePercentage: stats.AvgScorePercentage,
                    }
                },
                puzzle_id: puzzle_id,
                timestamp: timestamp
            };
            localStorage.setItem('UserGamePlay', JSON.stringify(UserGamePlayObject));
        }
    }

    if (quizStart) {
        if (count === 0) {
            setQuizStart(false)
            setShowQus(true)
        }
    }

    const animation = () => {
        setTimeout(() => {
            setAnimate(false)
            setGivenAnswerIndex1(0)
            setGivenAnswerIndex2(0)
            setGivenAnswerIndex3(0)
            let UserGame = []
            localStorage.setItem('UserGameState', JSON.stringify(UserGame));
        }, 1800);
    }

    const changeQuestion = () => {
        setTimeout(() => {
            setAnimate(true)
            animation()
            goToRight()
            setTryNumber(0)
            setQuestionIndex(questionIndex + 1)
            setAnswerChecking(false)
            setShowRightAns(false)
        }, 1200);
    }

    const finalUpdate = () => {
        setTimeout(() => {
            setGivenAnswerIndex1(0)
            setGivenAnswerIndex2(0)
            setGivenAnswerIndex3(0)
            setTryNumber(0)
            setShowResult(true)
            setAnswerChecking(false)
            setShowQus(false)
            setShowRightAns(false)
            let UserGame = []
            localStorage.setItem('UserGameState', JSON.stringify(UserGame));
        }, 1000);
    }

    const getMessage = () => {
        switch (tryNumber) {
            case 0:
                return 'Amazing 😄';
            case 1:
                return 'Good Job 👍';
            case 2:
                return 'Phew! 😅';
            default:
                return '';
        }
    };

    const setOptionSelected = (answer, tryCount) => {

        let UserGamePlayState = localStorage.getItem('UserGameState')
        UserGamePlayState = JSON.parse(UserGamePlayState)

        if (tryNumber === 0) {
            let UserGame = [answer]
            localStorage.setItem('UserGameState', JSON.stringify(UserGame));
        }
        else if (tryCount === 1) {
            let UserGame = [...UserGamePlayState, answer]
            localStorage.setItem('UserGameState', JSON.stringify(UserGame));
        }
        else if (tryCount === 2) {
            let UserGame = [...UserGamePlayState, answer]
            localStorage.setItem('UserGameState', JSON.stringify(UserGame));
        }
    }

    const singleQuestionAnswerCheck = (userAnswer) => {

        setAnswerChecking(true)
        let UserObject = localStorage.getItem('UserGamePlay')
        UserObject = JSON.parse(UserObject)

        const { game_data, puzzle_id, timestamp } = UserObject;
        const { gameState, hasSeenPicture, currentQuestionIndex, currentScore, id, timestamps } = game_data.game;
        const { stats } = game_data;

        let newCurrentScore;

        switch (tryNumber) {
            case 0:
                newCurrentScore = currentScore + 3;
                break;
            case 1:
                newCurrentScore = currentScore + 2;
                break;
            case 2:
                newCurrentScore = currentScore + 1;
                break;
            default:
                newCurrentScore = currentScore;
        }
        console.log(newCurrentScore, currentScore)
        if (!showRightAns) {
            if (questions?.game?.questions.length === questionIndex + 1) {
                if (userAnswer === `${questions?.game?.questions[questionIndex]?.corr_ans}`) {

                    let userObject = {
                        game_data: {
                            game: {
                                gameState: gameState,
                                hasSeenPicture: hasSeenPicture,
                                currentQuestionIndex: 0,
                                currentScore: newCurrentScore,
                                id: id,
                                status: "COMPLETED",
                                timestamps: {
                                    lastCompleted: Date.now(),
                                    lastPlayed: Date.now()
                                }
                            },
                            stats: {
                                gamesPlayed: 1,
                                currentStreak: 1,
                                gamesWon: 1,
                                AvgScorePercentage: 1,
                            }
                        },
                        puzzle_id: puzzle_id,
                        timestamp: timestamp
                    };
                    localStorage.setItem('UserGamePlay', JSON.stringify(userObject));
                    setShowRightAns(true)
                    finalUpdate()
                    if (tryNumber === 0 || tryNumber === 1 || tryNumber === 2) {
                        const message = getMessage();
                        toast(message,
                            {
                                duration: 1000,
                                style: {
                                    borderRadius: '99px',
                                    background: '#06BF66',
                                    color: '#fff',
                                },
                            }
                        )
                    }
                }
                else {
                    if (tryNumber === 0 || tryNumber === 1) {
                        setTryNumber(tryNumber + 1)
                    }
                    else if (tryNumber === 2) {
                        let userObject = {
                            game_data: {
                                game: {
                                    gameState: gameState,
                                    hasSeenPicture: hasSeenPicture,
                                    currentQuestionIndex: 0,
                                    currentScore: newCurrentScore,
                                    id: id,
                                    status: "COMPLETED",
                                    timestamps: {
                                        lastCompleted: Date.now(),
                                        lastPlayed: Date.now()
                                    }
                                },
                                stats: {
                                    gamesPlayed: 1,
                                    currentStreak: 1,
                                    gamesWon: 1,
                                    AvgScorePercentage: 1,
                                }
                            },
                            puzzle_id: puzzle_id,
                            timestamp: timestamp
                        };
                        localStorage.setItem('UserGamePlay', JSON.stringify(userObject));
                        finalUpdate()
                        toast('Try again next time',
                            {
                                duration: 1000,
                                icon: '😢',
                                style: {
                                    borderRadius: '99px',
                                    background: '#CD0000',
                                    color: '#fff',
                                },
                            }
                        )
                    }
                }
            }
            else {
                if (userAnswer === `${questions?.game?.questions[questionIndex]?.corr_ans}`) {
                    let userObject = {
                        game_data: {
                            game: {
                                gameState: gameState,
                                hasSeenPicture: hasSeenPicture,
                                currentQuestionIndex: currentQuestionIndex + 1,
                                currentScore: newCurrentScore,
                                id: id,
                                status: "IN_PROGRESS",
                                timestamps: {
                                    lastCompleted: timestamps.lastCompleted,
                                    lastPlayed: Date.now()
                                }
                            },
                            stats: {
                                gamesPlayed: stats.gamesPlayed,
                                currentStreak: stats.currentStreak,
                                gamesWon: stats.gamesWon,
                                AvgScorePercentage: stats.AvgScorePercentage,
                            }
                        },
                        puzzle_id: puzzle_id,
                        timestamp: timestamp
                    };
                    localStorage.setItem('UserGamePlay', JSON.stringify(userObject));
                    setShowRightAns(true)
                    changeQuestion()
                    if (tryNumber === 0 || tryNumber === 1 || tryNumber === 2) {
                        const message = getMessage();
                        toast(message,
                            {
                                duration: 1000,
                                style: {
                                    borderRadius: '99px',
                                    background: '#06BF66',
                                    color: '#fff',
                                },
                            }
                        )
                    }
                }
                else {
                    if (tryNumber === 0 || tryNumber === 1) {
                        setTryNumber(tryNumber + 1)
                        let userObject = {
                            game_data: {
                                game: {
                                    gameState: gameState,
                                    hasSeenPicture: hasSeenPicture,
                                    currentQuestionIndex: currentQuestionIndex,
                                    currentScore: currentScore,
                                    id: id,
                                    status: "IN_PROGRESS",
                                    timestamps: {
                                        lastCompleted: timestamps.lastCompleted,
                                        lastPlayed: Date.now()
                                    }
                                },
                                stats: {
                                    gamesPlayed: stats.gamesPlayed,
                                    currentStreak: stats.currentStreak,
                                    gamesWon: stats.gamesWon,
                                    AvgScorePercentage: stats.AvgScorePercentage,
                                }
                            },
                            puzzle_id: puzzle_id,
                            timestamp: timestamp
                        };
                        localStorage.setItem('UserGamePlay', JSON.stringify(userObject));
                    }
                    else {
                        let userObject = {
                            game_data: {
                                game: {
                                    gameState: gameState,
                                    hasSeenPicture: hasSeenPicture,
                                    currentQuestionIndex: currentQuestionIndex + 1,
                                    currentScore: currentScore,
                                    id: id,
                                    status: "IN_PROGRESS",
                                    timestamps: {
                                        lastCompleted: timestamps.lastCompleted,
                                        lastPlayed: Date.now()
                                    }
                                },
                                stats: {
                                    gamesPlayed: stats.gamesPlayed,
                                    currentStreak: stats.currentStreak,
                                    gamesWon: stats.gamesWon,
                                    AvgScorePercentage: stats.AvgScorePercentage,
                                }
                            },
                            puzzle_id: puzzle_id,
                            timestamp: timestamp
                        };
                        localStorage.setItem('UserGamePlay', JSON.stringify(userObject));
                        changeQuestion()
                        toast('Try again next time',
                            {
                                duration: 1000,
                                icon: '😢',
                                style: {
                                    borderRadius: '99px',
                                    background: '#CD0000',
                                    color: '#fff',
                                },
                            }
                        )
                    }
                }
            }
        }
    }

    return (
        <div className={showQus ? 'bg-withe' : `${showResult ? 'bg-white' : 'bg-[#E3E3E1]'}`}
        >
            {quizStart &&
                <div className='home-main-div'>
                    <FaExclamation
                        className='exclamation-icon'
                        onClick={() => setIsModalOpen(true)}
                    />
                    <ExclamationModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    />

                    <ClockTimer {...{ count, running, setCount }} />

                    <button
                        className='skip-btn'
                        onClick={() => {
                            setCount(0)
                            pictureSeen(true)
                        }}
                    >
                        Skip
                    </button>

                    {!isMobile ? <div className='quiz-img-div'>
                        <InnerImageZoom
                            className='quiz-img'
                            src={questions?.game?.pic_url}
                            zoomSrc={questions?.game?.pic_url}
                            zoomType="hover"
                            zoomPreload={true}
                        />
                    </div>
                        :
                        <div className={isLandscape ? 'quiz-img-div-Landscape' : 'quiz-img-div'}>
                            <img className={isLandscape ? '' : 'quiz-img'} src={questions?.game?.pic_url} alt="" />
                        </div>
                    }
                </div>}

            {(showQus) &&
                <div className='question-div'>

                    <p className='question-text'>
                        Q{questionIndex + 1}.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        <p className='question-full-text'>
                            {questions?.game?.questions[questionIndex].question}
                        </p>
                    </motion.div>

                    <Splide
                        options={{
                            type: 'loop',
                            arrows: false,
                            drag: false,
                            wheel: false,
                            keyboard: false,
                            pagination: false,
                            speed: '1100',
                        }}
                        ref={splideRef}
                    >
                        <SplideSlide>
                            {questions?.game?.questions[questionIndex].answers.map((answer, index) =>
                                <motion.div
                                    key={index}
                                    animate={animate ? { x: -500, transition: { duration: index * 0.5 } } : { x: 0, transition: { duration: 0 } }}
                                >
                                    <div key={answer} className='mr-2'>
                                        {!answerChecking ?
                                            <div
                                                className='option-div'
                                                onClick={() => {
                                                    !givenAnswerIndex1 && singleQuestionAnswerCheck(answer)
                                                    !givenAnswerIndex1 && setGivenAnswerIndex1(answer)
                                                    setOptionSelected(answer, tryNumber)
                                                }}
                                            >
                                                <p className='font-bold text-[18px]' >
                                                    <span className='mr-2'>
                                                        {index === 0 && ' A.  '}
                                                        {index === 1 && ' B.  '}
                                                        {index === 2 && ' C.  '}
                                                        {index === 3 && ' D.  '}
                                                        {index === 4 && ' E.  '}
                                                        {index === 5 && ' F.  '}
                                                    </span>
                                                    {'  '}
                                                    {answer}
                                                </p>
                                            </div>
                                            :
                                            <div
                                                onClick={() => {
                                                    (!givenAnswerIndex2 || !givenAnswerIndex3) && singleQuestionAnswerCheck(answer);
                                                    { (tryNumber === 1) && setGivenAnswerIndex2(answer) }
                                                    { (tryNumber === 2) && setGivenAnswerIndex3(answer) }
                                                    {
                                                        (!givenAnswerIndex2 || !givenAnswerIndex3)
                                                            && setOptionSelected(answer, tryNumber)
                                                    }
                                                }}
                                                className={`single-option  
                                                       ${`${questions?.game?.questions[questionIndex]?.corr_ans}` === answer
                                                        ?
                                                        `${showRightAns ? 'option-green' : 'option-black'}`
                                                        :
                                                        `${(answer === givenAnswerIndex1 || answer === givenAnswerIndex2 ||
                                                            answer === givenAnswerIndex3)
                                                            ?
                                                            'option-red'
                                                            :
                                                            `${showRightAns ?
                                                                'option-gray'
                                                                :
                                                                'option-black'
                                                            }`
                                                        }`
                                                    }`}
                                            >
                                                <p className='font-bold text-[18px]' >
                                                    <span className='mr-2'>
                                                        {index === 0 && ' A.  '}
                                                        {index === 1 && ' B.  '}
                                                        {index === 2 && ' C.  '}
                                                        {index === 3 && ' D.  '}
                                                        {index === 4 && ' E.  '}
                                                        {index === 5 && ' F.  '}
                                                    </span>
                                                    {'  '}
                                                    {answer}
                                                </p>
                                            </div>
                                        }
                                    </div>
                                </motion.div>
                            )}
                        </SplideSlide>
                    </Splide>
                </div>
            }
            {showResult && <Congratulation questions={questions?.game?.questions} />}
            <Toaster />
        </div>
    );
};

export default Play;
