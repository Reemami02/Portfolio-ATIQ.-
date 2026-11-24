import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutMng } from './about-mng';

describe('AboutMng', () => {
  let component: AboutMng;
  let fixture: ComponentFixture<AboutMng>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMng],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMng);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
