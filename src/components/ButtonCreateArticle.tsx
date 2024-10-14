// BOUTON CREATION ARTICLE 
export default function ButtonCreateArticle() {
    return (
        <div className="create-post">
            <button id="create-post-btn" onClick={() => (window.location.href = '/create_article')}>Créer un article</button>
        </div>

    );
}