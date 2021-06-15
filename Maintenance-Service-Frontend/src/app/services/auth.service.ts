import { stringify } from "@angular/compiler/src/util";
import { Injectable } from "@angular/core";
import { FirebaseApp } from "@angular/fire";
import * as firebase from 'firebase'
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService
 {
    auth = firebase.default.auth();

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

    deleteUser(): Promise<any> {
        return this.auth.currentUser.delete();
    }

    sendVerificationLink(user: firebase.default.User): Promise<any> {
        return user.sendEmailVerification();
    }

    resetPassword(email: string): Promise<any> {
        return this.auth.sendPasswordResetEmail(email);
    }
    
 }