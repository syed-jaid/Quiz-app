import React from "react";
import { IoClose } from "react-icons/io5";
import personIcon from "../../media/personIcon.png";

const CongratulationModal = ({ setCongratulationModal }) => {
  return (
    <div className="congratulationModalMain">
      <IoClose
        onClick={() => setCongratulationModal(false)}
        className="close-icon"
      />

      {/* 1st slider */}
      {/* <div className="congratulationModal">
        <p className="congratulation-modal-text ">Congratulations</p>
        <p className="congratulation-modal-text">
          based on your answers, are in the top
        </p>
        <p className="congratulation-percentage">10%</p>
        <div className="congratulation-bottom-text-mainDiv">
          <p className="congratulation-bottom-text">
            swipe right to see everyone’s guesses
          </p>
        </div>
      </div> */}

      {/* 2nd slider */}
      <div>
        <p className="second-slider-title">Everyone’s Guesses</p>
        <p className="second-slider-title-bottom-text">Q1 - trial-1</p>
        <p className="second-slider-quiz-question1">
          How many oranges in the picture?
        </p>

        <div className="all-quiz-containerDiv">
          <div className="quiz-option-mainDiv">
            <div className="quiz-option-background-parenting">
              <div className="quiz-option">A. Five</div>
            </div>
            <div className="quiz-mark">5138</div>
          </div>

          <div className="quiz-option-mainDiv-green">
            <div className="quiz-option-green">A. Five</div>
            <img src={personIcon} />
            <div className="quiz-mark">5138</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationModal;
