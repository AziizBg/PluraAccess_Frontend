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
import { UserService } from '../../services/user.service';


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
  users:User[]=[];
  message:string='';

  ngOnInit(): void {
    this.LoadUsersData();
    this.LoadSessionsData();
  }
  LoadSessionsData() {
    this.licenceService.getAll().subscribe((item:ResponseSchema) => {
      this.data = item.$values;
      console.log('data:', this.data);
      this.checkUserStudying();
      if(this.user.isStudying) this.message="Session going on ...";
      else{
        if(this.data.filter(licence => !licence.currentSession).length>0) this.message="Licences available"
        else this.message= "No licence available";
      }
    });
  }
  LoadUsersData(){
    this.userService.getAll().subscribe((item:ResponseSchema) => {
      this.users = item.$values;
      console.log('users:', this.users);
      this.user = this.users[1];
    })
  }

  takeLicence(id:number, user:User){
    this.message="Requesting licence ..."
    this.user.isRequesting=true;
    this.licenceService.takeLicence(id, user).subscribe((item:ResponseSchema)=>{
      this.user.isStudying=true;
      this.user.isRequesting=false;
      this.message = "Session going on";
      this.LoadSessionsData();
      console.log("item: ",item);
    })
  }
  returnLicence(id:number){
    this.message="Returning licence ..."
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
