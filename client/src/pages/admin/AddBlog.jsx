import { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { blogCategories } from "../../assets/constants";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();

  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [category, setCategory] = useState(blogCategories[1]);
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");
    if (category === "All")
      return toast.error("Please select a specific category for AI generation");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
        category: category,
      });

      if (data.success) {
        // Convert Markdown to HTML before setting it in Quill
        if (quillRef.current) {
          quillRef.current.root.innerHTML = parse(data.content);
        }
        toast.success("Content generated successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to generate content",
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) return toast.error("Please upload an image");
    if (category === "All")
      return toast.error("Please select a valid category");
    if (!quillRef.current.root.innerHTML.trim())
      return toast.error("Description cannot be empty");

    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitle: subtitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setTitle("");
        setSubTitle("");
        if (quillRef.current) quillRef.current.root.innerHTML = "";
        setCategory(blogCategories[1]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    // Initialize Quill only once
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["image", "code-block"],
          ],
        },
      });
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl py-4 md:p-10 sm:m-10 shadow rounded">
        <p className="text-blue-600 font-medium">Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="Upload Area"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            accept="image/*"
          />
        </label>

        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-400 outline-none rounded text-blue-700"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          placeholder="Type here"
          className="w-full max-w-lg mt-2 p-2 border border-gray-400 outline-none rounded text-blue-700"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subtitle}
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          {loading && (
            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2 z-10">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}

          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-emerald-700 px-4 py-1.5 rounded hover:bg-emerald-800 transition cursor-pointer"
          >
            Generate With AI
          </button>
        </div>

        <p className="mt-4 text-blue-700">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          value={category}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          {blogCategories
            .filter((cat) => cat !== "All")
            .map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm hover:bg-primary/90 transition"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
