import dynamic from "next/dynamic";
import Loader from "../../components/Loader";

const Home = dynamic(() => import("../../components/Home"), {
  loading: () => <Loader />,
});

export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  );
}
