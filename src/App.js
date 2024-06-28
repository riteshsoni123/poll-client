import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Login from "./screen/login";
import Teacher from "./screen/teacher";
import Student from "./screen/student";

function App() {
  const [socket, setSocket] = useState();

  const [isTeacher, setIsTeacher] = useState(null);
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [userList, setUserList] = useState([]);
  const [messages, setMessages] = useState([]);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [pollResult, setPollResult] = useState([]);

  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const [showLivePoll, setShowLivePoll] = useState(false);

  console.log("These are the list of users: ", userList);
  console.log("These are the list of messages", messages);

  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
    console.log("Number of rerenders", count.current);
  });

  useEffect(() => {
    console.log("it is running");
    if (localStorage.getItem(window.name) !== null) {
      // upupdateLocalStorage("question", question);
      // updateLocalStorage("options", options);
      // updateLocalStorage("countDown", countDown);
      // updateLocalStorage("runTimer", true);
      // updateLocalStorage("pollResult", tmpArray);
      // updateLocalStorage("formSubmitted", true);

      const obj = JSON.parse(localStorage.getItem(window.name));
      setName(obj.name);
      if (obj.isTeacher !== null) setIsTeacher(obj.isTeacher);
      if (obj.teacherId) setTeacherId(obj.teacherId);
      if (obj.userList) setUserList(obj.userList);
      if (obj.messages) setMessages(obj.messages);
      if (obj.options) setOptions(obj.options);
      if (obj.question) setQuestion(obj.question);

      if (obj.question) setQuestion(obj.question);
      if (obj.options) setOptions(obj.options);
      if (obj.countDown) setCountDown(obj.countDown);
      if (obj.runTimer !== null) setRunTimer(obj.runTimer);
      if (obj.pollResult) setPollResult(obj.pollResult);
      if (obj.formSubmitted) setFormSubmitted(obj.formSubmitted);
    }
  }, []);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BACKEND_URL, {
      query: { teacherId: teacherId, userId: window.name, username: name },
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [name, teacherId]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("receiveNewUser", (data) => {
      updateUserList(data);
    });
    return () => socket.off("receiveNewUser");
  });

  useEffect(() => {
    if (socket == null) return;
    socket.on("updateList", (newList) => {
      // const obj = JSON.parse(localStorage.getItem(window.name));
      // obj.userList = newList;
      // localStorage.setItem(window.name, JSON.stringify(obj));

      updateLocalStorage("userList", newList);

      setUserList(newList);
    });
    return () => socket.off("updateList");
  });

  useEffect(() => {
    if (socket == null) return;
    socket.on("receiveMessage", (msg) => {
      const newMessages = [...messages];

      newMessages.push(msg);

      updateLocalStorage("messages", newMessages);

      setMessages(newMessages);
    });
    return () => socket.off("receiveMessage");
  });

  useEffect(() => {
    console.log("The value of poll has changed");
  }, [pollResult]);

  useEffect(() => {
    if (socket == null || isTeacher) return;
    socket.on("receivePoll", (data) => {
      console.log(data);
      setQuestion(data.question);
      setOptions(data.options);
      setCountDown(data.time);
      setRunTimer(true);
      setShowLivePoll(false);

      const tmpArray = [];
      data.options.forEach(() => {
        tmpArray.push(0);
      });

      setPollResult(tmpArray);
    });
    return () => socket.off("receivePoll");
  });

  useEffect(() => {
    if (socket == null) return;
    socket.on("pullPollUpdate", (data) => {
      console.log("This is the prev poll", pollResult);

      const newPollResult = [...pollResult];
      newPollResult[data.index] += 1;

      console.log("This is the after poll", newPollResult);

      setPollResult(newPollResult);
    });
    return () => socket.off("pullPollUpdate");
  });

  useEffect(() => {
    console.log("The List of user has changed");
  }, [userList]);

  useEffect(() => {
    console.log("The messages has changed");
  }, [messages]);

  function createRandomString(length = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function setWindow(tmp) {
    window.name = createRandomString();

    console.log(window.name);
    localStorage.setItem(
      window.name,
      JSON.stringify({ name: name, isTeacher: tmp })
    );
  }

  const sendConnectionInfo = (id) => {
    socket.emit("join", {
      teacherId: id,
      userId: window.name,
      username: name,
    });
  };

  const removeUser = (id, oldList) => {
    const newList = oldList.filter((user) => {
      return user.userId !== id;
    });

    socket.emit("updateUserList", newList);

    updateLocalStorage("userList", newList);
    setUserList(newList);
  };

  const updateLocalStorage = (key, value) => {
    const obj = JSON.parse(localStorage.getItem(window.name));
    obj[key] = value;
    localStorage.setItem(window.name, JSON.stringify(obj));
  };

  const updateUserList = (newUser) => {
    const newList = [...userList];
    newList.push(newUser);
    updateLocalStorage("userList", newList);

    // console.log("Inside the updateUserList function: ", newList);

    socket.emit("updateUserList", newList);
    setUserList(newList);
  };

  const braodCastMessage = (msg) => {
    const newMessages = [...messages];
    const msgObj = { userId: window.name, username: name, message: msg };
    newMessages.push(msgObj);

    updateLocalStorage("messages", newMessages);
    socket.emit("sendMessage", { msgs: msgObj, users: userList });
    setMessages(newMessages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (countDown > 60) {
    //   alert("Max limit for time is 60 seconds");
    //   return;
    // }
    if (question === "") {
      alert("Please Enter the questoin");
      return;
    }
    if (countDown <= 0) {
      alert("Please Enter a feasable time");
      return;
    }

    socket.emit("sendPoll", {
      question: question,
      options: options,
      users: userList,
      time: countDown,
    });

    const tmpArray = [];
    options.forEach(() => {
      tmpArray.push(0);
    });

    setPollResult(tmpArray);
    setRunTimer(true);
    setFormSubmitted(true);

    updateLocalStorage("question", question);
    updateLocalStorage("options", options);
    updateLocalStorage("countDown", countDown);
    updateLocalStorage("runTimer", true);
    updateLocalStorage("pollResult", tmpArray);
    updateLocalStorage("formSubmitted", true);
  };

  const pollSubmitted = (i) => {
    if (i === -1) return;

    socket.emit("pushPollUpdate", {
      users: userList,
      index: i,
    });

    const newPollResult = [...pollResult];
    newPollResult[i] += 1;
    setPollResult(newPollResult);

    console.log("The option chose is: ", i);
  };

  console.log("trying to console the student", isTeacher);

  return (
    <div className="bg-[#5f6368] h-screen w-screen">
      {isTeacher === null ? (
        <Login
          setIsTeacher={setIsTeacher}
          name={name}
          setName={setName}
          setWindow={setWindow}
          updateLocalStorage={updateLocalStorage}
        />
      ) : isTeacher ? (
        <Teacher
          name={name}
          teacherId={teacherId}
          setTeacherId={setTeacherId}
          socket={socket}
          sendConnectionInfo={sendConnectionInfo}
          updateUserList={updateUserList}
          userList={userList}
          removeUser={removeUser}
          updateLocalStorage={updateLocalStorage}
          braodCastMessage={braodCastMessage}
          messages={messages}
          options={options}
          question={question}
          formSubmitted={formSubmitted}
          setOptions={setOptions}
          setQuestion={setQuestion}
          setFormSubmitted={setFormSubmitted}
          handleSubmit={handleSubmit}
          pollResult={pollResult}
          setPollResult={setPollResult}
          countDown={countDown}
          setCountDown={setCountDown}
          runTimer={runTimer}
          setRunTimer={setRunTimer}
        />
      ) : (
        <Student
          name={name}
          teacherId={teacherId}
          setTeacherId={setTeacherId}
          sendConnectionInfo={sendConnectionInfo}
          updateUserList={updateUserList}
          userList={userList}
          updateLocalStorage={updateLocalStorage}
          braodCastMessage={braodCastMessage}
          messages={messages}
          question={question}
          options={options}
          pollResult={pollResult}
          setPollResult={setPollResult}
          pollSubmitted={pollSubmitted}
          countDown={countDown}
          setCountDown={setCountDown}
          runTimer={runTimer}
          setRunTimer={setRunTimer}
          isTeacher={isTeacher}
          showLivePoll={showLivePoll}
          setShowLivePoll={setShowLivePoll}
        />
      )}
    </div>
  );
}

export default App;
