"use client";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import axios from "axios";
import { toast } from "react-toastify";
import GifGrid from "../components/GifGrid";
import Loader from "../components/Loader";

const Favorites = () => {
  const [favoriteGifs, setFavoriteGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (userDoc) => {
      if (userDoc.exists()) {
        const favorites = userDoc.data().favorites || [];
        fetchFavoriteGifs(favorites);
      } else {
        setFavoriteGifs([]);
        setLoading(false);
      }
    });

    const fetchFavoriteGifs = async (favoriteIds) => {
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
      try {
        const gifRequests = favoriteIds.map((id) =>
          axios.get(`https://api.giphy.com/v1/gifs/${id}`, {
            params: {
              api_key: API_KEY,
            },
          })
        );

        const gifResponses = await Promise.all(gifRequests);
        const gifs = gifResponses.map((response) => response.data.data);
        setFavoriteGifs(gifs);
      } catch (error) {
        toast.error("Error fetching GIF data: " + error.message);
        console.error("Error fetching GIF data: ", error);
      } finally {
        setLoading(false);
      }
    };

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (!favoriteGifs.length) {
    return (
      <div className="text-center mx-auto px-4 py-8 ">
        No favorite GIFs found!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <GifGrid gifs={favoriteGifs} />
    </div>
  );
};

export default Favorites;
