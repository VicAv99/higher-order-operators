import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberCommentsComponent } from './member-comments.component';

describe('MemberCommentsComponent', () => {
  let component: MemberCommentsComponent;
  let fixture: ComponentFixture<MemberCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberCommentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
