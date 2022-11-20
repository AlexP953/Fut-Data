import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGamesComponent } from './detail-games.component';

describe('DetailGamesComponent', () => {
  let component: DetailGamesComponent;
  let fixture: ComponentFixture<DetailGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
