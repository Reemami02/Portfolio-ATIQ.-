import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartMng } from './cart-mng';

describe('CartMng', () => {
  let component: CartMng;
  let fixture: ComponentFixture<CartMng>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartMng],
    }).compileComponents();

    fixture = TestBed.createComponent(CartMng);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
