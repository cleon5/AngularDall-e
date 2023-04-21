import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearStableDiffusionComponent } from './crear-stable-diffusion.component';

describe('CrearStableDiffusionComponent', () => {
  let component: CrearStableDiffusionComponent;
  let fixture: ComponentFixture<CrearStableDiffusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearStableDiffusionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearStableDiffusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
