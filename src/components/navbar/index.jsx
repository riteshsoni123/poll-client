import React from "react";

function Navbar(props) {
  const {
    name,
    isTeacher,
    teacherId,
    tId,
    settId,
    createRoom,
    inRoom,
    setTeacherId,
    setInRoom,
    sendConnectionInfo,
    updateUserList,
  } = props;
  console.log(name, isTeacher, teacherId);

  return (
    <div className="bg-[#4D4D4D] shadow-2xl py-4 flex justify-around items-center [&>div]:border2 [&>div>span]:mx-2  [&>div]:w-1/4">
      <div className="text-white">
        <span className="text-2xl">Name:</span>
        <span className="text-xl">{name}</span>
      </div>
      <div className="text-white">
        <span className="text-2xl">Profession:</span>
        <span className="text-xl">{isTeacher ? "Teacher" : "Student"}</span>
      </div>

      {isTeacher ? (
        teacherId !== "" ? (
          <div className="text-white">
            {console.log("bazinga", teacherId !== "", teacherId !== undefined)}
            <span className="text-2xl">Room Id:</span>
            <span className="text-xl">{teacherId}</span>
          </div>
        ) : isTeacher ? (
          <button className="text-white" onClick={() => createRoom()}>
            Create Room
          </button>
        ) : (
          <div className="text-2xl">Not in room</div>
        )
      ) : !inRoom ? (
        <div>
          <input
            className="px-1 rounded-lg font-black"
            type="text"
            placeholder="Enter the room id"
            // ref={tId}
            onChange={(e) => settId(e.target.value)}
          />
          <button
            className="text-[#494F55] bg-[#BABCBE] mx-4 px-4 rounded-lg"
            onClick={() => {
              setTeacherId(tId);
              setInRoom(true);
              sendConnectionInfo(tId);

              updateUserList({
                teacherId: tId,
                userId: window.name,
                username: name,
              });

              const obj = JSON.parse(localStorage.getItem(window.name));
              obj.teacherId = tId;
              obj.inRoom = true;
              localStorage.setItem(window.name, JSON.stringify(obj));
            }}
          >
            Join
          </button>
        </div>
      ) : (
        <div className="text-white">
          <span className="text-2xl">Room Id:</span>
          <span className="text-xl">{tId}</span>
        </div>
      )}
    </div>
  );
}

export default Navbar;
