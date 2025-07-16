import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetasArticulosComponent } from './carpetas-articulos.component';

describe('CarpetasArticulosComponent', () => {
  let component: CarpetasArticulosComponent;
  let fixture: ComponentFixture<CarpetasArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarpetasArticulosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarpetasArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
