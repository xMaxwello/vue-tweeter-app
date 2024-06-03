import UserAccount from "../types/userAccount";

export default class MyAccount extends UserAccount {
    firstName: string;
    lastName: string;
    email: string;
    hasTwoFactorEnabled: boolean;
    permissions: string[];


    constructor(_id: number, _fullName: string, _avatarUrl: string, _firstName: string, _lastName: string, _email: string, _hasTwoFactorEnabled: boolean, _permissions: string[]) {
        super(_id, _fullName, _avatarUrl);
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.email = _email;
        this.hasTwoFactorEnabled = _hasTwoFactorEnabled;
        this.permissions = _permissions;
    }
}