'use client'

import { useEffect, useState } from "react";
import { Articles, SpecificArticlesProps } from "./Articles";
import LogOut from "./Deconnect";
import Header from "./Header";
import React from "react";



export default function SpecificArticles({ url, userId }: SpecificArticlesProps) {
    const [article, setArticle] = useState<Articles>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Erreur lors du chargement des articles');
                const data = await response.json();

                //   SI ID PRESENT FILTRER PAR USER ID 
                const filteredArticles = userId ? data.filter((article: Articles) => article.id_user === userId) : data;

                if (filteredArticles.length > 0) {
                    setArticle(filteredArticles[0]);
                } else {
                    setArticle(filteredArticles);
                }
            }
            catch (error) {
                console.error('Erreur lors de la récupération des articles :', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [url, userId]);
    return (
        <>
            <header>
                <a href='/articles'><Header /></a>
                <LogOut />
            </header>
            <div className="article-info">
                {loading ? (
                    <p>Chargement ...</p>
                ) : (
                    article ? ( // Afficher l'article s'il existe
                        <div className="article" key={article.id}>
                            {article.picture && <img src={`/pic/${article.picture}`} alt={article.title} height={200} />}
                            <h4>{article.title}</h4>
                            <div className="align_infos">
                                <h5>Auteur :<a href={`/user/${article.author_id}`}>{article.author}</a></h5>
                                <h5>Date : {article.created_at}</h5>
                            </div>
                            <p>{article.content}</p>
                        </div>
                    ) : (
                        <p>Aucun article trouvé pour cet utilisateur.</p> // Message lorsque aucun article n'est trouvé
                    )
                )}

            </div>
        </>
    );
}