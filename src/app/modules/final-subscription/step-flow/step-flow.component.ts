import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICreateAccount, inits } from '../../wizards/create-account.helper';

@Component({
  selector: 'app-step-flow',
  templateUrl: './step-flow.component.html',
  styleUrls: ['./step-flow.component.scss']
})
export class StepFlowComponent implements OnInit {
  account$: BehaviorSubject<ICreateAccount> =
    new BehaviorSubject<ICreateAccount>(inits);
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  formsCount: number = 4;
  constructor() { }
  private unsubscribe: Subscription[] = [];


  ngOnInit(): void {
  }
  updateAccount = (part: Partial<ICreateAccount>, isFormValid: boolean) => {
    const currentAccount = this.account$.value;
    const updatedAccount = { ...currentAccount, ...part };
    this.account$.next(updatedAccount);
    this.isCurrentFormValid$.next(isFormValid);
  };

  nextStep() {
    const nextStep = this.currentStep$.value + 1;
    if (nextStep > this.formsCount) {
      return;
    }
    if(this.currentStep$.value === 1){
      console.log("Step 1");
    }
    if(this.currentStep$.value === 2){
      console.log("Step 2");
    }
    if(this.currentStep$.value === 3){
      console.log("Step 3");
    }
    this.currentStep$.next(nextStep);
  }

  prevStep() {
    const prevStep = this.currentStep$.value - 1;
    if (prevStep === 0) {
      return;
    }
    this.currentStep$.next(prevStep);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
