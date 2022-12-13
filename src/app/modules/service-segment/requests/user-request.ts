export class UserRequest {
    username : string;
    email : string;
    password : string;
    confirm_password : string;
    role_name : string;

    setUserRequest(user : UserRequest){
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.confirm_password = user.confirm_password;
        this.role_name = user.role_name;
    }
}

