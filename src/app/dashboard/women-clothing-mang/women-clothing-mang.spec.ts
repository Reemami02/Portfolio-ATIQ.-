import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WomenClothingMang } from './women-clothing-mang';

describe('WomenClothingMang', () => {
  let component: WomenClothingMang;
  let fixture: ComponentFixture<WomenClothingMang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomenClothingMang],
    }).compileComponents();

    fixture = TestBed.createComponent(WomenClothingMang);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
