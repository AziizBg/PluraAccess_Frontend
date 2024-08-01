import { Component, OnInit } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { Licence } from '../../models/licence';
import { ResponseSchema } from '../../models/response.schema';
import { MaterialModule } from '../../../module/Material.Module';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { LicenceComponent } from '../../components/licences/licence/licence.component';
import { User } from '../../models/user';


@Component({
  selector: 'app-licences',
  standalone: true,
  imports: [MaterialModule, CommonModule, DataViewModule, LicenceComponent],
  templateUrl: './licences.component.html',
  styleUrl: './licences.component.css',
})
export class LicencesComponent implements OnInit {
  constructor(private service: LicenceService) {}
  data: Licence[] = [];
  user:User= {
    id:1,
    name:"aziz",
  }

  ngOnInit(): void {
    this.LoadInitialData();
  }
  LoadInitialData() {
    this.service.getAll().subscribe((item:ResponseSchema) => {
      this.data = item.$values;
      console.log('data:', this.data);
      this.checkUserStudying();
    });
  }
  takeLicence(id:number, user:User){
    this.service.takeLicence(id, user).subscribe((item:ResponseSchema)=>{
      this.user.isStudying=true;
      this.LoadInitialData();
      console.log("item: ",item);
    })
  }
  returnLicence(id:number){
    this.service.returnLicence(id).subscribe((item:ResponseSchema)=>{
      this.user.isStudying=false;
      this.LoadInitialData();
      console.log("item: ",item);
    })
  }
  checkUserStudying(){
    const userSessions =this.data.filter(licence => licence.currentSession).filter(licence=>licence.currentSession?.user?.id==this.user.id);
    if(userSessions.length>0) this.user.isStudying=true;
  }
}
