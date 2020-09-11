export class User {
    public userName: string;
    public email: string;
    public password: string;
    public userId: string;

    constructor(dataUser?: any) {
        this.userName = dataUser ? dataUser.userName : null;
        this.email = dataUser ? dataUser.email : null;
        this.password = dataUser ? dataUser.password : null;
        this.userId = dataUser ? dataUser.userId : null;
    }
}
