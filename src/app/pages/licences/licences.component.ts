import { Component, OnInit } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { Licence } from '../../models/licence';
import { ResponseSchema } from '../../models/response.schema';
import { MaterialModule } from '../../../module/Material.Module';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { LicenceComponent } from '../../components/licences/licence/licence.component';
import { User } from '../../models/user';
import { CommentsComponent } from '../../components/licences/comments/comments.component';
import {  UserService } from '../../services/user.service';
import { Comment } from '../../models/comment';
import { allComments } from '../../data/all-comments';



@Component({
  selector: 'app-licences',
  standalone: true,
  imports: [MaterialModule, CommonModule, DataViewModule, LicenceComponent, CommentsComponent],
  templateUrl: './licences.component.html',
  styleUrl: './licences.component.css',
})
export class LicencesComponent implements OnInit {
  constructor(private licenceService: LicenceService, private userService: UserService) {}
  data: Licence[] = [];
  user:User={id:-1, name:""};
  comment:Comment={title:"", subtitle:""}

  ngOnInit(): void {
    this.LoadUsersData();
    this.LoadSessionsData();
  }
  LoadSessionsData() {
    this.licenceService.getAll().subscribe((item:ResponseSchema) => {
      this.data = item.$values;
      console.log('data:', this.data);
      this.checkUserStudying();
      if(this.user.isStudying) 
      this.comment= allComments.learning;

      else{
        if(this.data.filter(licence => !licence.currentSession).length>0) 
        this.comment= allComments.available;

        else 
         this.comment= allComments.unavailable;
      }
    });
  }
  LoadUsersData(){
    this.userService.getUser().subscribe((item:any) => {      
      this.user = {
        id:item.id,
        name: item.name
      }
      console.log('user:', this.user);

    })
  }

  takeLicence(id:number, user:User){
    this.comment = allComments.requesting;
    this.user.isRequesting=true;
    this.licenceService.takeLicence(id, user).subscribe((item:ResponseSchema)=>{
      this.user.isStudying=true;
      this.user.isRequesting=false;
      this.comment= allComments.learning;
      this.LoadSessionsData();
      console.log("item: ",item);
    })
  }
  returnLicence(id:number){
    this.comment= allComments.returning;
    this.licenceService.returnLicence(id).subscribe((item:ResponseSchema)=>{
      this.user.isStudying=false;
      this.LoadSessionsData();
      console.log("item: ",item);
    })
  }
  checkUserStudying(){
    const userSessions =this.data.filter(licence => licence.currentSession).filter(licence=>licence.currentSession?.user?.id==this.user.id);
    if(userSessions.length>0) this.user.isStudying=true;
  }
}
