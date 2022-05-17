import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoFormComponent } from './jogo-form.component';

describe('JogoFormComponent', () => {
  let component: JogoFormComponent;
  let fixture: ComponentFixture<JogoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
