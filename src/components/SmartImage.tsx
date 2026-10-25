import { useState } from 'react';

export function SmartImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackText,
  loading = 'lazy',
  fetchPriority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackText?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}) {
  const [hasFailed, setHasFailed] = useState(false);

  const wrapperClassName = className ? `smart-image ${className}` : 'smart-image';

  if (hasFailed) {
    return (
      <span className={wrapperClassName} aria-hidden="true">
        <span className="smart-image__fallback">
          <span className="smart-image__monogram">{fallbackText ?? 'L & B'}</span>
        </span>
      </span>
    );
  }

  return (
    <span className={wrapperClassName}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onError={() => setHasFailed(true)}
      />
    </span>
  );
}
