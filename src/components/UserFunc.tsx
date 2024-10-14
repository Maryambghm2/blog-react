import { useEffect, useState } from 'react';
import { Articles } from './Articles';
import { UserPageProps, Users } from './Users';
import Header from './Header';
import LogOut from './Deconnect';
import Link from 'next/link';
import React from 'react';


export default function UserPage({ urlUser, urlArticle }: UserPageProps) {
    const [userArticles, setUserArticles] = useState<Articles[]>([]);
    const [user, setUser] = useState<Users | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAndArticles = async () => {
            try {


                // FETCH USER 
                const userResponse = await fetch(`${urlUser}`);

                const foundUser = await userResponse.json();
                setUser(foundUser);

                // FETCH ARTICLE 
                const articlesResponse = await fetch(`${urlArticle}`);
                const articlesData = await articlesResponse.json();
                setUserArticles(articlesData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur et articles :', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserAndArticles();
    }, [urlUser, urlArticle]);

    if (loading) {
        return <p>Chargement...</p>;
    }
    if (!user) {
        return <p>Utilisateur introuvable</p>;
    }

    return (
        <>
            <header>
                <Link href='/articles'><Header /></Link >
                <LogOut />
            </header>
            <div className='list'>
                <div id="user-info">
                    <h2>{user.username}</h2>
                    <p>Email : {user.mail}</p>
                </div>
                <h4>Articles:</h4>

                <div id="articles-list">
                    <ul>{userArticles.map(article => (
                        <li className='article'>
                            {article.picture && <img src={`/pic/${article.picture}`} alt={article.title} height={200} />}
                            <h4><a href={`/articles/${article.id}`}>{article.title}</a></h4>
                            <div className="align_infos">
                                <h5>Auteur :<a href={`/user/${article.author}`}>{user.username}</a></h5>
                                <h5>Date : {article.created_at}</h5>
                            </div>
                        </li>
                    ))}

                    </ul>

                </div>
            </div>
        </>

    );
}
