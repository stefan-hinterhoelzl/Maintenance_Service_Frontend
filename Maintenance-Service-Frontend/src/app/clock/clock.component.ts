import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { map, share } from "rxjs/operators";

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {

  constructor() { }

  rxTime = new Date();
  intervalId;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
