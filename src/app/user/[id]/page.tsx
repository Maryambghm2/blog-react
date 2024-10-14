'use client'

// import { Metadata } from "next";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserPage from "@/components/UserFunc";
import { useParams } from "next/navigation";
import './user.css'


// export const metadata: Metadata = {
//     title: " User "
// }

export default function displayArticles() {

    const id = useParams().id as string;
    
return (
    <UserPage  urlUser={`http://localhost:8080/users/${id}`} urlArticle={`http://localhost:8080/articles/users/${id}`}/>
)
    };


{/* // `http://localhost:8080/articles/users/${id}` */ }
