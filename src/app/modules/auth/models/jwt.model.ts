export class JwtModel {
    access_token: string;
    refresh_token:string;
    token_type: string;
    expiration_time: Date;
  
    setAuth(auth: JwtModel) {
      this.access_token = auth.access_token;
      this.refresh_token = auth.refresh_token
      this.token_type = auth.token_type;
      this.expiration_time = auth.expiration_time;
    }
  }
  