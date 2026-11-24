import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarMng } from './navbar-mng';

describe('NavbarMng', () => {
  let component: NavbarMng;
  let fixture: ComponentFixture<NavbarMng>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarMng],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarMng);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
