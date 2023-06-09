import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading = new Subject<boolean>()
  loadingAction$ = this.loading.asObservable()

  showLoader()
  {
    this.loading.next(true)
  }

  hideLoader()
  {
    this.loading.next(false)
  }
  


}
