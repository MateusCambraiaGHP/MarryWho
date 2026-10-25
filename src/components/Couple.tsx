import { story, storyChapters } from '../content/story';
import { ScrollStory } from './ScrollStory';
import { SectionHeading } from './SectionHeading';

export function Couple() {
  return (
    <section className="section couple" id="o-casal" aria-labelledby="couple-title">
      <div className="container">
        <SectionHeading eyebrow="Nós dois" title={story.heading} titleId="couple-title" subtitle={story.subtitle} />

        <ScrollStory chapters={storyChapters} />

        <div className="story__text">
          <p className="story__closing">{story.closing}</p>
          <p className="story__signature">{story.signature}</p>
        </div>
      </div>
    </section>
  );
}
