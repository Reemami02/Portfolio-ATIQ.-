import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenClothingMang } from './men-clothing-mang';

describe('MenClothingMang', () => {
  let component: MenClothingMang;
  let fixture: ComponentFixture<MenClothingMang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenClothingMang],
    }).compileComponents();

    fixture = TestBed.createComponent(MenClothingMang);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
