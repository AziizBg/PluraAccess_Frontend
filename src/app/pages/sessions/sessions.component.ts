import { Component, OnInit } from '@angular/core';
import { ResponseSchema } from '../../models/response.schema';
import { SessionService } from '../../services/sessions.service';
import { Session } from '../../models/session';
import { MaterialModule } from '../../../module/Material.Module';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent implements OnInit {
  constructor(private service: SessionService) {}
  data: Session[] = [];

  ngOnInit(): void {
    this.LoadInitialData();
  }
  LoadInitialData() {
    this.service.getAll().subscribe((item:ResponseSchema) => {
      this.data = item.$values;
      console.log(this.data);
    });
  }
}
