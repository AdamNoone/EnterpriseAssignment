import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubFeedComponent } from './pub-feed.component';

describe('PubFeedComponent', () => {
  let component: PubFeedComponent;
  let fixture: ComponentFixture<PubFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
