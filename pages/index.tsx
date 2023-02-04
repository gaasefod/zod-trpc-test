import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";

import { TbLoader, TbAlertCircle } from "react-icons/tb";

import Style from "@/styles/Style.module.scss";

import { APISchema } from "@/schema/api";
import type { APIResponse } from "@/schema/api";
import Head from "next/head";

const Home: NextPage = (): JSX.Element => {
  const query = useQuery<APIResponse>(["api"], async () => {
    // Change url to the different /api endpoints
    const response = await fetch("/api/success");
    const data = await response.json();

    if (!APISchema.safeParse(data).success) throw new Error("Invalid Data");

    return data;
  });

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
    return (
      <div className={Style.wrapper}>
        <div className={Style.wrapper__error}>
          <TbAlertCircle />{" "}
        </div>
      </div>
    );
  }

  return (
    <div className={Style.wrapper}>
      <Head>
        <title>Zod</title>
      </Head>
      <div className={Style.wrapper__data}>
        <strong>Zod</strong>
        <pre>{JSON.stringify(query.data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Home;
