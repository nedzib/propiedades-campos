import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuidorComponent } from './distribuidor.component';

describe('DistribuidorComponent', () => {
  let component: DistribuidorComponent;
  let fixture: ComponentFixture<DistribuidorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistribuidorComponent]
    });
    fixture = TestBed.createComponent(DistribuidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
