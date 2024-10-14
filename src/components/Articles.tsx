import { useEffect, useState } from "react";

export interface Articles {
    id: number;
    title: string;
    content: string;
    created_at: string;
    picture: string;
    id_user: number;
    author: string;
    author_id: number;

}

export interface AllArticlesProps {
    url: string;
}


export interface SpecificArticlesProps {
    url: string;
    userId?: number;
}