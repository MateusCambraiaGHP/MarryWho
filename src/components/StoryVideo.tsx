import { useRef, useState } from 'react';
import { assetUrl } from '../lib/asset';

export function StoryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    void video.play();
  };

  return (
    <figure className="story-film">
      <div className="story-film__frame">
        <video
          className="story-film__video"
          ref={videoRef}
          src={assetUrl('img/nosso-filme.mp4')}
          poster={assetUrl('img/nosso-filme-poster.jpg')}
          controls
          playsInline
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          O seu navegador não consegue reproduzir este vídeo.
        </video>
        {isPlaying ? null : (
          <button className="story-film__play" type="button" onClick={handlePlay}>
            <span className="story-film__play-icon" aria-hidden="true" />
            <span className="story-film__play-label">Assistir ao filme</span>
          </button>
        )}
      </div>
      <figcaption className="story-film__caption">
        <span className="story-film__eyebrow">Nosso filme</span>
        <span className="story-film__text">Um pedaço do nosso para sempre, na Vila Relicário.</span>
      </figcaption>
    </figure>
  );
}
