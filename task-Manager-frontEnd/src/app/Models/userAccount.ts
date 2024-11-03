export interface UserAccount {
    userId: number,
    fullName: string,
    email: string,
    password: string,
    role: any
}

export enum Roles {
    Admin = 0,
    Editor = 1,
    Viewer = 2
}

