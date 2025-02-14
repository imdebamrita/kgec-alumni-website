import Layout from "@/components/layout";
// import { useSession, signIn } from "next-auth/react";
import AlumniBase from "./AlumniBase";
import AlumniBaseInfo from "./AlumniBaseInfo";
import {Alumni, UserType} from "@/types/types";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const res = await fetch(
    "https://kgec-alumni-backend.onrender.com/users/alumni"
  );
  const alumniList = await res.json();
  return {
    props: {
      alumniList,
    },
  };
}

interface Props {
  alumniList: Alumni[];
}
// const [signedInUser, setSignedInUser] = useState<string>(
//   (typeof window !== "undefined" &&
//   window.localStorage.getItem("signed-in-user")
//     ? window.localStorage.getItem("signed-in-user")
//     : "") as string
// );

function AlumiBase({ alumniList }: Props) {
  // const { data: session } = useSession();
  // const session = 0
  
  const [signedInUser, setSignedInUser] = useState<UserType>({} as UserType);

  useEffect(() => {
    if (typeof window !== "undefined")
      if (window.localStorage.getItem("signed-in-user") !== "")
        setSignedInUser(
          JSON.parse(window.localStorage.getItem("signed-in-user") as string)
        );
  }, []);

  useEffect(() => {
    console.log(signedInUser);
  }, [signedInUser]);

  if (!signedInUser?.id)
    return (
      <Layout>
        
        <AlumniBaseInfo />
      </Layout>
    );
  else 
    return (
      <Layout>
        <AlumniBase alumniList={alumniList ? alumniList : ([] as Alumni[])} />
      </Layout>
    );
}

export default AlumiBase;
