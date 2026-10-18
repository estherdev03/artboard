import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import api, { API_BASE_URL } from "../utils/api";
import toast from "react-hot-toast";

const SigninForm = ({ inputHandler, state, setState }) => {
  const [loading, setLoading] = useState(false);
  const userLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/user-login", state);
      setLoading(false);
      localStorage.setItem("artboard_token", data.token);
      setState({
        email: "",
        password: "",
      });
      window.location.href = "/";
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <form onSubmit={userLogin} className="space-y-5">
      <div className="flex flex-col gap-3 mb-2 text-slate-200 text-sm">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="johndoe@gmail.com"
          onChange={inputHandler}
          value={state.email}
          className="px-3 py-2 rounded-md outline-none border border-slate-700 bg-[#020617] placeholder:text-slate-500 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/60"
        />
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••••"
          onChange={inputHandler}
          value={state.password}
          className="px-3 py-2 rounded-md outline-none border border-slate-700 bg-[#020617] placeholder:text-slate-500 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/60"
        />
      </div>
      <div>
        <button
          disabled={loading}
          className="px-3 py-2 rounded-md bg-indigo-500 w-full outline-none hover:bg-indigo-400 text-white text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer transition-colors"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
      <div className="flex py-4 justify-between items-center px-1 text-[11px] text-slate-500">
        <div className="w-[40%] h-px bg-slate-700/70" />
        <span className="w-[20%] text-center">Or continue with</span>
        <div className="w-[40%] h-px bg-slate-700/70" />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <button
          type="button"
          onClick={() =>
            (window.location.href = `${API_BASE_URL}/auth/google`)
          }
          className="px-3 py-2 flex justify-center items-center gap-2 rounded-md border border-slate-700 bg-[#020617] hover:bg-slate-900 w-full outline-none text-slate-100 transition-colors"
        >
          <FaGoogle className="text-center" />
          <span>Google</span>
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
