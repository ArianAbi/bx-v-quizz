import { useState } from "react";
import { QuestionBoxType } from "../types/question";
import Category from "./Category";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../util/useSupabase";

export default function QuestionBox({
  question,
  options,
  point,
  nextFn,
  session_id,
}: QuestionBoxType & { nextFn: () => void; session_id: string }) {
  const [searchParams] = useSearchParams();

  const [submiting, setSubmiting] = useState(false);

  const [answer, setAnswer] = useState<null | string>(null);

  const name = searchParams.get("name");
  const [points, setPoints] = useState(0);

  async function onAnswer() {
    setSubmiting(true);

    try {
      await supabase.from("answers").insert([
        {
          name: name,
          question: question,
          answer: answer,
          points: point,
          session_id: session_id,
        },
      ]);
      setSubmiting(false);
      updatePoints();
      nextFn();
      setAnswer("");
    } catch (err) {
      alert("Failed");
      setSubmiting(false);
      console.log(err);
    }
  }

  async function updatePoints() {
    try {
      const { data } = await supabase
        .from("answers")
        .select("points")
        .eq("name", name)
        .eq("session_id", session_id);

      const acumPoint = data?.reduce(
        (acum, current) => acum + current.points,
        0
      );
      console.log(acumPoint);
      setPoints(acumPoint ? acumPoint : 0);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div
        className="bg-[#f8f8f8] text-black w-full max-w-[500px] flex flex-col items-center justify-center gap-2 rounded-xl drop-shadow-lg py-4"
        style={{ direction: "rtl" }}
      >
        <h2 className="text-center text-lg font-semibold mx-4">{name}</h2>
        <span>Points : {points}</span>

        <h2 className="text-center text-lg font-semibold mx-4">{question}</h2>

        <div className="flex justify-between items-center px-6 font-semibold mt-2 w-full">
          <span className="border-b-2 border-sky-500">Points : {point}</span>
          <Category category="essentials" />
        </div>

        <hr className="w-full my-2 border-gray-300" />

        <div className="flex flex-col gap-2 mx-4">
          {options.map((_option) => {
            return (
              <label className="text-right flex gap-3 items-center text-lg justify-start relative">
                <input
                  className="form-radio peer ring-0 scale-90 peer cursor-pointer"
                  type="radio"
                  name="question"
                  checked={answer === _option}
                  onChange={() => setAnswer(_option)}
                />
                <div className="size-[16px] rounded-full peer-disabled:saturate-50 bg-white peer-checked:bg-sky-500 peer-checked:ring-offset-1 ring-sky-500 peer-checked:scale-[1.2] transition-all duration-75 ring-2 absolute right-0 top-2/4 -translate-y-2/4 pointer-events-none"></div>
                <span className="peer-checked:border-b-2 border-sky-500">
                  {_option}
                </span>
              </label>
            );
          })}
        </div>

        <button
          disabled={answer === null}
          className={`px-4 py-2 mt-4 bg-emerald-500 rounded-lg disabled:saturate-[0.2] text-white font-semibold ${
            submiting ? "animate-pulse" : ""
          }`}
          style={{ direction: "rtl" }}
          onClick={() => {
            onAnswer();
          }}
        >
          {submiting ? "Submiting" : "Next"}
        </button>
      </div>
    </>
  );
}
