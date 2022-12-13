import { ProfileModel } from 'src/app/models/profil.model';
export class User {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    referralCode?: string;
    profile?: ProfileModel;
    role_name: string;
    phone: string;

    setUser(user: User) {
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.phone = user.phone;
        this.profile = user.profile;
        this.confirm_password = user.confirm_password;
        this.referralCode = user.referralCode;
        this.role_name = user.role_name;
    }
}