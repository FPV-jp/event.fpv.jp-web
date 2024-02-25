export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function fileSize(size) {
  return size > 1024 ? (size > 1048576 ? Math.round(size / 1048576) + 'MB' : Math.round(size / 1024) + 'KB') : size + 'Byte'
}

export const dateFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
}

export function dateFormat(dateString) {
  return new Date(dateString).toLocaleString('ja-JP', dateFormatOptions)
}

export async function getVideoOption(videoBlob) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')

    video.onloadeddata = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((poster) => {
        video.pause()
        resolve({
          poster,
          duration: video.duration,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight,
        })
      }, 'image/jpeg')
    }
    video.onerror = (error) => {
      reject(error)
    }
    video.src = URL.createObjectURL(videoBlob)
    video.play()
  })
}

export async function getAudioOption(AudioBlob) {
  return new Promise((resolve, reject) => {
    const Audio = document.createElement('Audio')
    Audio.onloadeddata = () => {
      resolve({
        duration: Audio.duration,
        volume: Audio.volume,
      })
    }
    Audio.onerror = (error) => {
      reject(error)
    }
    Audio.src = URL.createObjectURL(AudioBlob)
  })
}

export async function getImageOption(ImageBlob, thumbnailWidth, thumbnailHeight) {
  return new Promise((resolve, reject) => {
    const Image = document.createElement('img')

    Image.onload = () => {
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')

      var imageAspectRatio = Image.width / Image.height
      var targetAspectRatio = thumbnailWidth / thumbnailHeight

      var clipWidth, clipHeight
      if (targetAspectRatio > imageAspectRatio) {
        clipWidth = Image.width
        clipHeight = Image.width / targetAspectRatio
      } else {
        clipWidth = Image.height * targetAspectRatio
        clipHeight = Image.height
      }

      var clipX = (Image.width - clipWidth) / 2
      var clipY = (Image.height - clipHeight) / 2

      canvas.width = thumbnailWidth
      canvas.height = thumbnailHeight

      ctx.drawImage(Image, clipX, clipY, clipWidth, clipHeight, 0, 0, thumbnailWidth, thumbnailHeight)

      canvas.toBlob((thumbnail) => {
        resolve({
          thumbnail,
          imageWidth: Image.width,
          imageHeight: Image.height,
        })
      }, 'image/jpeg')
    }

    Image.onerror = (error) => {
      reject(error)
    }

    Image.src = URL.createObjectURL(ImageBlob)
  })
}
