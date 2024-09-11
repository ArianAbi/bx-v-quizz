export default function Option({
  options,
  setOptions,
}: {
  options: any[];
  setOptions: CallableFunction;
}) {
  function add() {
    if (options.length >= 4) {
      return;
    }

    const newOptions = [...options];

    newOptions.push({
      option: "",
      isAnswer: false,
    });

    setOptions(newOptions);
  }

  function remove() {
    if (options.length <= 2) {
      return;
    }

    const newOptions = [...options];

    newOptions.pop();

    setOptions(newOptions);
  }

  return (
    <>
      <div className="w-full px-2 py-2 flex flex-col gap-2">
        {options.map((option, _i) => {
          return (
            <div className="flex items-center justify-center gap-2">
              <input
                className="drop-shadow-md w-full border-2 bg-gray-50 border-emerald-300 rounded-full px-4 py-3 focus:outline-emerald-500 text-[#333] focus:bg-white"
                placeholder={`Option ${_i + 1}`}
                value={option.option}
                onChange={(e) => {
                  const newOptions = [...options];

                  newOptions[_i].option = e.target.value;

                  setOptions(newOptions);
                }}
              />

              <input
                className="size-[25px]"
                type="radio"
                name="option"
                onChange={(e) => {
                  if (e.target.checked) {
                    const newOptions = [...options];

                    newOptions[_i].isAnswer = true;

                    setOptions(newOptions);
                  }
                }}
              />
            </div>
          );
        })}

        <button className="flex justify-between w-full  items-center mt-2">
          <button
            type="button"
            onClick={remove}
            className="bg-red-600 px-4 py-3 rounded-xl font-semibold text-white"
          >
            Remove
          </button>
          <button
            type="button"
            onClick={add}
            className="bg-emerald-600 px-4 py-3 rounded-xl font-semibold text-white"
          >
            Add
          </button>
        </button>
      </div>
    </>
  );
}
