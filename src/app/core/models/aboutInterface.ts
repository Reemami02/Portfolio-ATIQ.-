export interface AboutFeature {
  icon?: string;
  title: string;
  description: string;
}

export interface AboutContent {
  _id?: string;
  hTitle: string;
  hDescription: string;
  storyTitle: string;
  storyImage: string;
  storyParagraphs: string[];
  mTitle: string;
  mDescription: string;
  vTitle: string;
  vDescription: string;
  features: AboutFeature[];
  closingTitle: string;
  closingDescription: string;
}
