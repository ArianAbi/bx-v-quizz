export default function Revealed({
  open,
  explanation,
  setOpen,
  next,
  correctAnswer,
  givenAnswer,
  setUserAnswer,
}: {
  open: boolean;
  explanation: string;
  setOpen: CallableFunction;
  next: CallableFunction;
  correctAnswer: string;
  givenAnswer: string;
  setUserAnswer: CallableFunction;
}) {
  return (
    <>
      <div
        className={`fixed top-0 left-0 size-full bg-black  z-[999] flex items-center justify-center transition-all duration-150 ${
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

          <button
            onClick={() => {
              next();
              setOpen(false);
              setUserAnswer("");
            }}
            className="px-4 py-2 mt-4 bg-emerald-500 rounded-lg disabled:saturate-[0.2] text-white font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
