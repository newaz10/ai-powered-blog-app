import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <nav className="flex justify-between items-center py-3 sm:py-4 px-8 sm:px-20 xl:px-32 w-full">
      {/* Logo as proper anchor tag for accessibility & SEO */}
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
        aria-label="Quickblog Home"
        className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
      >
        <img
          src={assets.logo}
          alt="Quickblog Logo"
          className="w-32 sm:w-44 h-auto object-contain"
          loading="eager"
        />
      </a>

      {/* Navigation Button - kept as button since it toggles based on auth state */}
      <button
        onClick={() => navigate(token ? "/admin" : "/login")}
        className="flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-primary text-white px-8 py-2.5 hover:bg-primary/90 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        aria-label={token ? "Go to Dashboard" : "Go to Login Page"}
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} alt="" aria-hidden="true" className="w-3 h-3" />
      </button>
    </nav>
  );
};

export default Navbar;
