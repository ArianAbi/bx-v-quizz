export default function Revealed({
  open,
  explanation,
  setOpen,
  next,
  correctAnswer,
  givenAnswer,
  setUserAnswer,
  setTimerUpdater,
  setEndOpen,
}: {
  open: boolean;
  explanation: string;
  setOpen: CallableFunction;
  next: CallableFunction;
  correctAnswer: string;
  givenAnswer: string;
  setUserAnswer: CallableFunction;
  setTimerUpdater: CallableFunction;
  setEndOpen: CallableFunction;
}) {
  return (
    <>
      <div
        className={`fixed top-0 left-0 size-full text-black bg-black  z-[999] flex items-center justify-center transition-all duration-150 ${
          open
            ? "bg-opacity-20 pointer-events-auto backdrop-blur-[2px]"
            : "bg-opacity-0 pointer-events-none backdrop-blur-[0px]"
        }`}
      >
        <div
          className={`bg-white p-4 rounded-xl drop-shadow-lg text-center transition-all duration-150 ${
            open ? "scale-100" : "scale-0"
          }`}
        >
          <div className="w-full flex items-center justify-center mb-4">
            {/* check */}
            {givenAnswer === correctAnswer && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-14 stroke-emerald-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            )}

            {/* X */}
            {givenAnswer !== correctAnswer && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-14 stroke-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            )}
          </div>

          <div
            className="flex flex-col gap-2 items-center justify-center"
            style={{ direction: "ltr" }}
          >
            <span className="bg-emerald-300 font-semibold px-3 py-1 rounded-md">
              Correct Answer :{" "}
              <span style={{ direction: "rtl" }}>{correctAnswer}</span>
            </span>
            <span
              className={`${
                givenAnswer == correctAnswer ? "bg-emerald-300" : "bg-red-300"
              } font-semibold px-3 py-1 rounded-md`}
            >
              You'r Answer :{" "}
              <span style={{ direction: "rtl" }}>{givenAnswer}</span>
            </span>
          </div>

          <p className="mt-4 text-lg" style={{ direction: "rtl" }}>
            {explanation}
          </p>

          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => {
                setOpen(false);
                setEndOpen(true);
              }}
              className="px-4 py-2 mt-4 bg-amber-100 border-2 border-amber-500 rounded-lg disabled:saturate-[0.2] text-amber-900 font-semibold"
            >
              End
            </button>

            <button
              onClick={() => {
                next();
                setOpen(false);
                setUserAnswer("");
                // @ts-ignore
                setTimerUpdater((prev) => prev + 1);
              }}
              className="px-4 py-2 mt-4 bg-emerald-500 rounded-lg disabled:saturate-[0.2] text-white font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
