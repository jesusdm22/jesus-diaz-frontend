import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() showModal = false;
  @Input() user!: User;
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.showModal = false;
    console.log(this.showModal);
    this.closeModalEvent.emit();

  }

  redirect(url: string) {
    window.open(url, '_blank');
  }

}
