import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannierADMINComponent } from './pannier-admin.component';

describe('PannierADMINComponent', () => {
  let component: PannierADMINComponent;
  let fixture: ComponentFixture<PannierADMINComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PannierADMINComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PannierADMINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
