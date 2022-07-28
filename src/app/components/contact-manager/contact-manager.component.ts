import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  public loading : boolean = false;
  public contacts : IContact[] = [];
  public errorMessage : string | null = null;
  
  constructor(private contactService : ContactService) { }

  ngOnInit(): void {
    this.getAllContactsFormServer();

  }

  public getAllContactsFormServer(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data : IContact[])=>{
     this.contacts = data;
     this.loading = false;
     
    },(error) =>{
     this.errorMessage = error;
     this.loading = false;
    })

  }

  public clickDeleteContact(contactId : string | undefined){
    if(contactId){
      this.contactService.deleteContact(contactId).subscribe((data : {})=>{
        this.getAllContactsFormServer();

      },(error)=>{
        this.errorMessage = error;
      })

    }
  }

}
