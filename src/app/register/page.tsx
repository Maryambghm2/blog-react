
import { Metadata } from "next";
import './register.css';
import VerifRegister from "@/components/RegisterFunc";
// import { Users } from "@/components/Users";

// TITRE 
const metadata: Metadata = {
    title: " Register "
}


// PAGE PRINCIPALE 
export default function Register() {
    return (
    <VerifRegister />

    )
}