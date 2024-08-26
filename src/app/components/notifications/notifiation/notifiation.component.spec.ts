import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiationComponent } from './notifiation.component';

describe('NotifiationComponent', () => {
  let component: NotifiationComponent;
  let fixture: ComponentFixture<NotifiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifiationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
