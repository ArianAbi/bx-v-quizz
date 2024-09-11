import { useEffect, useState } from "react";
import { supabase } from "./util/useSupabase";
import { generateRandomIndexInRange } from "./util/useRandomIndexGenerator";
import { QuestionBoxType } from "./types/question";
import QuestionBox from "./components/QuestionBox";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

export default function Game() {
  const [session_id, setSessionId] = useState("");

  const [randomIndex, setRandomIndex] = useState<number[]>([0]);
  const [questions, setQuestions] = useState<QuestionBoxType[] | null>(null);

  const [_loading, setLoading] = useState(false);

  async function getQuestions() {
    const { data } = await supabase.from("questions").select("*");

    return data;
  }

  useEffect(() => {
    setSessionId(uuidv4());

    getQuestions().then((questions) => {
      if (!questions) {
        return;
      }

      setRandomIndex(generateRandomIndexInRange(questions.length));
      setQuestions(questions);
      setLoading(false);
    });
  }, []);

  function next() {
    if (randomIndex.length === 1) {
      alert("Done");
      return;
    }

    const newArray = [...randomIndex];
    newArray.shift();

    setRandomIndex(newArray);
  }

  return (
    <>
      <div className="w-full background-scroll-animation flex flex-col h-full items-center justify-center px-2 mx-auto">
        {questions && (
          <QuestionBox
            {...questions[randomIndex[0]]}
            nextFn={next}
            session_id={session_id}
          />
        )}
      </div>
    </>
  );
}
