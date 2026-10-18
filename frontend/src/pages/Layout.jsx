import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaFolderOpen } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import api from "../utils/api";
import toast from "react-hot-toast";

const Layout = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await api.get("/user");
        setUser(data.user);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getUser();
  }, []);

  const createDesign = (e) => {
    e.preventDefault();
    navigate("/design/create", {
      state: {
        type: "create",
        width: 500,
        height: 400,
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("artboard_token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#050816] via-[#020617] to-[#020617] text-slate-100">
      {/* Header */}
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
            <span className="hidden sm:inline text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
              Dashboard
            </span>
          </div>
          <div className="flex gap-3 items-center relative">
            <button
              onClick={createDesign}
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 shadow-sm transition-colors"
            >
              Create a design
            </button>
            <button
              onClick={createDesign}
              className="sm:hidden inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-400 shadow-sm transition-colors"
            >
              New
            </button>
            <div
              onClick={() => {
                setShow(!show);
              }}
              className="cursor-pointer"
            >
              <img
                className="w-[40px] h-[40px] rounded-full border border-slate-700 object-cover"
                src={user?.image || "https://res.cloudinary.com/devllaqhm/image/upload/v1772358750/istockphoto-2151669184-612x612_bjkchv.jpg"}
                alt="avatar"
                referrerPolicy="no-referrer"
              />
            </div>
            <div
              className={`absolute top-[54px] right-0 w-[260px] bg-[#020617]/95 border border-slate-800 rounded-xl shadow-xl p-3 transition duration-200 z-100 ${
                show
                  ? "visible opacity-100 translate-y-0"
                  : "invisible opacity-0 -translate-y-1"
              }`}
            >
              <div className="px-2 py-2 flex justify-start gap-3 items-center">
                <img
                  className="w-[40px] h-[40px] rounded-full border border-slate-700 object-cover"
                  src={user?.image || "https://res.cloudinary.com/devllaqhm/image/upload/v1772358750/istockphoto-2151669184-612x612_bjkchv.jpg"}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col items-start">
                  <span className="text-slate-100 font-semibold text-sm">
                    {user.name}
                  </span>
                  <span className="text-slate-400 text-xs truncate max-w-[150px]">
                    {user.email}
                  </span>
                </div>
              </div>
              <ul className="mt-2 text-slate-200 text-sm">
                <li>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800/80 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full grow max-w-6xl mx-auto grid grid-cols-[1fr_3fr] md:grid-cols-[240px_1fr]">
        <div className="sidebar p-4 md:p-5 bg-[#020617]/90 border-r border-slate-800">
          <div className="flex flex-col items-center gap-3 mb-6 md:flex-row">
            <img
              className="w-[44px] h-[44px] rounded-full border border-slate-700 object-cover"
              src={user?.image || "https://res.cloudinary.com/devllaqhm/image/upload/v1772358750/istockphoto-2151669184-612x612_bjkchv.jpg"}
              alt="avatar"
              referrerPolicy="no-referrer"
            />
            <div className="flex justify-center items-center text-center flex-col md:items-start md:text-left text-slate-100">
              <span className="font-semibold text-sm md:text-base">
                {user.name}
              </span>
              <span className="mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Free plan
              </span>
            </div>
          </div>
          <ul className="flex flex-col gap-2 pt-1 text-sm">
            <li>
              <Link
                to="/"
                className={`px-3 py-2 rounded-md flex items-center gap-2 ${
                  pathname === "/"
                    ? "bg-slate-800 text-slate-50"
                    : "text-slate-300 hover:bg-slate-900/70"
                } transition-colors`}
              >
                <span>
                  <IoMdHome size={18} />
                </span>
                <span className="font-medium">Home</span>
              </Link>
            </li>

            <li>
              <Link
                to="/projects"
                className={`px-3 py-2 rounded-md flex items-center gap-2 ${
                  pathname === "/projects"
                    ? "bg-slate-800 text-slate-50"
                    : "text-slate-300 hover:bg-slate-900/70"
                } transition-colors`}
              >
                <span>
                  <FaFolderOpen size={17} />
                </span>
                <span className="font-medium">Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="/templates"
                className={`px-3 py-2 rounded-md flex items-center gap-2 ${
                  pathname === "/templates"
                    ? "bg-slate-800 text-slate-50"
                    : "text-slate-300 hover:bg-slate-900/70"
                } transition-colors`}
              >
                <span>
                  <HiTemplate size={18} />
                </span>
                <span className="font-medium">Templates</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="min-w-0">
          <div className="py-4 pr-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
