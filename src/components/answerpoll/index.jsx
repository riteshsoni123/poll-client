import React, { useState } from "react";
import Timer from "../timer";

function AnswerPoll(props) {
  const {
    question,
    options,
    pollSubmitted,
    countDown,
    setCountDown,
    runTimer,
    setRunTimer,
    setShowLivePoll,
  } = props;

  const [currentOption, setCurrentOption] = useState(-1);

  return (
    <div className="mt-2 [&>div]:mb-4 rounded-t-xl bg-[#BABCBE] flex flex-col justify-center items-center">
      <div className="bg-[#494F55] text-[#BABCBE] rounded-t-xl w-full text-center py-2">
        Answer the poll
      </div>
      {countDown > 0 ? (
        <Timer
          countDown={countDown}
          setCountDown={setCountDown}
          runTimer={runTimer}
          setRunTimer={setRunTimer}
        />
      ) : (
        <div className="text-4xl">The Poll has ended</div>
      )}

      <div className="py-4 flex flex-col justify-center">
        <div className="text-3xl my-4 border-b-2">{question}</div>
        <div>
          {options.map((option, i) => {
            return (
              <div
                className={`flex flex-row justify-between [&>span]:text-xl my-2 py-2 px-2 border-2 rounded-lg cursor-pointer ${
                  currentOption === i ? "border-black" : ""
                }`}
                key={i}
                onClick={() => setCurrentOption(i)}
              >
                {option}
              </div>
            );
          })}
        </div>
        <button
          className="bg-[#494F55] text-[#BABCBE] p-2 rounded-lg my-2"
          onClick={() => {
            if (currentOption === -1) {
              alert("Please choose a option");
              return;
            }
            setShowLivePoll(true);
            pollSubmitted(currentOption);
          }}
        >
          submit
        </button>
      </div>
    </div>
  );
}

export default AnswerPoll;
