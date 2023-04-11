import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPrompsComponent } from './card-promps.component';

describe('CardPrompsComponent', () => {
  let component: CardPrompsComponent;
  let fixture: ComponentFixture<CardPrompsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPrompsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPrompsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
