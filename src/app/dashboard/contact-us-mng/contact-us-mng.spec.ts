import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactUsMng } from './contact-us-mng';

describe('ContactUsMng', () => {
  let component: ContactUsMng;
  let fixture: ComponentFixture<ContactUsMng>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsMng],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsMng);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
