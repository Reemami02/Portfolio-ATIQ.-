import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersMang } from './orders-mang';

describe('OrdersMang', () => {
  let component: OrdersMang;
  let fixture: ComponentFixture<OrdersMang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersMang],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersMang);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
