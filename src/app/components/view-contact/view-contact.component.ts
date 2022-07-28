import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId : string | null = null;
  public contact : IContact = {} as IContact;
  public errorMessage : string | null = null;
  public group:IGroup = {} as IGroup;
  


  constructor(private activatedRoute : ActivatedRoute, private contactService : ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((__param)=>{
      this.contactId = __param.get('contactId')
    });
    if(this.contactId){
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data : IContact)=>{
        this.contact = data;
        this.loading = false;
        this.contactService.getGroup(data).subscribe((data : IGroup)=>{
          this.group = data;

        })
      })
    }
  }

  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }

}
