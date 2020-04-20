import { Component, OnInit } from '@angular/core';
import { PubService } from 'src/app/services/pub.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class BoardAdminComponent implements OnInit {
  pub = {
    name: '',
    lat: 0.0,
    lon: 0.0,
  };
  submitted = false;
  private content: any;

  constructor(private pubService: PubService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  savePub() {
    const data = {
      title: this.pub.name,
      lat: this.pub.lat,
      lon: this.pub.lon
    };

    this.pubService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTutorial() {
    this.submitted = false;
    this.pub = {
      name: '',
      lat: 0.0,
      lon: 0.0
    };
  }
}
