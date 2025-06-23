import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreacionActualizacionComponent } from './modal-creacion-actualizacion.component';

describe('ModalCreacionActualizacionComponent', () => {
  let component: ModalCreacionActualizacionComponent;
  let fixture: ComponentFixture<ModalCreacionActualizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreacionActualizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCreacionActualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
