import dynamic from "next/dynamic";
import Loader from "../../components/Loader";
const Favorites = dynamic(() => import("../../components/Favorites"), {
  loading: () => <Loader />,
});

export default function FavoritesPage() {
  return <Favorites />;
}
