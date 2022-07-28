import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl : string = `http://localhost:5000`; //json-server url

  constructor(private httpClient : HttpClient) { }
  
  //Get All Contacts
  public getAllContacts(): Observable<IContact[]>{
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handlerError))
  }

  //Get Single Contact
  public getContact(contactId: string):Observable<IContact>{
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handlerError))
  }


  //Create a Contact

     public createContact( contact : IContact) : Observable<IContact>{
      let dataURL: string = `${this.serverUrl}/contacts`;
      return this.httpClient.post<IContact>(dataURL,contact).pipe(catchError(this.handlerError))
  
    }

  //Update a Contact

  public updateContact( contact : IContact, contactId : string) : Observable<IContact>{
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataURL,contact).pipe(catchError(this.handlerError))

  }


     //Delete a Contact

     public deleteContact( contactId : string) : Observable<{}>{
      let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
      return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handlerError))
  
    }
  
  //Get All Groups
  public getAllGroups(): Observable<IGroup[]>{
    let dataURL: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handlerError))
  }
  
  //Get Single group
  public getGroup(contact: IContact):Observable<IGroup>{
    let dataURL: string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handlerError))
  }

  //Error Handling
  public handlerError(error: HttpErrorResponse){
    let errorMessage : string ='';
    if(error.error instanceof ErrorEvent){
      //Client Error
      errorMessage = `Error : ${error.error.message}`
    }else{
      //Server Error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage)
  }

}
