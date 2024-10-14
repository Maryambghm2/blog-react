import CreateArticlePage from "@/components/CreateArticleFunc";
import Header from "@/components/Header";
import { Metadata } from "next";
import './create_article.css';
import Link from "next/link";

export const metadata: Metadata = {
    title: " Créer nouvel article "
}



export default function Articles() {
    return (
        <>
            <header>
                <Link  href='http://localhost:3000/articles'><Header /></Link >
            </header>
            <CreateArticlePage urlPostArticle={"http://localhost:8080/articles"} />
        </>

    )
}