"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

interface BookmarkButtonProps {
  property: {
    _id: string;
  };
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ property }) => {
  // Getting session user
  const { data: session } = useSession();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Checking bookmark status
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!session?.user) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await checkBookmarkStatus(property._id);
        if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarkStatus();
  }, [property._id, session?.user]);

  const handleClick = async () => {
    // If they are not logged in they can't bookmark a property
    if (!session?.user) {
      toast.error("You need to be signed in to bookmark a listing");
      return;
    }
    // If they are logged in calling our server action
    try {
      const res = await bookmarkProperty(property._id);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
