import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css']
})
export class UpdateReviewComponent implements OnInit {
  currentReview = null;
  message = '';
  submitted = false;
  isSuccessful = false;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.message = '';
    this.getReview(this.route.snapshot.paramMap.get('id'));
  }

  getReview(id) {
    this.reviewService.get(id)
      .subscribe(
        data => {
          this.currentReview = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status) {
    const data = {
      title: this.currentReview.title,
      description: this.currentReview.review_text,
       rating: this.currentReview.rating,
    };

    this.reviewService.update(this.currentReview.id, data)
      .subscribe(
        response => {
          this.currentReview.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateReview() {
    if (this.currentReview.rating >= 0 && this.currentReview.rating <= 5) {
      document.getElementById('rating_error').style.display = 'none';
      this.reviewService.update(this.currentReview.id, this.currentReview)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.isSuccessful = true;
          },
          error => {
            console.log(error);
          });
    } else {
      this.message = 'Rating Must be a number between 0 and 5';
      document.getElementById('rating_error').style.display = 'block';
    }
  }

  deleteReview() {
    this.reviewService.delete(this.currentReview.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/profile']);
        },
        error => {
          console.log(error);
        });
  }
}
