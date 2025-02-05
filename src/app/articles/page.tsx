'use client';

import './articles.css';
import LogOut from '@/components/Deconnect';
import ButtonCreateArticle from '@/components/ButtonCreateArticle';
import Header from '@/components/Header';
import AllArticles from '@/components/AllArticleFunc';
import React from 'react';


// import { Metadata } from "next"


// export const metadata: Metadata = {
//     title: " Articles  "
// }

// FONCTION PAGE PRINCIPAL 
export default function Articles() {
    return (
        <>
            <header>
                <a id='welcome' href='/articles'><Header /></a>
                <LogOut />
            </header>
            <main>
                <a href="/articles/create_article"><ButtonCreateArticle /></a>
                <AllArticles url='http://localhost:8080/articles' />

            </main>
        </>
    )
}