import React from "react";
import Timer from "../timer";
// import PieChart from "../PieChart";

function CurrentPoll(props) {
  const {
    question,
    options,
    pollResult,
    countDown,
    setCountDown,
    runTimer,
    setRunTimer,
    isTeacher,

    setOptions,

    setQuestion,
    setFormSubmitted,
  } = props;

  const createNewPoll = () => {
    setOptions([]);
    setQuestion("");
    setFormSubmitted(false);
    setCountDown(0);
    setRunTimer(false);
  };

  // const demoData = {
  //   labels: options,
  //   datasets: [
  //     {
  //       data: pollResult,
  //       backgroundColor: ["#7393B3", "#848884", "#E5E4E2"],
  //     },
  //   ],
  // };

  // useEffect(()=>{

  // },[pollResult])

  return (
    <div className="mt-2 [&>div]:mb-4 rounded-t-xl bg-[#BABCBE] flex flex-col justify-center items-center">
      <div className="bg-[#494F55] text-[#BABCBE] rounded-t-xl w-full text-center py-2">
        Live Poll Result
      </div>
      {countDown > 0 ? (
        <Timer
          countDown={countDown}
          setCountDown={setCountDown}
          runTimer={runTimer}
          setRunTimer={setRunTimer}
        />
      ) : (
        <div>
          <div className="text-4xl">The Poll has ended</div>
          {isTeacher ? (
            <button onClick={() => createNewPoll()}>Create New Poll</button>
          ) : (
            <></>
          )}
        </div>
      )}
      <div className="py-4">
        <div className="text-3xl my-4 border-b-2">{question}</div>
        <div>
          {options.map((option, i) => {
            return (
              <div
                key={i}
                className="flex flex-row justify-between [&>span]:text-xl my-1 border-2 py-2 px-2 rounded-lg"
              >
                <span>{option}</span>
                <span>{pollResult[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CurrentPoll;
