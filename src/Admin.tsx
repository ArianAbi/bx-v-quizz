import { FocusEvent, useEffect, useState } from "react";
import { supabase } from "./util/useSupabase";
import { QuestionBoxType } from "./types/question";
import Add from "./components/admin/Add";
import Edit from "./components/admin/Edit";

export default function Admin() {
  const [verifying, setVerifying] = useState(false);

  const [addOpen, setAddOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [questions, setQuestions] = useState<null | QuestionBoxType[]>(null);

  const [loading, setLoading] = useState(true);

  function verifyAdmin(e: FocusEvent<HTMLFormElement>) {
    e.preventDefault();

    setVerifying(true);

    if (
      username === import.meta.env.VITE_ADMIN_USER &&
      password === import.meta.env.VITE_ADMIN_PASS
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      setVerifying(false);
    }
  }

  async function fetchQuestions() {
    setLoading(true);

    try {
      const { data } = await supabase.from("questions").select("*").range(0, 9);

      setQuestions(data);
      setLoading(false);
    } catch (_err) {
      setLoading(false);
      console.log(_err);
    }
  }

  useEffect(() => {
    if (isAdmin) {
      fetchQuestions();
    }
  }, [isAdmin]);

  async function onDelete(id: string, question: string) {
    if (confirm(`Delete Question : ${question}?`)) {
      setLoading(true);

      try {
        await supabase.from("questions").delete().eq("id", id);

        setLoading(false);
        fetchQuestions();
      } catch (_err) {
        alert("failed to delete");
        setLoading(false);
        console.log(_err);
      }
    }
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center w-screen h-svh">
        <div className="w-full flex flex-col gap-2 items-center max-w-[500px] py-4 bg-[#fafafa] shadow-md mx-2 px-3 rounded-xl">
          <h3 className="text-[#333] text-2xl font-semibold mt-2 mb-4">
            BaxeVaryan Admin
          </h3>

          <form
            className="flex flex-col gap-5 items-center w-full"
            onSubmit={verifyAdmin}
          >
            <input
              className="drop-shadow-md w-full border-2 bg-gray-50 border-emerald-300 rounded-full px-4 py-3 focus:outline-emerald-500 text-[#333] focus:bg-white"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              className="drop-shadow-md w-full border-2 bg-gray-50 border-emerald-300 rounded-full px-4 py-3 focus:outline-emerald-500 text-[#333] focus:bg-white"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button
              className={`bg-emerald-500 px-4 text-xl font-semibold py-3 rounded-xl mt-4 ${
                verifying ? "animate-pulse" : ""
              }`}
            >
              {verifying ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center w-screen min-h-svh h-full pt-4 relative">
        {addOpen && (
          <Add setOpen={setAddOpen} fetchQuestions={fetchQuestions} />
        )}

        {editOpen && (
          <Edit
            id={editQuestionId}
            setOpen={setEditOpen}
            fetchQuestions={fetchQuestions}
          />
        )}

        <div className="w-full h-full flex flex-col gap-2 items-center max-w-[500px] py-4 bg-[#fafafa] text-[#333] shadow-md mx-2 px-3 rounded-xl text-sm relative">
          {/* add new question */}
          <button
            onClick={() => setAddOpen(true)}
            className="absolute right-4 stroke-emerald-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="inherit"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>

          <h3 className="text-[#333] text-xl font-semibold mt-2 mb-4">
            BaxeVaryan Admin
          </h3>

          <ol
            className="border-2 rounded-xl min-h-[150px] w-full relative overflow-y-scroll"
            style={{ direction: "rtl" }}
          >
            {loading && (
              <div className="absolute left-0 top-0 size-full bg-black bg-opacity-20 backdrop-blur-sm z-[55] flex items-center justify-center">
                <span
                  style={{ direction: "ltr" }}
                  className="animate-pulse text-lg font-semibold"
                >
                  Loading...
                </span>
              </div>
            )}

            {questions &&
              questions.map((question, _i) => {
                return (
                  <li className="font-semibold w-full py-3 px-6 even:bg-gray-200">
                    {/* number */}
                    <span className="ml-2">{_i + 1 + "."}</span>
                    {/* question */}
                    <span>{question.question}</span>
                    {/* edit */}
                    <button
                      onClick={() => {
                        setEditQuestionId(question.id);
                        setEditOpen(true);
                      }}
                      className="stroke-emerald-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="inherit"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    {/* delete */}
                    <button
                      onClick={() => onDelete(question.id, question.question)}
                      className="stroke-red-500 mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="inherit"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    </>
  );
}
