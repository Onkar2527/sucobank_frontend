import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonActionableNotificationsComponent } from './non-actionable-notifications.component';

describe('NonActionableNotificationsComponent', () => {
  let component: NonActionableNotificationsComponent;
  let fixture: ComponentFixture<NonActionableNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonActionableNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonActionableNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
