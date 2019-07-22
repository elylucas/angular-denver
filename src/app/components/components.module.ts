import { NgModule } from '@angular/core';
import { SessionItemComponent } from './session-item/session-item.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpeakerItemComponent } from './speaker-item/speaker-item.component';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [SessionItemComponent, SpeakerItemComponent],
  exports: [SessionItemComponent, SpeakerItemComponent]
})
export class ComponentsModule {}
