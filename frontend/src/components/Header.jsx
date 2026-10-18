import { useState } from "react";
import { Link } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import api from "../utils/api";
import toast from "react-hot-toast";

const Header = ({ components, designId }) => {
  const [loading, setLoading] = useState(false);
  const downloadImage = async () => {
    const getDiv = document.getElementById("main_design");
    const dataUrl = await htmlToImage.toPng(getDiv, {
      style: {
        transform: "scale(1)",
      },
    });

    let link = document.createElement("a");
    link.download = "image";
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveImage = async () => {
    const getDiv = document.getElementById("main_design");
    const image = await htmlToImage.toBlob(getDiv);

    if (image) {
      const obj = {
        design: components,
      };

      const formData = new FormData();
      formData.append("design", JSON.stringify(obj));
      formData.append("image", image);
      try {
        setLoading(true);
        const { data } = await api.put(
          `/update-user-design/${designId}`,
          formData,
        );
        setLoading(false);
        toast.success(data.message);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <header className="h-[60px] border-b border-slate-800 bg-gradient-to-r from-[#050816] via-[#020617] to-[#020617] backdrop-blur">
      <div className="flex items-center justify-between h-full px-4 sm:px-8 lg:px-10 text-slate-200 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-auto flex items-center">
            <img
              className="h-full w-auto"
              src="/logo.svg"
              alt="Artboard logo"
            />
          </div>
          <span className="hidden sm:inline text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
            Editor
          </span>
        </Link>

        <span className="text-sm sm:text-base font-medium text-slate-100">
          Artboard Editor
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={loading}
            onClick={saveImage}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm transition-colors hover:cursor-pointer"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            onClick={downloadImage}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-white bg-fuchsia-500 hover:bg-fuchsia-400 shadow-sm transition-colors hover:cursor-pointer"
          >
            Download
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
