export interface UserAccount {
    userId: number,
    fullName: string,
    email: string,
    password: string,
    role: any
}

export interface IToken{
    token: string;
}

export enum Roles {
    Admin = 0,
    Editor = 1,
    Viewer = 2
}

