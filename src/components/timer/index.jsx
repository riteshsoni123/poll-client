import React, { useEffect } from "react";

function Timer(props) {
  const { runTimer, countDown, setCountDown } = props;

  useEffect(() => {
    let timerId;

    if (runTimer) {
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer, setCountDown]);

  return (
    <div>
      <div>Time Remaining {countDown} seconds</div>
    </div>
  );
}

export default Timer;
