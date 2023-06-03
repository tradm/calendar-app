import Calendar from "@/components/calendar/CalendarHeader";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Calendar - Event Calendar Web Application</title>
        <meta name="description" content="Event Calendar Web Application" />
        <meta name="keywords" content="Event Calendar Web Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <div className="w-full bg-white">
        <Calendar />
      </div>
    </>
  );
};

export default Home;
