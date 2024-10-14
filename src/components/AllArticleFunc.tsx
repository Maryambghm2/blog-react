import { useEffect, useState } from "react";
import { AllArticlesProps, Articles } from "./Articles";
import Link from "next/link";

export default function AllArticles({ url }: AllArticlesProps) {
    const [articles, setArticles] = useState<Articles[]>([]);

    useEffect(() => {
        const fetchUserArticles = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Erreur lors du chargement des articles');
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des articles utilisateur :', error);
            }
        };
        fetchUserArticles();

    }, [url]);

    return (
        <main>
            <div id="articles-list">
                {articles.map(article => (
                    <div className="article" key={article.id}>
                        {article.picture && (<img src={`/pic/${article.picture}`} alt={article.title} height={200} />
                        )}
                        <h4><Link href={`/articles/${article.id}`}>{article.title}</Link></h4>
                        <div className="align_infos">
                            <h5>Auteur : <Link href={`/user/${article.id_user}`}> {article.author}</Link></h5>
                            <h5>Date : {article.created_at} </h5>
                            {/* <h5>Date : <FormateDate date={article.created_at} /></h5> */}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}