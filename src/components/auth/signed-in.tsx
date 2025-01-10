import { useSession } from "next-auth/react";
import BeatLoader from "../shared/loader";

const SignedIn = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "unauthenticated") return null;

  if (status === "loading") return <BeatLoader />;

  return children;
};

export default SignedIn;
