export default class UserAccount{
    id: number;
    full_name: string;
    avatar_url: string;

    constructor(_id: number, _fullName: string, _avatarUrl: string) {
        this.id = _id;
        this.full_name = _fullName;
        this.avatar_url = _avatarUrl;
    }
}