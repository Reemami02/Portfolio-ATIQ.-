import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeMang } from './home-mang';

describe('HomeMang', () => {
  let component: HomeMang;
  let fixture: ComponentFixture<HomeMang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMang],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMang);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
