'use client'
// import { Article, articles } from '@/components/Articles';

import SpecificArticles from "@/components/ArticleSpecFunc";
import './id_spe.css'
import { useParams } from "next/navigation";

export default function displayArticles(){
    const id = useParams().id as string;
    return (
    <div>
       <SpecificArticles url={`http://localhost:8080/articles/${id}`} />

    </div>
    );
}