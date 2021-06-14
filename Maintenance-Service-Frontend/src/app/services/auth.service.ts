import { stringify } from "@angular/compiler/src/util";
import { Injectable } from "@angular/core";
import * as firebase from 'firebase'
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService
 {
    auth = firebase.default.auth();

    user = new BehaviorSubject<string>("");

    constructor() {
        this.authStatusListener();
    }

    private authStatusSub = new BehaviorSubject(this.getCurrentUser());
    currentAuthStatus = this.authStatusSub.asObservable();
    redirectURL: string;


    //auth change listener for the observable
    authStatusListener() {
        this.auth.onAuthStateChanged((credential) => {
            if (credential) {
                this.authStatusSub.next(credential);
            } else {
                this.authStatusSub.next(null);
            }
        })
    }

    getCurrentUser(): firebase.default.User {
        return this.auth.currentUser;
    }

    signIn(email: string, password: string): Promise<any> {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    signOut(): Promise<void>{
        return this.auth.signOut();
    }

    signUp(email: string, password: string): Promise<any>{
        return this.auth.createUserWithEmailAndPassword(email, password);
    }


    public get currentUserValue(): string {
        return this.user.value;
    }
   
    
 }