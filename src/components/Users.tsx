
export interface Users {
    id_user: number;
    username: string;
    mail: string;
    password: string;

}

export interface AllUsersProps {
    url: string
}


export interface UserPageProps {
    // params: { id: string };
    urlUser: string;
    urlArticle: string;
}