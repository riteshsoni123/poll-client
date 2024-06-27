import React from "react";

function Users(props) {
  const { isTeacher, userList, removeUser } = props;

  return (
    <div>
      <div className="bg-[#494F55] text-[#BABCBE] text-center text-2xl p-2 rounded-t-xl">
        List of users
      </div>
      {userList.map((user) => {
        return (
          <div key={user.userId}>
            {user.userId === user.teacherId ? (
              <div key={user.userId}>
                <span>{user.username}</span>
              </div>
            ) : (
              <> </>
            )}
          </div>
        );
      })}
      {userList.map((user) => {
        return (
          <div key={user.userId}>
            {user.userId !== user.teacherId ? (
              <div>
                <span>{user.username}</span>
                {isTeacher ? (
                  <button onClick={() => removeUser(user.userId, userList)}>
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
