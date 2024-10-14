// DECONNEXION 
export default function LogOut() {
        const handleLogout = () => {
            try {
                localStorage.removeItem('userData');
                alert('Déconnexion réussie');
                window.location.href = '/login';
            } catch (error) {
                console.error('Erreur lors de la déconnexion', error);
                alert('Erreur lors de la déconnexion');
            }
        };

        return (
            <div className="disconnect">
                <button id="logout-btn" onClick={handleLogout}>Déconnexion</button>
            </div>
        );
}
