import TaskList from "@/components/Tasks/TaskList";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = (props: any) => {
  return (
    <>
      <Head>
        <title>Event Calendar Web Application</title>
        <meta name="description" content="Event Calendar Web Application" />
        <meta name="keywords" content="Event Calendar Web Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <div className="w-full">
        <TaskList />
      </div>
    </>
  );
};

export default Home;
