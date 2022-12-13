export class LoginRequest {
    phone: String;
    password: String;

    setLoginRequest(request: LoginRequest) {
        this.phone = request.phone;
        this.password = request.password;
    }
}