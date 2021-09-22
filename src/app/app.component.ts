import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IFlash } from './models/flash.model';
import { FlashService } from './services/flash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-flashcards';
  @ViewChild('flashForm', {static: true}) flashForm!: NgForm;
  //@ts-ignore
  //@ts-ignore
  flash$: Observable<IFlash[]>;
  //@ts-ignore
  flash: IFlash = {
      question: '',
      answer: '',
  };
    editing = false;
    editingId!: number;

constructor(
  private flashService: FlashService
) {

}
ngOnInit() {
  this.flash$ = this.flashService.flashs$;

}
ngOnDestroy() {

}


    trackByFlashId(index: any, flash: any) {
      return flash.id;
    }

  getRandomNumber() {
    return Math.floor(Math.random() * 10000);
   }
   handleToggleCard(id: number){
     this.flashService.toggleFlash(id);
   }
   handleDelete(id: number) {
      this.flashService.deleteFlash(id);
    }
    handleEdit(id: number) {
      //@ts-ignore
      this.flash = this.flashService.getFlash(id);
      this.editing = true;
      this.editingId = id;
    }
     // @ts-ignore
    handleRememeberedChange({id, flag}) {
      this.flashService.rememberedChange(id, flag);
    }

    handleSubmit() {
    this.flashService.addFlash(this.flash);
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
     this.flashService.updateFlash(this.editingId, this.flash);
        this.handleCancel();
       
    }
    handleCancel() {
      this.editing = false;
      //@ts-ignore
      this.editingId = undefined;
      this.handleClear();
      }
}
