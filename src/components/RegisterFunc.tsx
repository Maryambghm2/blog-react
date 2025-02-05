'use client'
import React, { useEffect, useState } from "react";
import { Users } from "./Users";

// REGEX 
const mailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;

// FONCTION FORMULAIRE INSCRIPTION
function RegisterForm({ onSubmit, onPasswordChange, passwordStatus }: {
    onSubmit: (username: string, email: string, password: string) => void,
    onPasswordChange: (password: string) => void,
    passwordStatus: string[]
}) {

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const username = (event.target as HTMLFormElement).username.value;
        const mail = (event.target as HTMLFormElement).email.value;
        const password = (event.target as HTMLFormElement).password.value;

        onSubmit(username, mail, password);

    };

    const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onPasswordChange(event.target.value)
    };

    return (
        <form id="register-form" className="register" onSubmit={handleSubmit}>

            <div className="register">
                <input type="text" id="username" placeholder="Nom d'utilisateur" required />
                <input type="email" id="email" placeholder="Adresse e-mail" required />
                <input type="password" id="password" placeholder="Mot de passe" required onChange={handlePasswordInput} />
            </div>
            <ul>
                {passwordStatus.map((status, index) => (
                    <li key={index} style={{ color: status.includes("✓") ? "green" : "red" }}>{status}</li>
                ))}
            </ul>
            <button type="submit" id="btn-submit">Se connecter</button>
        </form>
    );
}


// LIEN VERS INSCRIPTION 
function LinkLogin() {
    return (
        <div>
            <p>Déjà inscrit ? <a href="http://localhost:3000">Connectez-vous</a></p>
        </div>
    );
}

export default function VerifRegister() {

    const [users, setUsers] = useState<Users[]>([])
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSucessMessage] = useState<string | null>(null);
    const [passwordStatus, setPasswordStatus] = useState<string[]>([
        "Au moins 8 caractères",
        "Une majuscule",
        "Une minuscule",
        "Un chiffre",
        "Un caractère spécial (#?!@$ %^&*-)"
    ]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8080/users");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des utilisateurs");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);


    const handlePasswordChange = (password: string) => {
        const newStatus = [
            password.length >= 8 ? "Au moins 8 caractères ✓" : "Au moins 8 caractères",
            /[A-Z]/.test(password) ? "Une majuscule ✓" : "Une majuscule",
            /[a-z]/.test(password) ? "Une minuscule ✓" : "Une minuscule",
            /\d/.test(password) ? "Un chiffre ✓" : "Un chiffre",
            /[#?!@$ %^&*-]/.test(password) ? "Un caractère spécial (#?!@$ %^&*-) ✓" : "Un caractère spécial (#?!@$ %^&*-)"
        ];
        setPasswordStatus(newStatus);

    };

    const handleRegister = async (username: string, mail: string, password: string) => {

        // CHAMPS VIDE 
        if (!username || !mail || !password) {
            setErrorMessage("Tout les champs sont obligatoires.");
            setSucessMessage(null);

            // VERIF REGEX 
        } else if (mail.length > 255) {
            setErrorMessage("L'email est trop long (maximum 255 caractères).");
            setSucessMessage(null);

            // VERIF MAIL 
        } else if (!mailRegex.test(mail)) {
            setErrorMessage("Adresse e-mail invalide.");
            setSucessMessage(null);
            return;

        }
        // CHAMPS DEJA EXISTANT 
        const mailExists = users.some(user => user.mail === mail);
        const usernameExists = users.some(user => user.username === username);

        if (mailExists || usernameExists) {
            setErrorMessage("Cet utilisateur existe déjà.");
            setSucessMessage(null);
            return;
        }
        if (username.length < 3 || username.length > 25) {
            setErrorMessage("Le nom d'utilisateur doit contenir entre 3 et 25 caractères.");
            setSucessMessage(null);
            return;
        }
        // const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        // AJOUT NOUVEL USER 
        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, mail, password }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'inscription");
            }

            setSucessMessage("Inscription réussie ! Vous serez redirigé dans un instant...")
            setErrorMessage(null);
            setTimeout(() => {
                window.location.href = 'http://localhost:3000';

            }, 2000);
        } catch (error) {
            setErrorMessage("Erreur lors de l'inscription");
            console.error(error);
        }
    };

    return (
        <>
            <header>
                <h3>S'inscrire</h3>
            </header>
            <div className="register-box">
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <RegisterForm onSubmit={handleRegister} onPasswordChange={handlePasswordChange} passwordStatus={passwordStatus} />
                <LinkLogin />
            </div>
        </>
    )
}
