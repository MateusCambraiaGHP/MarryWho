import { useEffect, useRef, useState } from 'react';
import type { StoryChapter } from '../content/story';
import { assetUrl } from '../lib/asset';
import { SmartImage } from './SmartImage';

export function ScrollStory({ chapters }: { chapters: StoryChapter[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;

    const updateActiveChapter = () => {
      frame = 0;

      const elements = chapterRefs.current.filter(
        (element): element is HTMLElement => element !== null,
      );

      if (elements.length === 0) {
        return;
      }

      const stageRect = stageRef.current?.getBoundingClientRect();
      const stageBottom =
        stageRect && stageRect.height > 0 ? Math.max(stageRect.bottom, 0) : 0;
      const readingStart = Math.min(stageBottom, window.innerHeight * 0.8);
      const readingLine = readingStart + (window.innerHeight - readingStart) * 0.35;

      let nextIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();

        if (rect.top <= readingLine && rect.bottom > readingLine) {
          nextIndex = index;
          smallestDistance = 0;
          return;
        }

        if (smallestDistance === 0) {
          return;
        }

        const distance = Math.min(
          Math.abs(rect.top - readingLine),
          Math.abs(rect.bottom - readingLine),
        );

        if (distance < smallestDistance) {
          smallestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const scheduleUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateActiveChapter);
      }
    };

    updateActiveChapter();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [chapters]);

  return (
    <div className="story-layout">
      <div className="story-stage" aria-hidden="true" ref={stageRef}>
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
