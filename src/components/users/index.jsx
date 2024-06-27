import React from "react";

function Users(props) {
  const { isTeacher, userList, removeUser } = props;

  return (
    <div className="w-full">
      <div className="bg-[#494F55] text-[#BABCBE] text-center text-2xl p-2 rounded-t-xl">
        List of users
      </div>
      {userList.map((user) => {
        return (
          <div key={user.userId}>
            {user.userId === user.teacherId ? (
              <div className="border-b-2 px-2" key={user.userId}>
                <span className="text-3xl"> {user.username}</span>
              </div>
            ) : (
              <> </>
            )}
          </div>
        );
      })}
      {userList.map((user) => {
        return (
          <div className="border-2 px-2" key={user.userId}>
            {user.userId !== user.teacherId ? (
              <div className="p-2 flex flex-row justify-between">
                <span className="text-xl">{user.username}</span>
                {isTeacher ? (
                  <button
                    className="bg-[#494F55] text-[#BABCBE] px-2 rounded-lg"
                    onClick={() => removeUser(user.userId, userList)}
                  >
                    Remove
                  </button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Users;
