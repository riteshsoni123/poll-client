import React from "react";

function PollForm(props) {
  // const [question, setQuestion] = useState("");
  // const [options, setOptions] = useState([]);

  const {
    options,
    setOptions,
    question,
    setQuestion,
    handleSubmit,
    countdown,
    setCountDown,
  } = props;

  const handleOptionChange = (i, e) => {
    let newOptions = [...options];
    newOptions[i] = e.target.value;
    setOptions(newOptions);
  };

  const removeField = (i) => {
    let newOptions = [...options];
    newOptions.splice(i, 1);
    setOptions(newOptions);
  };

  const addField = () => {
    setOptions([...options, ""]);
  };

  return (
    <div className="border-2 h-full flex flex-col justify-center items-center">
      <div>Enter the question and the options</div>
      <div className="bg-[#BABCBE] w-2/3 rounded-xl flex flex-col justify-center items-center my-10 py-10 px-4">
        <div className="w-full flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-full"
          >
            <div className="flex flex-col justify-center items-center w-full [&>input]:w-full [&>input]:my-2 [&>input]:py-2 [&>input]:px-1 [&>input]:rounded-lg">
              <input
                type="text"
                placeholder="Enter the question for the poll"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <input
                type="number"
                value={countdown}
                placeholder="Enter the time limit"
                onChange={(e) => setCountDown(e.target.value)}
              />
            </div>
            <div className="w-full">
              {options.map((option, i) => {
                return (
                  <div
                    className="flex flex-row justify-center items-center w-full [&>input]:w-2/3 [&>input]:my-2 [&>input]:py-2 [&>input]:px-1 [&>input]:rounded-lg"
                    key={i}
                  >
                    <input
                      type="text"
                      placeholder="Enter the value"
                      value={option}
                      onChange={(e) => {
                        handleOptionChange(i, e);
                      }}
                    />
                    <button
                      className="bg-[#494F55] text-[#BABCBE] m-2 p-2 rounded-lg"
                      onClick={() => removeField(i)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                className="bg-[#494F55] text-[#BABCBE] px-10 py-2 rounded-xl"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div>
          <button
            className="bg-[#494F55] text-[#BABCBE] px-10 py-2 rounded-xl my-2"
            onClick={() => addField()}
          >
            Add Options
          </button>
        </div>
      </div>
    </div>
  );
}

export default PollForm;
