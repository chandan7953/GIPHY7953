"use client";

import React, { useEffect, useState } from "react";
import GifGrid from "./GifGrid";
import Loader from "./Loader";
import axios from "axios";
import SearchInput from "./SearchInput";

const Home = () => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGifs("trending");
  }, []);

  const fetchGifs = async (query) => {
    setLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          q: query,
          api_key: apiKey,
          limit: 120,
        },
      });

      const data = response.data.data;

      setGifs(data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchInput onSearch={fetchGifs} />
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <GifGrid gifs={gifs} />
        )}
      </div>
    </div>
  );
};

export default Home;
