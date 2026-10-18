import { useState } from "react";
import { Link } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import api from "../utils/api";
import toast from "react-hot-toast";

// Render at 3x the on-screen size for print-quality exports
const EXPORT_PIXEL_RATIO = 3;

const Header = ({ components, designId }) => {
  const [loading, setLoading] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const downloadImage = async (format) => {
    setShowDownload(false);
    const getDiv = document.getElementById("main_design");
    const options = {
      pixelRatio: EXPORT_PIXEL_RATIO,
      style: {
        transform: "scale(1)",
      },
    };
    // JPEG has no alpha channel, so fill transparent areas with white
    const dataUrl =
      format === "jpeg"
        ? await htmlToImage.toJpeg(getDiv, {
            ...options,
            quality: 0.95,
            backgroundColor: "#ffffff",
          })
        : await htmlToImage.toPng(getDiv, options);

    let link = document.createElement("a");
    link.download = `artboard-design.${format === "jpeg" ? "jpg" : "png"}`;
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

          <div className="relative">
            <button
              onClick={() => setShowDownload(!showDownload)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-white bg-fuchsia-500 hover:bg-fuchsia-400 shadow-sm transition-colors hover:cursor-pointer"
            >
              Download
            </button>
            {showDownload && (
              <div className="absolute right-0 top-[44px] z-50 w-[120px] bg-[#020617]/95 border border-slate-800 rounded-lg shadow-xl p-1 text-sm">
                <button
                  onClick={() => downloadImage("png")}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800/80 transition-colors hover:cursor-pointer"
                >
                  PNG
                </button>
                <button
                  onClick={() => downloadImage("jpeg")}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-800/80 transition-colors hover:cursor-pointer"
                >
                  JPEG
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
