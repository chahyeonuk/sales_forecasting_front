import { useState } from "react"

export function ImageWithFallback({ src, alt, fallback, className, ...props }) {
  const [imageSrc, setImageSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      if (fallback) {
        setImageSrc(fallback)
      }
    }
  }

  const handleLoad = () => {
    setHasError(false)
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  )
}