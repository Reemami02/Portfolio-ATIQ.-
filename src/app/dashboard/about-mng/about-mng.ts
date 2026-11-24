import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AboutServices } from '../../core/services/aboutService';
import { AboutContent } from '../../core/models/aboutInterface';

@Component({
  selector: 'app-about-mng',
  imports: [FormsModule],
  templateUrl: './about-mng.html',
  styleUrl: './about-mng.css'
})
export class AboutMng implements OnInit {
  private aboutService = inject(AboutServices);

  data: AboutContent = {
    hTitle: '',
    hDescription: '',
    storyTitle: '',
    storyImage: '',
    storyParagraphs: [],
    mTitle: '',
    mDescription: '',
    vTitle: '',
    vDescription: '',
    features: [],
    closingTitle: '',
    closingDescription: ''
  };

  paragraphs = '';
  message = '';

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe({
      next: data => {
        this.data = data;
        this.paragraphs = (data.storyParagraphs || []).join('\n');
      },
      error: () => {
        this.message = 'Could not load About content.';
      }
    });
  }

  save(): void {
    this.data.storyParagraphs = this.paragraphs
      .split('\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph);

    this.aboutService.updateAbout(this.data).subscribe({
      next: data => {
        this.data = data;
        this.message = 'About page saved.';
      },
      error: () => {
        this.message = 'Could not save changes.';
      }
    });
  }
}
