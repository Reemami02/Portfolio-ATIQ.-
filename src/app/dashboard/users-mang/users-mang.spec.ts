import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersMang } from './users-mang';

describe('UsersMang', () => {
  let component: UsersMang;
  let fixture: ComponentFixture<UsersMang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMang],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersMang);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
