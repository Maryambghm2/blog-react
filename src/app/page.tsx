import { Metadata } from "next";
import { Login } from "./login/page";
import React from "react";


// TITRE 
 const metadata: Metadata = {
  title: "Login - MB's Blog"
}

export default function Home() {
  
  return (
    <>
      {/* <p>{metadata.title as string}</p> */}
      <Login />

    </>
  );
}
