import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutContent } from '../../core/models/aboutInterface';
import { AboutServices } from '../../core/services/aboutService';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {
  private aboutService = inject(AboutServices);

  about: AboutContent | null = null;

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe({
      next: data => {
        this.about = data;
      },
      error: error => {
        console.error('Error loading About content:', error);
      }
    });
  }
}
