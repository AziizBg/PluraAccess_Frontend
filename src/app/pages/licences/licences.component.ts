import { Component, OnInit } from '@angular/core';
import { LicenceService } from '../../services/licence.service';
import { Licence } from '../../models/licence';
import { ResponseSchema } from '../../models/response.schema';

@Component({
  selector: 'app-licences',
  standalone: true,
  imports: [],
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
