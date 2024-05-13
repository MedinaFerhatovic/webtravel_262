import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDestinationComponent } from './admin-destination.component';

describe('AdminDestinationComponent', () => {
  let component: AdminDestinationComponent;
  let fixture: ComponentFixture<AdminDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDestinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
