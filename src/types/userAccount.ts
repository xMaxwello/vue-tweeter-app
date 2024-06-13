export default class UserAccount{
    id: number;
    full_name: string;
    avatar_url: string;
    is_following: boolean;

    constructor(_id: number, _fullName: string, _avatarUrl: string, _isFollowing: boolean) {
        this.id = _id;
        this.full_name = _fullName;
        this.avatar_url = _avatarUrl;
        this.is_following = _isFollowing;
    }
}