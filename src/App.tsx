import { useNavigate } from "react-router-dom";
import "./css/crooked-frames.css";

function App() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full background-scroll-animation">
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
                />
              </div>
              <hr className="border-black border-opacity-40" />
              {/* game mode */}
              <div className="flex flex-col items-center justify-center gap-1">
                <select
                  className="w-full py-2 rounded-lg pl-3 italic brightness-90"
                  disabled
                  value="mixed"
                >
                  <option>Mixed</option>
                </select>

                <span className="text-base mt-1 italic">
                  for now the only category is Mixed
                </span>
              </div>
            </div>
          </div>

          {/* start the game button  */}
          <button
            className="bg-cyan-500 rounded-md px-8 py-3 text-xl sm:text-2xl font-semibold transition-all duration-150 hover:bg-cyan-400 hover:scale-105 hover:drop-shadow-lg"
            onClick={() => {
              document.body.classList.add("closed");
              setTimeout(() => {
                navigate(`/game`);
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
