import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import SignupForm from "../components/SignupForm";
import SigninForm from "../components/SigninForm";
import toast from "react-hot-toast";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast.error(decodeURIComponent(error));
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#050816] via-[#020617] to-[#020617] text-slate-100 flex flex-col">
      {/* Auth modal */}
      <div
        className={`fixed inset-0 flex justify-center items-center transition-all ${show ? "visible opacity-100" : "invisible opacity-0"} bg-black/50 backdrop-blur-sm`}
      >
        <div className="w-full max-w-md bg-[#020617]/95 border border-slate-800 shadow-2xl rounded-2xl px-6 py-6 relative">
          <div
            onClick={() => {
              setShow(false);
            }}
            className="absolute right-4 top-4 text-xl cursor-pointer text-slate-400 hover:text-slate-200"
          >
            <IoClose />
          </div>
          {type === "sign in" ? (
            <>
              <h2 className="mb-4 text-slate-100 text-xl font-semibold text-center">
                Sign in
              </h2>
              <SigninForm
                inputHandler={inputHandler}
                state={state}
                setState={setState}
              />
            </>
          ) : (
            <>
              <h2 className="mb-4 text-slate-100 text-xl font-semibold text-center">
                Sign up
              </h2>
              <SignupForm
                inputHandler={inputHandler}
                state={state}
                setState={setState}
              />
            </>
          )}
        </div>
      </div>
      {/* Top nav */}
      <div className="h-[64px] border-b border-slate-800 bg-gradient-to-r from-[#050816] via-[#020617] to-[#020617]">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-auto flex items-center">
              <img
                className="h-full w-auto"
                src="/logo.svg"
                alt="Artboard logo"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setType("sign in");
                setShow(true);
              }}
              className="px-4 py-2 text-xs sm:text-sm rounded-full border border-slate-700 text-slate-200 hover:border-indigo-500 hover:text-white transition-colors hover:cursor-pointer"
            >
              Sign in
            </button>
            <button
              onClick={() => {
                setType("sign up");
                setShow(true);
              }}
              className="px-4 py-2 text-xs sm:text-sm rounded-full border border-slate-700 text-slate-200 hover:border-indigo-500 hover:text-white transition-colors hover:cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 w-full flex justify-center items-center px-4">
        <div className="max-w-3xl text-center py-20 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-50">
            What will you design today?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400">
            Create, edit, and share beautiful designs in a fast, focused canvas
            experience.
          </p>
          <button
            onClick={() => {
              setType("sign up");
              setShow(true);
            }}
            className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-400 text-sm sm:text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors"
          >
            Get started for free
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
