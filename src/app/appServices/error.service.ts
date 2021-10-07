import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {


   handleError(err: HttpErrorResponse) {
    if(!err.error || !err.error.error) {
      return throwError('UNKNOWN');
    } else {
      return throwError(this.errorMsgs[err.error.error.message])
    }
   }

  errorMsgs = {
    UNKNOWN: 'An unknown error is occured!',
    EMAIL_EXISTS: 'This email already exist. Please try with another email',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'we have blocked all requests from this device',
    EMAIL_NOT_FOUND: 'There is no Email remail registered with this email address!',
    INVALID_PASSWORD: 'The password is invalid',
    USER_DISABLED: 'The user account has been disabled by an administrator'
  }

  constructor() { }
}
