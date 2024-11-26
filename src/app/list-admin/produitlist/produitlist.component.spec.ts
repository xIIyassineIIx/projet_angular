import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitlistComponent } from './produitlist.component';

describe('ProduitlistComponent', () => {
  let component: ProduitlistComponent;
  let fixture: ComponentFixture<ProduitlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
