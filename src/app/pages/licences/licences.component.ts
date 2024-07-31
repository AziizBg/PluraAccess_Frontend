import { Component, OnInit } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { Licence } from '../../models/licence';
import { ResponseSchema } from '../../models/response.schema';
import { MaterialModule } from '../../../module/Material.Module';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { LicenceComponent } from '../../components/licences/licence/licence.component';


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

  ngOnInit(): void {
    this.LoadInitialData();
  }
  LoadInitialData() {
    this.service.getAll().subscribe((item:ResponseSchema) => {
      this.data = item.$values;
      console.log('data:', this.data);
    });
  }
}
