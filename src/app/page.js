import dynamic from "next/dynamic";
import Loader from "../components/Loader";
const SignUpSignIn = dynamic(() => import("../components/SignUpSignIn"), {
  loading: () => <Loader />,
});

export default function SignUpSignInPage() {
  return <SignUpSignIn />;
}
