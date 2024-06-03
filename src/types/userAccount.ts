export default class UserAccount{
    id: number;
    fullName: string;
    avatarUrl: string;

    constructor(_id: number, _fullName: string, _avatarUrl: string) {
        this.id = _id;
        this.fullName = _fullName;
        this.avatarUrl = _avatarUrl;
    }
}