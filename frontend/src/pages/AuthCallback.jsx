import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      toast.error(error || "Authentication failed");
      navigate("/", { replace: true });
      return;
    }

    if (token) {
      localStorage.setItem("artboard_token", token);
      toast.success("Signed in successfully");
      window.location.href = "/";
    } else {
      navigate("/", { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#050816] via-[#020617] to-[#020617] flex items-center justify-center">
      <div className="text-slate-400">Completing sign in...</div>
    </div>
  );
};

export default AuthCallback;
