import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import personIcon from "../../media/personIcon.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const CongratulationModal = ({ showCongratulationModal, setCongratulationModal }) => {
  const [sliderIndex, setSliderIndex] = useState(0)
  const [sliderData, setSliderData] = useState([])
  const [finalData, setFinalData] = useState({
    id: 2031,
    q_date: "2024-03-03",
    durationInSecs: 120,
    topPosition: 10,
    game: {
      pic_url: "https://github.com/moatsoliman/projectresources/blob/main/img1920x1080.png?raw=true",
      questions: [
        {
          question: "How many red apples in the picture?",
          answers: [
            "1",
            "2",
            "3",
            "7"
          ],
          corr_ans: 1,
          trial_stats:
            [ // The size of this array will be equal to the number of answer choices - 1 which will be equal to how many trials each user gets. If the number of answer choices is only 1 then all users only get 1 trial
              [500, 300, 100, 5], //First trial - each position represents one of the 4 answer choices. For example in first trial 500 people selected the answer in position 1, 300 people selected answer in position 2
              [100, 50, 80, 2], //2nd trial
              [30, 4, 4, 1], //3rd trial
            ]
        },
        {
          question: "How many oranges in the picture?",
          answers: [
            "3",
            "8",
            "1",
            "0"
          ],
          corr_ans: 1,
          trial_stats:
            [ // The size of this array will be equal to the number of answer choices - 1 which will be equal to how many trials each user gets. If the number of answer choices is only 1 then all users only get 1 trial
              [100, 200, 50, 3], //First trial - each position represents one of the 4 answer choices. For example in first trial 500 people selected the answer in position 1, 300 people selected answer in position 2
              [200, 45, 80, 4], //2nd trial
              [300, 40, 41, 1], //3rd trial
            ]
        },
        {
          question: "how many bananas in the picture?",
          answers: [
            "4",
            "2",
            "3",
            "1"
          ],
          corr_ans: 4,
          trial_stats:
            [ // The size of this array will be equal to the number of answer choices - 1 which will be equal to how many trials each user gets. If the number of answer choices is only 1 then all users only get 1 trial
              [300, 200, 1, 3], //First trial - each position represents one of the 4 answer choices. For example in first trial 500 people selected the answer in position 1, 300 people selected answer in position 2
              [5, 77, 56, 4], //2nd trial
              [45, 73, 345, 3], //3rd trial
            ]
        }
      ]
    }
  })

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

    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('');
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);

    //     }
    //     const data = await response.json();
    //     console.log(data)
    //   } catch (error) {
    //     console.error("Could not fetch the data", error);
    //   }
    // };
    // fetchData();

    handleSliderData(questions, gameState)
  }, [])


  function calculateTrailPercentage(totalArray, numberOfTrie) {


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
            drag: false,
          }}
          ref={splideRef}
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
                            <div style={{ width: calculateTrailPercentage(question?.trial_stats[0], question?.trial_stats[0][index]) }} className="percentageDiv" >

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
