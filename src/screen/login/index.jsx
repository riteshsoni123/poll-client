import React, { useRef } from "react";

function Login(props) {
  const { setIsTeacher, name, setName, setWindow } = props;
  const profession = useRef("None");

  const handleProfession = (event) => {
    event.preventDefault();
    profession.current = event.target.value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let tmp = false;
    if (profession.current === "None") {
      alert("Please chose the profession");
      return;
    } else if (name === "") {
      alert("please Enter your name");
      return;
    } else if (profession.current === "Teacher") {
      //   window.isTeacher = true;
      tmp = true;
      setIsTeacher(true);
    } else {
      //   window.isTeacher = false;
      setIsTeacher(false);
    }
    // localStorage.setItem(window.name, name);
    setWindow(tmp);
  };

  return (
    <div className="">
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="profession">Choose a Profession:</label>
        <select name="profession" id="profession" onChange={handleProfession}>
          <option value="None">None</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            // window.name = e.target.value;
          }}
          />
        <input type="submit" />
      </form> */}

      <div className="bg-[#5f6368] flex items-center justify-center w-screen h-screen">
        <div className="bg-[#BABCBE] flex rounded-2xl shadow-lg max-w-3xl p-5 justify-center items-center">
          <div className="md:w-1/2 p-16">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label htmlFor="profession">Choose a Profession:</label>
              <select
                name="profession"
                id="profession"
                onChange={handleProfession}
                className="p-2 rounded-xl"
              >
                <option value="None">None</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>

              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <button
                type="submit"
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                Enter
              </button>
            </form>
          </div>
          <div className="w-1/2 md:block hidden">
            <img
              className="rounded-2xl"
              src="https://images.pexels.com/photos/2681319/pexels-photo-2681319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
