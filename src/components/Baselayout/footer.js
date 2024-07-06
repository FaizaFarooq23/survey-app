import React from "react";
import BlackButton from "../Common/blackButton";
import GrayButton from "../Common/grayButton";

export default function Footer({
  mainText,
  hideFooter,
  grayClick,
  blackClick,
  hideGrayButton,
  hideBlackButton,
  currentQuestionIndex,
  totalQuestions,
  submitToApi,
}) {
  if (currentQuestionIndex === totalQuestions - 1) {
    return (
      <div className="w-full flex justify-between items-center mt-4">
        {!hideFooter && (
          <>
            <div>
              <GrayButton
                text="Back"
                handleClick={grayClick}
                hideButton={hideGrayButton}
              />
            </div>
            <div>
              <BlackButton
                text={mainText}
                blackClick={submitToApi}
                hideButton={hideBlackButton}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-between items-center mt-4">
      {!hideFooter && (
        <>
          <div>
            <GrayButton
              text="Back"
              handleClick={grayClick}
              hideButton={hideGrayButton}
            />
          </div>
          <div>
            <BlackButton
              text={mainText}
              blackClick={blackClick}
              hideButton={hideBlackButton}
            />
          </div>
        </>
      )}
    </div>
  );
}
