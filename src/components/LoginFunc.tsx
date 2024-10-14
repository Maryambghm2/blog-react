'use client'

import { useState } from "react";
import React from "react";


// Composant de formulaire de connexion
export function LoginForm({ onSubmit }: { onSubmit: (mail: string, password: string) => void }) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = (event.target as HTMLFormElement).email.value;
        const password = (event.target as HTMLFormElement).password.value;
        onSubmit(email, password);
    };

    return (
        <form id="login-form" className="register" onSubmit={handleSubmit}>
            <div className="login">
                <input type="email" name="email" placeholder="Adresse e-mail" required />
                <input type="password" name="password" placeholder="Mot de passe" required />
            </div>
            <button type="submit" id="btn-submit">Se connecter</button>
        </form>
    );

}


// LIEN VERS INSCRIPTION 
export function LinkRegister() {
    return (
        <div>
            <p>Pas encore inscrit ? <a href="/register">Inscrivez-vous</a></p>
        </div>
    );
}

export default function LoginFunc() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async (mail: string, password: string) => {
        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mail, password }),
            });

            if (response.ok) {
                alert('Connexion réussie !');
                window.location.href = '/articles';
            } else {
                const errorText = await response.text();
                setErrorMessage(`Erreur: ${errorText}`);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
            setErrorMessage('Erreur lors de la connexion');
        }
    };

    return (
        <>
            <h2>Welcome to MB's Blog</h2>
            <div className="register-box">
                <h3>Se connecter</h3>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <LoginForm onSubmit={handleLogin} />
                <LinkRegister />
            </div>
        </>
    );
}