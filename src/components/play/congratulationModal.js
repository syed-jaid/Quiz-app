import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import personIcon from "../../media/personIcon.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const CongratulationModal = ({ showCongratulationModal, setCongratulationModal }) => {
  const [sliderIndex, setSliderIndex] = useState(0)
  const [sliderData, setSliderData] = useState([])
  const [finalData, setFinalData] = useState()

  const splideRef = useRef();
  const goToRight = () => {
    setSliderIndex(pre => pre + 1)
    splideRef.current.splide.go('>');
  };
  const goToLeft = () => {
    setSliderIndex(pre => pre - 1)
    splideRef.current.splide.go('<');
  };


  const handleSliderData = (allQuestions, gameState) => {
    const questions2 = [];
    allQuestions.forEach((question, qIndex) => {
      question.trial_stats.forEach((trialStat, tIndex) => {
        questions2.push({
          question: question.question,
          answers: question.answers,
          corr_ans: question.corr_ans,
          MyTry: gameState[qIndex][tIndex],
          questionNumber: qIndex,
          tryNumber: tIndex,
          trial_stats: [trialStat]
        });
      });
    });
    setSliderData(questions2)
  }

  useEffect(() => {
    let UserObject = localStorage.getItem('UserGamePlay')
    UserObject = JSON.parse(UserObject)
    const { game_data, } = UserObject;
    const { gameState } = game_data.game;
    const questions = finalData?.game?.questions
    const fetchData = async () => {
      fetch('https://raw.githubusercontent.com/moatsoliman/projectresources/main/stats.json')
        .then(response => response.json())
        .then(data => {
          setFinalData(data.json())
          handleSliderData(questions, gameState)
        })
        .catch(error => console.error('Error fetching the data:', error));
    };

    fetchData();

  }, [])


  const calculateTrailPercentage = (totalArray, numberOfTrie) => {


    const totalPeople = totalArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    if (totalPeople <= 0) {
      return 0;
    }
    if (numberOfTrie < 0) {
      return 0;
    }
    if (numberOfTrie > totalPeople) {
      return 0;
    }
    const percentage = (numberOfTrie / totalPeople) * 100;
    return `${percentage}%`;
  }

  const handleMoved = (splide, newIndex, oldIndex) => {
    if (newIndex > oldIndex) {
      setSliderIndex(pre => newIndex)
    } else {
      setSliderIndex(pre => newIndex)
    }
  };

  return (
    <div className="congratulationModalMain">
      <IoClose
        onClick={() => setCongratulationModal(!showCongratulationModal)}
        className="close-icon"
      />
      <div className="slider-center">
        {sliderIndex === 0 ? '' : <GoChevronLeft onClick={() => goToLeft()} className="arrow-left" />}
        {sliderIndex === sliderData.length ? '' : <GoChevronRight onClick={() => goToRight()} className="arrow-right" />}
        <Splide
          options={{
            speed: '500',
            arrows: false,
            pagination: false,
          }}
          ref={splideRef}
          onMoved={handleMoved}
        >
          <SplideSlide>
            <div className="congratulationModal">
              <p className="congratulation-modal-text1">Congratulations</p>
              <p className="congratulation-modal-text">
                based on your answers, are in the top
              </p>
              <p className="congratulation-percentage">{finalData?.topPosition ? finalData?.topPosition : '..,'}%</p>
              <div className="congratulation-bottom-text-mainDiv">
                <p className="congratulation-bottom-text">
                  Swipe Right To See Everyone’s Guesses
                </p>
              </div>
            </div>
          </SplideSlide>
          {sliderData.map((question) =>
            <SplideSlide>
              <div>
                <p className="second-slider-title">Everyone’s Guesses</p>
                <p className="second-slider-title-bottom-text">Q{question?.questionNumber + 1} - trial-{question?.tryNumber + 1}</p>
                <p className="second-slider-quiz-question1">
                  {question?.question}
                </p>

                <div className="all-quiz-containerDiv">
                  {question?.answers.map((answer, index) =>
                    <>
                      {
                        index + 1 === question?.corr_ans
                          ?
                          < div className="quiz-option-mainDivGreen">
                            <div
                              style={{ width: calculateTrailPercentage(question?.trial_stats[0], question?.trial_stats[0][index]) }} className="percentageDiv-Green"
                            ></div>
                            <div className="quiz-option">
                              {index === 0 && ' A.  '}
                              {index === 1 && ' B.  '}
                              {index === 2 && ' C.  '}
                              {index === 3 && ' D.  '}
                              {index === 4 && ' E.  '}
                              {index === 5 && ' F.  '}
                              {index === 6 && ' G.  '}
                              {answer}
                            </div>
                            {question?.MyTry === answer && <img src={personIcon} alt="selected questions" />}

                            <div className="quiz-mark">{question?.trial_stats[0][index]}</div>
                          </div >
                          :
                          < div className="quiz-option-mainDiv">
                            <div
                              style={{ width: calculateTrailPercentage(question?.trial_stats[0], question?.trial_stats[0][index]) }} className="percentageDiv"
                            >

                            </div>
                            <div className="quiz-option">
                              {index === 0 && ' A.  '}
                              {index === 1 && ' B.  '}
                              {index === 2 && ' C.  '}
                              {index === 3 && ' D.  '}
                              {index === 4 && ' E.  '}
                              {index === 5 && ' F.  '}
                              {index === 6 && ' G.  '}
                              {answer}
                            </div>
                            {question?.MyTry === answer && <img src={personIcon} alt="selected questions" />}

                            <div className="quiz-mark">{question?.trial_stats[0][index]}</div>
                          </div >
                      }
                    </>
                  )}
                </div>
              </div>
            </SplideSlide>
          )}
        </Splide>
        <div className="sliderMain">
          <div className="sliderPagination">
            {Array(sliderData.length + 1).fill(null).map((item, index) =>
              <div className={`${index === sliderIndex ? 'greenDot' : 'sliderDot'} `}></div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default CongratulationModal;
