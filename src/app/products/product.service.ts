import { Injectable } from "@angular/core";
import { IProduct } from "./products.interface";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {_throw} from 'rxjs/observable/throw';


@Injectable()
export class ProductService {
    private _svcUrl = 'api/products/products.json';
    constructor(private _http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this._svcUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An Error Occurred: ${err.error.message}`;
        }
        else{
            errorMessage = `Server returned code: ${err.status}, Error message is: ${err.message} `;
        }

        console.error(errorMessage);
        return _throw(errorMessage);
    }
}