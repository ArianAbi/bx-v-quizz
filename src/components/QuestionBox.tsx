import { QuestionBoxType } from "../types/question";
import Category from "./Category";

export default function QuestionBox({
  question,
  options,
  nextFn,
}: QuestionBoxType & { nextFn: () => void }) {
  return (
    <>
      <div
        className="bg-[#f8f8f8] text-black w-full max-w-[500px] flex flex-col items-center justify-center gap-2 rounded-xl drop-shadow-lg py-4"
        style={{ direction: "rtl" }}
      >
        <h2 className="text-center text-lg font-semibold mx-4">{question}</h2>

        <div className="flex justify-between items-center px-6 font-semibold mt-2 w-full">
          {/* <span>Points : {point}</span> */}
          {/* <Category category="essentials" /> */}
          <Category category="varyan expert" />
          <Category category="esoteric to varyan" />
        </div>

        <hr className="w-full my-2 border-gray-300" />

        <div className="flex flex-col gap-2 mx-4">
          {options.map((_option) => {
            return (
              <label className="text-right flex gap-2 items-center text-lg justify-start">
                <input
                  className="form-radio peer ring-0 scale-90 peer cursor-pointer"
                  type="radio"
                  name="question"
                  value={_option}
                />
                <div className="size-[16px] rounded-full peer-disabled:saturate-50 bg-white peer-checked:bg-amber-500 peer-checked:ring-offset-1 ring-amber-500 peer-checked:scale-[1.2] transition-all duration-75 ring-2 absolute left-0 top-2/4 -translate-y-2/4 pointer-events-none"></div>
                <span>{_option}</span>
              </label>
            );
          })}
        </div>

        <button
          className="px-4 py-2 mt-4 bg-emerald-500 rounded-lg text-white font-semibold"
          onClick={() => nextFn()}
        >
          Next
        </button>
      </div>
    </>
  );
}
