import { useNavigate } from "react-router-dom";
import "./css/crooked-frames.css";
import { useState } from "react";

function App() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [difficalityInfoOpen, setDifficalityInfoOpen] = useState(false);

  const [selectedDifficality, setSelectedDifficality] = useState("Normal");

  return (
    <div className="w-full h-full background-scroll-animation">
      {/* difficality Info */}
      <div
        onClick={() => setDifficalityInfoOpen(false)}
        className={`fixed top-0 left-0 size-full flex items-center justify-center transition-all duration-150 bg-black ${
          difficalityInfoOpen
            ? "bg-opacity-10 backdrop-blur-[2px] z-[9999]"
            : "bg-opacity-0 backdrop-blur-0 z-[-9999] "
        }`}
      >
        <div
          className={`bg-white text-black py-4 rounded-xl drop-shadow-xl flex flex-col items-center transition-all duration-150 gap-2 ${
            difficalityInfoOpen ? "scale-100" : "scale-0"
          }`}
        >
          <h3 className="font-bold text-base tracking-wider">
            Difficality Options
          </h3>
          <p className="text-sm">You'r score is multiplyed by Point Ratio</p>
          <hr className="w-full border-gray-400" />

          <div className="max-w-[450px] w-full grid grid-cols-2 gap-y-4 gap-x-2">
            {/* normal */}
            <div className="bg-sky-200 ml-3 px-5 py-2 rounded-xl">
              <h4 className="text-sky-700 font-semibold text-lg mb-1">
                Normal
              </h4>
              <hr className="w-full border-sky-500 mt-0 mb-2" />

              <p>
                Questions from every category, You can take you'r time to think
                about you'r answer and the submit it
              </p>
              <span className="inline-block font-semibold mt-2 border-b-2 border-sky-500 text-sky-900 w-auto text-sm">
                Point Ratio : <span>1x</span>
              </span>
            </div>

            {/* hardcore */}
            <div className="bg-amber-200 mr-3 px-5 py-2 rounded-xl flex flex-col items-start">
              <h4 className="text-amber-700 font-semibold text-lg mb-1">
                Hardcore
              </h4>
              <hr className="w-full border-amber-500 mt-0 mb-2" />

              <p>
                Questions from every category, But you only have 10 seconds to
                answer the question
              </p>
              <span className="inline-block font-semibold mt-auto border-b-2 border-amber-500 text-amber-900 w-auto text-sm">
                Point Ratio : <span>1.25x</span>
              </span>
            </div>

            {/* insane */}
            <div className="bg-red-200 mx-3 px-5 py-2 rounded-xl col-span-full">
              <h4 className="text-red-700 font-semibold text-lg mb-1 italic">
                INSANE
              </h4>
              <hr className="w-full border-red-500 mt-0 mb-2" />

              <p>
                You have 8 seconds to answer the question. if you don't answer
                OR answer wrong you will get{" "}
                <span className="px-2 py-1 bg-red-400 rounded-lg italic">
                  Negative
                </span>{" "}
                point
              </p>
              <span className="inline-block font-semibold mt-2 border-b-2 border-red-500 text-red-900 w-auto">
                Point Ratio : <span>1.8x</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-wraper h-full w-full">
        <section className="mx-4 px-4 sm:container max-h-[calc(100%-50px)] sm:max-h-[756px] foreground-pattern-scroll saw-tooth sm:mx-auto h-full bg-[#286D59] saturate-[0.75] flex flex-col gap-6 items-center justify-center sm:justify-start py-6 translate-y-[8px] sm:translate-y-0">
          <div className="flex flex-col gap-6 items-center px-4 w-full max-w-full md:max-w-[400px]">
            {/* headline text */}
            <div className="text-center p-5 md:p-10 crooked-frame w-full md:w-max">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wider mb-2 md:mb-4">
                Varyan Quizz
              </h1>
              <p className="text-base font-semibold md:text-lg lg:text-xl text-wrap  md:max-w-full text-center">
                Prove you'r self to the Almighty Varyan officials
              </p>
            </div>

            {/* settings */}
            <div className="bg-[#b9d4cc] text-black flex flex-col py-4 px-6 gap-6 rounded-lg text-center w-full">
              {/* Info */}
              <div className="flex flex-col gap-3 sm:gap-6">
                <h2 className="font-bold text-base sm:text-lg ">
                  Enter You'r Name
                </h2>

                <input
                  className="w-full pl-3 py-2 rounded-lg outline-cyan-300 neon-shadow"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <hr className="border-black border-opacity-40" />
              {/* game mode */}
              <div className="flex gap-2">
                <select
                  className="w-full py-2 rounded-lg pl-3 italic"
                  value={selectedDifficality}
                  onChange={(e) => setSelectedDifficality(e.target.value)}
                >
                  <option
                    value="Normal"
                    className="bg-sky-200 font-semibold text-sky-900"
                  >
                    Normal
                  </option>
                  <option
                    value="Hardcore"
                    className="bg-amber-300 font-semibold text-amber-900"
                  >
                    Hardcore
                  </option>
                  <option
                    value="INSANE"
                    className="bg-red-400 font-semibold text-red-900"
                  >
                    INSANE
                  </option>
                </select>

                {/* difficality info button */}
                <button
                  onClick={() => {
                    setDifficalityInfoOpen(true);
                  }}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                    className="size-8 stroke-sky-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* start the game button  */}
          <button
            className="bg-cyan-500 rounded-md px-8 py-3 text-xl sm:text-2xl font-semibold transition-all duration-150 hover:bg-cyan-400 hover:scale-105 hover:drop-shadow-lg"
            onClick={() => {
              document.body.classList.add("closed");
              setTimeout(() => {
                navigate(`/game?name=${name}&diff=${selectedDifficality}`);
                document.body.classList.remove("closed");
              }, 500);
            }}
          >
            Start
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
