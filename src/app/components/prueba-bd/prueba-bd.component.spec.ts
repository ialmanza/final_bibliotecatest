import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaBdComponent } from './prueba-bd.component';

describe('PruebaBdComponent', () => {
  let component: PruebaBdComponent;
  let fixture: ComponentFixture<PruebaBdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaBdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
