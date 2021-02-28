import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsStoreComponent } from './claims-store.component';

describe('ClaimsStoreComponent', () => {
  let component: ClaimsStoreComponent;
  let fixture: ComponentFixture<ClaimsStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
