import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Boxe } from 'src/app/model/interfaces/boxe';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from 'src/app/global-constants';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SushiService {

  httpHeader = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    } 

  constructor(private httpClient: HttpClient) { }

  getBoxes(): Observable<any> {
    return this.httpClient.get<Boxe>(this.getBaseUrl() + "/boxes");
  }

  getBoxeFromId(id: number): Observable<Boxe> {
    return this.httpClient.get<Boxe>(this.getBaseUrl() + "/boxes/" + id);
  }

  getBaseUrl() : string {                                  
    return GlobalConstants.sushiAPI;
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
    } else {
    console.error(
    `Backend returned code ${error.status}, ` +
    `body was: ${error.error}`);
    }
    return throwError(() => 'Something bad happened; please try again later.');
    }
    

}
