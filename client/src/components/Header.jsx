import React, { useRef, useCallback } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef(null);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const value = inputRef.current?.value.trim();
      if (value) setInput(value);
    },
    [setInput],
  );

  const onClear = useCallback(() => {
    setInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [setInput]);

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      {/* Background Gradient */}
      <img
        src={assets.gradientBackground}
        alt=""
        aria-hidden="true"
        className="absolute -top-50 -z-1 opacity-50 pointer-events-none w-full"
      />

      <div className="text-center mt-4 sm:mt-6 mb-4">
        {/* AI Badge with Professional Sparkle Animation */}
        <div className="inline-flex items-center justify-center gap-2 px-5 py-1.5 mb-6 border border-primary/40 bg-primary/10 rounded-full text-sm font-medium text-primary shadow-sm">
          <span>New: AI Feature Integrated</span>
          <motion.img
            src={assets.star_icon}
            alt=""
            aria-hidden="true"
            className="w-4 h-4"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 15, 0, -15, 0],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <h1 className="text-3xl sm:text-6xl font-bold leading-tight sm:leading-[1.15] text-gray-800 tracking-tight">
          Your own <span className="text-primary">blogging</span>{" "}
          <br className="hidden sm:block" />
          platform.
        </h1>

        <p className="my-5 sm:my-7 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>

        {/* Search Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex w-full max-w-lg mx-auto border border-gray-300 bg-white rounded-xl overflow-hidden shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
          role="search"
        >
          <label htmlFor="blog-search" className="sr-only">
            Search for blogs
          </label>
          <input
            id="blog-search"
            ref={inputRef}
            type="search"
            placeholder="Search for blogs..."
            required
            className="w-full px-4 py-3 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 m-1.5 rounded-lg hover:bg-primary/90 active:scale-95 transition-all cursor-pointer font-medium whitespace-nowrap"
          >
            Search
          </button>
        </form>
      </div>

      {/* Clear Button */}
      {input && (
        <div className="text-center mt-4">
          <button
            onClick={onClear}
            className="border border-gray-300 font-light text-xs py-1.5 px-4 rounded-md shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
