import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {catchError, finalize, map, switchMap} from "rxjs/operators";
import {environment} from "src/environments/environment";
import {JwtModel} from "../../models/jwt.model";
import {UserAuthModel} from "../../models/user_auth.model";
import {UserResponseModel} from "../../models/user_response.model";
import {LoginRequest} from "../../request/login.request";
import {AuthFakeService} from "./fake/auth-fake.service";

export type UserType = UserAuthModel | undefined;
export type AuthUserType = UserAuthModel | undefined;

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  private authLocalStorageToken = `${environment.USERDATA_KEY}`;

  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }



  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(private router: Router, private authService: AuthFakeService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }
  ngOnInit(): void {

  }

  loginByPhone(phone: string, password: string) {
    this.isLoadingSubject.next(true);
    const request: LoginRequest = new LoginRequest();
    request.phone = phone;
    request.password = password;

    return this.authService.loginByPhone(request).pipe(
      map((auth: JwtModel) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error("err", err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  loginByEmail(phone: string, password: string) {
    this.isLoadingSubject.next(true);
    const request: LoginRequest = new LoginRequest();
    request.phone = phone;
    request.password = password;

    return this.authService.loginByEmail(request).pipe(
      map((auth: JwtModel) => {
        const result = this.setAuthFromLocalStorage(auth);  
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error("err", err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getUserByToken(): Observable<AuthUserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.access_token) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.authService.getUserByToken(auth.access_token).pipe(
      map((response: UserResponseModel) => {
        let user: AuthUserType;
        user = response.data;
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          console.log("logout");
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
    
  }


  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login']);
  }

  private setAuthFromLocalStorage(auth: JwtModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.access_token) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  getAuthFromLocalStorage(): JwtModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      return JSON.parse(lsValue);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  saveToken(tokenData: JwtModel) {
    this.setAuthFromLocalStorage(tokenData);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  // RESET PASSWORD 

  sendTelephone(data : {}){
    return this.authService.verifyTel(data);
  }

  sendCode(data : {}){
    return this.authService.verifyCode(data);
  }
  
  sendCodevalidation(data : {}){
    return this.authService.verifierCode(data);
  }

  resetPassword(data:{})
  {
    return this.authService.resetPassword(data);
  }
}
