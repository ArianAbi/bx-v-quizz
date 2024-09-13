export default function GameEnd({
  score,
  name,
  open,
}: {
  score: number;
  name: string;
  open: boolean;
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
          className={`w-full max-w-[370px] bg-white drop-shadow-xl rounded-2xl mx-5 flex items-center flex-col gap-2 transition-all duration-150 p-4
          ${open ? "scale-100" : "scale-0"}`}
        >
          <h4 className="text-lg font-semibold" style={{ direction: "rtl" }}>
            {name} عزیز
          </h4>
          <h4 className="text-[1.12rem] font-semibold text-red-950 bg-red-300 rounded-2xl px-3 py-2 mb-5">
            شما باختید
          </h4>

          <p className="text-lg">
            <span>
              نمره شما : <span>{score}</span>
            </span>
          </p>
          <p className="text-lg">
            <span>
              نمره مورد نیاز قبولی :{" "}
              <span>{score + Math.floor((Math.random() + 2) * 2)}</span>
            </span>
          </p>

          <button
            onClick={() => {
              location.replace("/");
            }}
            className="bg-emerald-500 px-5 py-3 rounded-xl font-semibold mt-5 text-white"
          >
            Home
          </button>
        </div>
      </div>
    </>
  );
}
