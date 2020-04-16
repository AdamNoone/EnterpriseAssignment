import { Component, OnInit } from '@angular/core';
import { PubService } from 'src/app/services/pub.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  currentRecipe = null;
  message = '';

  constructor(
    private recipeService: PubService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.message = '';
    this.getRecipe(this.route.snapshot.paramMap.get('id'));
  }

  getRecipe(id) {
    this.recipeService.get(id)
      .subscribe(
        data => {
          this.currentRecipe = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status) {
    const data = {
      title: this.currentRecipe.title,
      description: this.currentRecipe.description,
      published: status
    };

    this.recipeService.update(this.currentRecipe.id, data)
      .subscribe(
        response => {
          this.currentRecipe.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateRecipe() {
    this.recipeService.update(this.currentRecipe.id, this.currentRecipe)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The Recipe was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteRecipe() {
    this.recipeService.delete(this.currentRecipe.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/recipes']);
        },
        error => {
          console.log(error);
        });
  }
}
