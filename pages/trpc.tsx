import type { NextPage } from "next";

import { TbLoader, TbAlertCircle } from "react-icons/tb";

import Style from "@/styles/Home.module.scss";

import { trpc } from "@/utils/trpc";
import Head from "next/head";

const Home: NextPage = (): JSX.Element => {
  const query = trpc.pokedex.useQuery({ name: "national" });

  if (query.isLoading) {
    return (
      <div className={Style.wrapper}>
        <div className={Style.wrapper__loader}>
          <TbLoader />
        </div>
      </div>
    );
  }

  if (query.isError) {
    console.log(query.error);

    return (
      <div className={Style.wrapper}>
        <div className={Style.wrapper__error}>
          <TbAlertCircle /> {query.error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={Style.wrapper}>
      <Head>
        <title>tRPC</title>
      </Head>
      <div className={Style.wrapper__data}>
        <strong>tRPC</strong>
        <pre>{JSON.stringify(query.data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Home;
