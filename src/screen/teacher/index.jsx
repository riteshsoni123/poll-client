import React, { useState } from "react";
import Users from "../../components/users";
import Messages from "../../components/messages";
import PollForm from "../../components/pollform";
import CurrentPoll from "../../components/currentpoll";
import Navbar from "../../components/navbar";

function Teacher(props) {
  const {
    name,
    teacherId,
    setTeacherId,
    updateUserList,
    userList,
    removeUser,
    updateLocalStorage,
    braodCastMessage,
    messages,
    options,
    question,
    formSubmitted,
    setOptions,
    setQuestion,
    setFormSubmitted,
    handleSubmit,
    pollResult,
    countDown,
    setCountDown,
    runTimer,
    setRunTimer,
  } = props;

  console.log("this is teacher", teacherId);

  const [createPoll, setCreatePoll] = useState(false);

  const createRoom = () => {
    setTeacherId(window.name);

    updateLocalStorage("teacherId", window.name);

    updateUserList({
      teacherId: window.name,
      userId: window.name,
      username: name,
    });
  };

  return (
    <div className="h-[850px]">
      <Navbar
        name={name}
        isTeacher={true}
        teacherId={teacherId}
        createRoom={createRoom}
      />

      <div className="flex justify-between h-full [&>div]:h-full mt-4">
        <div className="w-1/6 bg-[#BABCBE] rounded-xl">
          <Users isTeacher={true} userList={userList} removeUser={removeUser} />
        </div>

        <div className="w-3/6">
          {!createPoll ? (
            <button onClick={() => setCreatePoll(true)}>Create New Poll</button>
          ) : !formSubmitted ? (
            <PollForm
              options={options}
              setOptions={setOptions}
              question={question}
              setQuestion={setQuestion}
              setFormSubmitted={setFormSubmitted}
              handleSubmit={handleSubmit}
              countDown={countDown}
              setCountDown={setCountDown}
              runTimer={runTimer}
              setRunTimer={setRunTimer}
            />
          ) : (
            <CurrentPoll
              question={question}
              options={options}
              pollResult={pollResult}
              countDown={countDown}
              setCountDown={setCountDown}
              runTimer={runTimer}
              setRunTimer={setRunTimer}
              setOptions={setOptions}
              setQuestion={setQuestion}
              setFormSubmitted={setFormSubmitted}
              handleSubmit={handleSubmit}
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

export default Teacher;
