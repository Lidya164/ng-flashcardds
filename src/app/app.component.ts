import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IFlash } from './models/flash.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-flashcards';
  @ViewChild('flashForm', {static: true}) flashForm!: NgForm
  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: this.getRandomNumber(),
    }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: this.getRandomNumber(),
    remembered: 'correct'
    }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: this.getRandomNumber(),
    remembered: 'incorrect'

    }];
    flash: IFlash = {
      question: '',
      answer: '',
    };
    editing = false;
    editingId!: number;
    trackByFlashId(index: any, flash: any) {
      return flash.id;
    }

  getRandomNumber() {
    return Math.floor(Math.random() * 10000);
   }
   handleToggleCard(id: number){
     const flash = this.flashs.find(flash => flash.id == id);
     // @ts-ignore
     flash?.show = !flash?.show
   }
   handleDelete(id: number) {
     // @ts-ignore
    const flashId = this.flashs.indexOf(flash => flash.id ===
    id);
    this.flashs.splice(flashId, 1)
    }
    handleEdit(id: number) {
    this.editing = true;
    this.editingId = id;
    //@ts-ignore
    const flash = this.flashs.find(flash => flash.id === id);
    //@ts-ignore
    this.flash.question = flash.question;
    //@ts-ignore
    this.flash.answer = flash.answer;
    }
     // @ts-ignore
    handleRememeberedChange({id, flag}) {
    const flash = this.flashs.find(flash => flash.id === id);
     // @ts-ignore
    flash.remembered = flag;
    }

    handleSubmit()
 {
  this.flashs.push({
    id: this.getRandomNumber(),
    ...this.flash
  });
  this.handleClear();
 }
    handleClear() {
      this.flash = {
        question: '',
        answer: ''
      }
      this.flashForm.reset();
    }
    handleUpdate() {
      const flash = this.flashs.find(flash => flash.id ===
        this.editingId);
        //@ts-ignore
        flash.question = this.flash.question;
        //@ts-ignore
        flash.answer = this.flash.answer;
        this.handleCancel();
       
    }
    handleCancel() {
      this.editing = false;
      //@ts-ignore
      this.editingId = undefined;
      this.handleClear();
      }
}
