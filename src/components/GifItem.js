import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import { auth, db } from "../../firebase"; // Import your Firebase setup
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore"; // Import Firestore functions
import { toast } from "react-toastify";
import Image from "next/image"; // Import Next.js Image component

const GifItem = ({ gif }) => {
  const { images, title, id } = gif;
  const downloadUrl = images.original.url;
  const sizeInMB = (images.original.size / (1024 * 1024)).toFixed(2);
  const user = auth.currentUser; // Get the currently authenticated user

  // State to manage if the GIF is favorited
  const [isFavorited, setIsFavorited] = useState(false);

  // Fetch the user's favorites when the component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const favorites = userDoc.data().favorites || [];
          setIsFavorited(favorites.includes(id));
        }
      } catch (error) {
        toast.error("Error fetching favorites: " + error.message);
        console.error("Error fetching favorites: ", error);
      }
    };

    fetchFavorites();
  }, [user, id]);

  const handleFavoriteClick = async () => {
    if (!user) {
      toast.error("Please sign in to favorite GIFs!");
      return;
    }

    const userRef = doc(db, "users", user.uid);

    try {
      if (isFavorited) {
        // If the GIF is already favorited, remove it from the favorites
        await updateDoc(userRef, {
          favorites: arrayRemove(id),
        });
        toast.success("Removed from favorites");
      } else {
        // If the GIF is not favorited, add it to the favorites
        await updateDoc(userRef, {
          favorites: arrayUnion(id),
        });
        toast.success("Added to favorites");
      }
      setIsFavorited(!isFavorited); // Toggle the favorited state
    } catch (error) {
      toast.error("Error updating favorites: " + error.message);
      console.error("Error updating favorites: ", error);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full h-64">
        <img
          src={images.original.url}
          alt={title}
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="p-2 flex flex-wrap items-center justify-between">
        <div>
          <button
            className={`transition-colors duration-300 ${
              isFavorited
                ? "text-red-500 hover:text-red-600"
                : "text-gray-500 hover:text-gray-600"
            }`}
            onClick={handleFavoriteClick}
          >
            <MdFavorite size={24} />
          </button>
        </div>

        <a
          href={downloadUrl}
          download
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Download - <span className="text-sm">{sizeInMB} MB</span>
        </a>
      </div>
    </div>
  );
};

export default GifItem;
