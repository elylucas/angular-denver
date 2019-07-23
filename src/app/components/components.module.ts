import { NgModule } from '@angular/core';
import { SessionItemComponent } from './session-item/session-item.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpeakerItemComponent } from './speaker-item/speaker-item.component';
import { AbstractPipe } from '../abstract.pipe';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [SessionItemComponent, SpeakerItemComponent, AbstractPipe],
  exports: [SessionItemComponent, SpeakerItemComponent, AbstractPipe]
})
export class ComponentsModule {}
