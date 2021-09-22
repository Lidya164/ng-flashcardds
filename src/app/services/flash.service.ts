import { Injectable } from '@angular/core';
import { IFlash } from '../models/flash.model';
import { BehaviorSubject } from 'rxjs';
function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}
@Injectable({
  providedIn: 'root'
})
export class FlashService {
  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: getRandomNumber(),
    }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: getRandomNumber(),
    remembered: 'correct'
    }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: getRandomNumber(),
    remembered: 'incorrect'

    }];

  flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);
  constructor() { }

  addFlash(flash: IFlash) {
    this.flashs = [
      ...this.flashs, {
        ...flash,
        show: false,
        id: getRandomNumber()
      }
    ];
    this.flashs$.next(this.flashs);
  }
  toggleFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id == id);
    this.flashs = [
      ...this.flashs.slice(0,index),
      {
        ...this.flashs[index],
        show: !this.flashs[index].show
      },
      ...this.flashs.slice(index + 1)
    ];
    this.flashs$.next(this.flashs);
  }
  deleteFlash(id: number) {
     // @ts-ignore
     const index = this.flashs.findIndex(flash => flash.id ===
      id);
      this.flashs = [
        ...this.flashs.slice(0,index),
        ...this.flashs.slice(index + 1)
      ];
      this.flashs$.next(this.flashs);
      
  }
  rememberedChange(id: number, flag: string) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    //@ts-ignore
    this.flashs = [
      ...this.flashs.slice(0,index),
      {
        ...this.flashs[index],
        remembered: flag
      },
      ...this.flashs.slice(index + 1)
    ];
    this.flashs$.next(this.flashs);
  }
  updateFlash(id: number, updatedFlash: IFlash) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    // @ts-ignore
    this.flashs = [
      ...this.flashs.slice(0,index),
      {
        ...this.flashs[index],
       ... updatedFlash
      },
      ...this.flashs.slice(index + 1)
    ];
    this.flashs$.next(this.flashs);
  }
  getFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    return this.flashs[index];
  }
}
