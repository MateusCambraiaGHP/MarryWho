import { useEffect, useRef, useState } from 'react';
import type { StoryChapter } from '../content/story';
import { assetUrl } from '../lib/asset';
import { SmartImage } from './SmartImage';

export function ScrollStory({ chapters }: { chapters: StoryChapter[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const elements = chapterRefs.current.filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleIndexes = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => Number((entry.target as HTMLElement).dataset.storyIndex));

        if (visibleIndexes.length > 0) {
          setActiveIndex(Math.max(...visibleIndexes));
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <div className="story-layout">
      <div className="story-stage" aria-hidden="true">
        <div className="story-stage__frames">
          {chapters.map((chapter, index) => (
            <SmartImage
              key={chapter.id}
              className={`story-stage__frame${index === activeIndex ? ' is-active' : ''}`}
              src={assetUrl(chapter.photo.src)}
              alt=""
              width={chapter.photo.width}
              height={chapter.photo.height}
              fallbackText="L & B"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
        <span className="story-stage__veil" />
        <div className="story-stage__meta">
          <span className="story-stage__monogram">L &amp; B</span>
          <span className="story-stage__counter">
            {String(activeIndex + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
          </span>
        </div>
        <span className="story-stage__rule" />
      </div>

      <div className="story-chapters">
        {chapters.map((chapter, index) => (
          <article
            className={`story-chapter${index === activeIndex ? ' is-active' : ''}`}
            key={chapter.id}
            data-story-index={index}
            ref={(element) => {
              chapterRefs.current[index] = element;
            }}
          >
            <SmartImage
              className="story-chapter__photo"
              src={assetUrl(chapter.photo.src)}
              alt={chapter.photo.alt}
              width={chapter.photo.width}
              height={chapter.photo.height}
              fallbackText="L & B"
            />
            <div className="story-chapter__body">
              <p className="story-chapter__index">{chapter.indexLabel}</p>
              <h3 className="story-chapter__title">{chapter.title}</h3>
              {chapter.paragraphs.map((paragraph) => (
                <p className="story-chapter__text" key={paragraph.slice(0, 32)}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
