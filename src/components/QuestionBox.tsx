import { useEffect, useRef, useState } from "react";
import { QuestionBoxType } from "../types/question";
import Category from "./Category";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../util/useSupabase";
import Revealed from "./Revealed";
import GameEnd from "./GameEnd";

export default function QuestionBox({
  question,
  options,
  point,
  nextFn,
  answer,
  explanation,
  session_id,
}: QuestionBoxType & {
  nextFn: () => void;
  session_id: string;
}) {
  const [endOpen, setEndOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const timerRef = useRef<NodeJS.Timeout>();

  const [timerUpdater, setTimerUpdater] = useState(0);

  const [submiting, setSubmiting] = useState(false);

  const [userAnswer, setUserAnswer] = useState<null | string>(null);

  const [revealed, setRevealed] = useState(false);

  const name = searchParams.get("name");
  const diff = searchParams.get("diff");

  // difficality timer
  useEffect(() => {
    // hardcore
    if (diff === "Hardcore") {
      timerRef.current = setTimeout(() => {
        autoAnswer();
      }, 8000);
    } else if (diff === "INSANE") {
      timerRef.current = setTimeout(() => {
        autoAnswer();
      }, 6000);
    } else {
      clearTimeout(timerRef.current);
    }
  }, [timerUpdater]);

  function autoAnswer() {
    if (userAnswer === null) {
      setUserAnswer("empty");
    }

    onAnswer();
  }

  const [points, setPoints] = useState(0);

  async function onAnswer() {
    setSubmiting(true);

    console.log(answer);

    setRevealed(true);

    try {
      await supabase.from("answers").insert([
        {
          name: name,
          question: question,
          answer: userAnswer,
          points: answer === userAnswer ? point : point * -1,
          session_id: session_id,
        },
      ]);

      if (userAnswer == answer) {
        updatePoints();
      } else {
        if (diff === "INSANE") {
          updatePoints();
        }
      }
      setSubmiting(false);
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

      const acumPoint = data?.reduce((acum, current) => {
        const realPoint =
          diff === "INSANE"
            ? current.points
            : Math.abs(parseFloat(current.points));

        console.log(current.points);

        return acum + realPoint;
      }, 0);
      setPoints(acumPoint ? acumPoint : 0);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <GameEnd score={points} name={name ? name : ""} open={endOpen} />

      <Revealed
        explanation={explanation ? explanation : ""}
        open={revealed}
        setOpen={setRevealed}
        next={nextFn}
        setUserAnswer={setUserAnswer}
        setTimerUpdater={setTimerUpdater}
        setEndOpen={setEndOpen}
        givenAnswer={userAnswer ? userAnswer : ""}
        correctAnswer={answer}
      />

      <div
        className="bg-[#f8f8f8] text-black w-full max-w-[500px] flex flex-col items-center justify-center gap-2 rounded-xl drop-shadow-lg py-4 overflow-hidden"
        style={{ direction: "rtl" }}
      >
        {/* Timer */}
        <div
          style={{
            visibility:
              diff === "Hardcore" || diff === "INSANE" ? "visible" : "hidden",
          }}
          key={timerUpdater}
          className={`h-3 w-full bg-red-500 absolute top-0 left-0 
          ${diff === "Hardcore" ? "hardcore-timer" : ""}
          ${diff === "INSANE" ? "insane-timer" : ""}`}
        ></div>

        <h2 className="text-center text-lg font-semibold mx-4">
          {name} Score : <span className="italic">{points}</span>
        </h2>

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
                  checked={userAnswer === _option}
                  onChange={() => setUserAnswer(_option)}
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
          disabled={
            userAnswer === null || diff === "Hardcore" || diff === "INSANE"
          }
          className={`px-4 py-2 mt-4 bg-emerald-500 rounded-lg disabled:saturate-[0.2] text-white font-semibold ${
            submiting ? "animate-pulse" : ""
          }`}
          style={{
            direction: "rtl",
          }}
          onClick={() => {
            onAnswer();
          }}
        >
          {submiting ? "Submiting" : "Submit"}
        </button>
      </div>
    </>
  );
}
