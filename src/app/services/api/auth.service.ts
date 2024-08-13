import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from '@angular/router';
import {GenericApiService} from './generic-api.service';
import {UserDto} from 'src/types/authentication/UserDto';
import {LoginDto} from 'src/types/api/authentication/LoginDto';
import {LoginResponseDto} from 'src/types/api/authentication/LoginResponseDto';
import {MemberApiService} from './member-api.service';
import {UserApiService} from './users-api.service';
import {catchError, map, Observable, Subscription, of, tap} from "rxjs";


@Injectable({
    providedIn: 'root'
})


export class AuthService extends GenericApiService {
    protected override endPoint = this.apiURL + "/authenticate";

    private isAuthenticated: boolean = false;
    private user: UserDto | null = null;


    constructor(http: HttpClient, private router: Router, private userService: UserApiService) {
        super(http)
    }

    public setToken(token: string): Observable<UserDto> {
        localStorage.setItem('token', token)
        return this.loadUserFromToken(token);
    }

    public get userIsAuthenticated(): boolean {
        return this.isAuthenticated;
    }

    public logoutUser(): void {
        localStorage.removeItem('token');
        this.isAuthenticated = false;
        this.user = null;
    }

    public loadUserFromToken(token: string): Observable<UserDto> {
        return this.loginFromToken(token).pipe(
            tap((user) => {
                console.log(user);
                this.user = user as UserDto;
                this.isAuthenticated = true;
                return user;
            }))
    }


    public loginFromToken(token: string): Observable<UserDto> {
        return this.http.post<UserDto>(this.endPoint + '/from-bearer', {token: token})
    }

    public login(user: LoginDto): Observable<LoginResponseDto> {
        return this.http.post<LoginResponseDto>(this.endPoint + "/login", user)
    }

    public isLoggin(access: boolean, isAuthhenticate: number) {
        if (access == false && isAuthhenticate == 1) {
            return true;
        }

        return access;
    }


    setUser(user: UserDto) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

}
