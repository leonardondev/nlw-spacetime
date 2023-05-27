'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)
  const [previewType, setPreviewType] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }
    console.log(files[0])
    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
    setPreviewType(files[0].type)
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={onFileSelected}
        id="media"
        className="invisible h-0 w-0"
      />

      {preview && previewType?.includes('image') && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
