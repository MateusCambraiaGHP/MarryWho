import { story, storyChapters } from '../content/story';
import { storyGallery } from '../content/storyGallery';
import { ScrollStory } from './ScrollStory';
import { SectionHeading } from './SectionHeading';
import { StoryGallery } from './StoryGallery';
import { StoryVideo } from './StoryVideo';

export function Couple() {
  return (
    <section className="section couple" id="o-casal" aria-labelledby="couple-title">
      <div className="container">
        <SectionHeading eyebrow="Nós dois" title={story.heading} titleId="couple-title" subtitle={story.subtitle} />

        <ScrollStory chapters={storyChapters} />

        <StoryGallery photos={storyGallery} />

        <StoryVideo />

        <div className="story__text">
          <p className="story__closing">{story.closing}</p>
          <p className="story__signature">{story.signature}</p>
        </div>
      </div>
    </section>
  );
}
