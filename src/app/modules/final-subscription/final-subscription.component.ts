import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const enum INFO_TYPE {
  PROFILE = 'profile',
  ATTACHEMENT = 'attchement',
  SEGMENT = 'segment',
}

@Component({
  selector: 'app-final-subscription',
  templateUrl: './final-subscription.component.html',
  styleUrls: ['./final-subscription.component.scss']
})

export class FinalSubscriptionComponent implements OnInit {
infoType:string
currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
isCurrentFormValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
  false
);
formsCount: number = 4;
  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.isProfile , this.isAttachment , this.isSegment);
  }
  isProfile = this.router.url.includes('profile');
  isAttachment = this.router.url.includes('attachment')
  isSegment = this.router.url.includes('segment')
  nextStep() {
    const nextStep = this.currentStep$.value + 1;
    if (nextStep > this.formsCount) {
      return;
    }
    this.currentStep$.next(nextStep);
  }
  // profileActive(){
  //   this.infoType = INFO_TYPE.PROFILE
  //   console.log(this.infoType)
  // }
  // attachementActive(){
  //   this.infoType = INFO_TYPE.ATTACHEMENT
  //   console.log(this.infoType)

  // }
  // segmentActive(){
  //   this.infoType = INFO_TYPE.SEGMENT
  //   console.log(this.infoType)

  // }
}
