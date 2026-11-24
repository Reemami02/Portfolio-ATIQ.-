import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyProfileMang } from './my-profile-mang';

describe('MyProfileMang', () => {
  let component: MyProfileMang;
  let fixture: ComponentFixture<MyProfileMang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfileMang],
    }).compileComponents();

    fixture = TestBed.createComponent(MyProfileMang);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
