import { useEffect, useState } from "react";
import Option from "./Option";
import { supabase } from "../../util/useSupabase";
import { QuestionBoxType } from "../../types/question";

export default function Edit({
  id,
  setOpen,
  fetchQuestions,
}: {
  id: string;
  setOpen: CallableFunction;
  fetchQuestions: CallableFunction;
}) {
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");
  const [points, setPoints] = useState(0);
  const [category, setCategory] = useState("essentials");
  const [options, setOptions] = useState([
    {
      option: "",
      isAnswer: false,
    },
    {
      option: "",
      isAnswer: false,
    },
  ]);

  const [loading, setLoading] = useState(true);

  async function getQuestion() {
    try {
      const { data } = (await supabase
        .from("questions")
        .select("*")
        .eq("id", id)) as { data: QuestionBoxType[] };

      const currectFormatOption = data[0].options.map((option) => {
        return {
          option: option,
          isAnswer: `${option}` === `${data[0].answer}` ? true : false,
        };
      });

      setQuestion(data[0].question);
      setPoints(data[0].point);
      setExplanation(data[0].explanation ? data[0].explanation : "");
      setCategory(data[0].category);
      setOptions(currectFormatOption);
      setLoading(false);
    } catch (_err) {
      alert("failed");
      console.log(_err);
    }
  }

  useEffect(() => {
    getQuestion();
  }, []);

  function onCancle() {
    setOpen(false);
  }

  async function onAdd() {
    setLoading(true);

    const currectOptionsFormat = options.map((option) => {
      return option.option;
    });

    const answerIndex = options.findIndex((option) => {
      if (option.isAnswer === true) {
        return true;
      } else {
        return false;
      }
    });

    try {
      await supabase
        .from("questions")
        .update([
          {
            question: question,
            options: currectOptionsFormat,
            answer: options[answerIndex].option,
            point: points,
            explanation: explanation,
            image: null,
            category: category,
          },
        ])
        .eq("id", id);
      setOpen(false);
      fetchQuestions();
      setLoading(false);
    } catch (_err) {
      alert("failed to submit");
      console.log(_err);

      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed left-0 top-0 w-full h-svh bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 text-sm">
        <div className="flex flex-col gap-4 items-center bg-[#fafafa] max-w-[450px] w-full rounded-2xl px-4 py-6 mx-3 relative overflow-scroll h-full">
          {loading && (
            <div className="fixed left-0 top-0 size-full flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm text-lg font-semibold z-[100]">
              <span>Loading...</span>
            </div>
          )}

          <h3 className="text-[#333] text-2xl font-semibold mt-2 mb-4">
            Edit Question
          </h3>

          <input
            className="drop-shadow-md w-full border-2 bg-gray-50 border-emerald-300 rounded-full px-4 py-3 focus:outline-emerald-500 text-[#333] focus:bg-white"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {/* options and answer */}
          <Option options={options} setOptions={setOptions} />

          <input
            className="drop-shadow-md w-full border-2 bg-gray-50 border-emerald-300 rounded-full px-4 py-3 focus:outline-emerald-500 text-[#333] focus:bg-white"
            type="number"
            placeholder="Points"
            value={points}
            onChange={(e) => setPoints(parseFloat(e.target.value))}
          />

          <textarea
            className="drop-shadow-md w-full border-2 bg-gray-50 border-emerald-300 rounded-xl px-4 py-3 focus:outline-emerald-500 text-[#333] focus:bg-white"
            placeholder="Explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />

          <label className="text-[#333] w-full ml-4 ">Category</label>
          <select
            className="w-full text-[#333] border-2 border-emerald-300 focus:outline-emerald-500 py-3 px-4 rounded-xl"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="essentials">essentials</option>
            <option value="varyan expert">varyan expert</option>
            <option value="esoteric to varyan">esoteric to varyan</option>
          </select>

          <div className="flex gap-5 text-base">
            <button
              className="bg-red-500 px-4 font-semibold py-3 rounded-xl mt-1"
              onClick={onCancle}
              type="submit"
            >
              Cancle
            </button>
            <button
              className="bg-emerald-500 px-4 font-semibold py-3 rounded-xl mt-1"
              onClick={onAdd}
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
