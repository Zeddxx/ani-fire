import { useSession } from "next-auth/react";
import BeatLoader from "../shared/loader";

const SignedOut = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "authenticated") return null;

  if (status === "loading") return <BeatLoader />;

  return children;
};

export default SignedOut;
