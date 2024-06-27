import React, { useEffect, useState } from "react";
import Users from "../../components/users";
import Messages from "../../components/messages";
import AnswerPoll from "../../components/answerpoll";
import CurrentPoll from "../../components/currentpoll";
import Navbar from "../../components/navbar";

function Student(props) {
  const {
    name,
    setTeacherId,
    sendConnectionInfo,
    updateUserList,
    userList,
    braodCastMessage,
    messages,
    question,
    options,
    pollResult,
    pollSubmitted,
    countDown,
    setCountDown,
    runTimer,
    setRunTimer,
    isTeacher,
  } = props;
  const [inRoom, setInRoom] = useState(false);
  // const teacherId = useRef(null);
  const [tId, settId] = useState("");
  const [showLivePoll, setShowLivePoll] = useState(false);
  // const [pollSubmitted,set]

  console.log("This is mess", messages);

  useEffect(() => {
    if (localStorage.getItem(window.name) !== null) {
      const obj = JSON.parse(localStorage.getItem(window.name));
      if (obj.inRoom) setInRoom(obj.inRoom);
      if (obj.teacherId) settId(obj.teacherId);
    }
  }, []);

  useEffect(() => {
    console.log("The value of settid has changed");
  }, [tId]);

  return (
    <div className="h-[820px]">
      <Navbar
        name={name}
        isTeacher={false}
        tId={tId}
        settId={settId}
        inRoom={inRoom}
        setTeacherId={setTeacherId}
        setInRoom={setInRoom}
        sendConnectionInfo={sendConnectionInfo}
        updateUserList={updateUserList}
      />
      {/* {!inRoom ? (
        <div>
          <input type="text" placeholder="Enter the room id" ref={teacherId} />
          <button
            onClick={() => {
              setTeacherId(teacherId.current.value);
              setInRoom(true);
              sendConnectionInfo(teacherId.current.value);

              updateUserList({
                teacherId: teacherId.current.value,
                userId: window.name,
                username: name,
              });

              const obj = JSON.parse(localStorage.getItem(window.name));
              obj.teacherId = teacherId.current.value;
              obj.inRoom = true;
              localStorage.setItem(window.name, JSON.stringify(obj));
            }}
          >
            Join
          </button>
        </div>
      ) : (
        <div>Questions will appear here</div>
      )} */}

      <div className="flex justify-between h-full [&>div]:h-full mt-4">
        <div className="w-1/6 bg-[#BABCBE] rounded-xl">
          <Users isTeacher={false} userList={userList} />
        </div>

        <div className="w-3/6">
          {countDown <= 0 || showLivePoll ? (
            <CurrentPoll
              question={question}
              options={options}
              pollResult={pollResult}
              countDown={countDown}
              setCountDown={setCountDown}
              runTimer={runTimer}
              setRunTimer={setRunTimer}
              isTeacher={isTeacher}
            />
          ) : (
            <AnswerPoll
              question={question}
              options={options}
              pollSubmitted={pollSubmitted}
              countDown={countDown}
              setCountDown={setCountDown}
              runTimer={runTimer}
              setRunTimer={setRunTimer}
              setShowLivePoll={setShowLivePoll}
            />
          )}
        </div>
        <div className="w-1/6 bg-[#BABCBE] rounded-xl h-full">
          <Messages braodCastMessage={braodCastMessage} messages={messages} />
        </div>
      </div>
    </div>
  );
}

export default Student;
