'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

interface ArticleFormProps {
    urlPostArticle: string;
}

export default function CreateArticlePage({ urlPostArticle }: ArticleFormProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation des champs obligatoires
        if (!title || !content || !author) {
            setError('Tous les champs (titre, contenu, auteur) doivent être remplis.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('author', author);
        if (image) {
            formData.append('picture', image);
        }

        setIsLoading(true);
        const formDataRaw = Object.fromEntries(formData);
        try {
            const response = await fetch(urlPostArticle, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataRaw)
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création de l'article");
            }
            const result = await response.json();
            setSuccess('Article crée avec succès !');
            setError('');

            setTitle('')
            setContent('');
            setAuthor('');
            setImage(null);

            console.log('Nouvel article créé :', result);
            setTimeout(() => {
                router.push('/articles');
            }, 1500);


        } catch (error) {
            setError('Une erreur est survenue lors de la soumission du formulaire.');
            setSuccess('');
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0].name);
        }
    };

    return (
        <>
            <div>
                <h2>Créer un Nouvel Article</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <form id="create-article-form" onSubmit={handleSubmit}>
                    <input type="text" id="title" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <textarea id="content" placeholder="Contenu de l'article" value={content} onChange={(e) => setContent(e.target.value)} required />
                    <label htmlFor="picture" className="file-upload">
                        <span>Choisir une image</span>
                        <input type="file" id="picture" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <input type="text" id="author" placeholder="Auteur (nom d'utilisateur ou ID)" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                    <button type="submit">{isLoading ? 'Création en cours...' : "Créer l'Article"}</button>
                </form>
            </div>
        </>
    )
}


