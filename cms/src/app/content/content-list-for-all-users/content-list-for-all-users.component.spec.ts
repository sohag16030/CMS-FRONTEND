import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListForAllUsersComponent } from './content-list-for-all-users.component';

describe('ContentListForAllUsersComponent', () => {
  let component: ContentListForAllUsersComponent;
  let fixture: ComponentFixture<ContentListForAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentListForAllUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentListForAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
