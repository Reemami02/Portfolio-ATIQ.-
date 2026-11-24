import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsDetailsMang } from './products-details-mang';

describe('ProductsDetailsMang', () => {
  let component: ProductsDetailsMang;
  let fixture: ComponentFixture<ProductsDetailsMang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDetailsMang],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsDetailsMang);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
