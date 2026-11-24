import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ContactServices } from '../../core/services/contactService';

@Component({
  selector: 'app-contact-us-mng',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-us-mng.html',
  styleUrl: './contact-us-mng.css'
})
export class ContactUsMng implements OnInit {
  private contactService = inject(ContactServices);

  info: any = {
    email: '',
    phone: '',
    address: '',
    facebookLink: '',
    instagramLink: '',
    twitterLink: ''
  };

  messages: any[] = [];
  status = '';

  ngOnInit(): void {
    this.loadContactInfo();
    this.loadMessages();
  }

  loadContactInfo(): void {
    this.contactService.getContactInfo().subscribe({
      next: response => {
        this.info = response.contactInfo || this.info;
      },
      error: () => {
        this.status = 'No contact information saved yet.';
      }
    });
  }

  loadMessages(): void {
    this.contactService.getMessages().subscribe({
      next: response => {
        this.messages = response.allMessages || [];
      },
      error: () => {
        this.messages = [];
      }
    });
  }

  save(): void {
    this.contactService.saveContactInfo(this.info).subscribe({
      next: () => {
        this.status = 'Contact information saved.';
      },
      error: () => {
        this.status = 'Could not save contact information.';
      }
    });
  }

  deleteMessage(id: string): void {
    if (!confirm('Delete this message?')) {
      return;
    }

    this.contactService.deleteMessage(id).subscribe({
      next: () => this.loadMessages(),
      error: () => {
        this.status = 'Could not delete message.';
      }
    });
  }
}
