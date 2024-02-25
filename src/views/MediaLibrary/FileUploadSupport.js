import { getAudioOption, getImageOption, getVideoOption } from '@/utils'
import { uploadFileToWasabi } from '@/utils/WasabiUploader'

async function upload(token, files, createMediaLibrary) {
  for (const objectURL of Object.keys(files)) {
    const fileBlob = files[objectURL]

    const createMediaLibraryInput = {
      file_name: fileBlob.name,
      file_type: fileBlob.type,
      file_size: fileBlob.size,
      file_last_modified: new Date(fileBlob.lastModified).toISOString(),
    }

    if (fileBlob.type.match('video.*')) {
      const videoOption = await getVideoOption(fileBlob)
      createMediaLibraryInput.file_width = videoOption.videoWidth
      createMediaLibraryInput.file_height = videoOption.videoHeight
      createMediaLibraryInput.file_duration = videoOption.duration
      const imageOption = await getImageOption(videoOption.poster, 264, 164)
      createMediaLibraryInput.wasabi_file_key = await uploadFileToWasabi(token, import.meta.env.VITE_WASABI_BUCKET, fileBlob, imageOption.thumbnail)
    }
    if (fileBlob.type.match('image.*')) {
      const imageOption = await getImageOption(fileBlob, 264, 164)
      createMediaLibraryInput.file_width = imageOption.imageWidth
      createMediaLibraryInput.file_height = imageOption.imageHeight
      createMediaLibraryInput.wasabi_file_key = await uploadFileToWasabi(token, import.meta.env.VITE_WASABI_BUCKET, fileBlob, imageOption.thumbnail)
    }
    if (fileBlob.type.match('audio.*')) {
      const audioOption = await getAudioOption(fileBlob)
      createMediaLibraryInput.file_duration = audioOption.duration
      createMediaLibraryInput.wasabi_file_key = await uploadFileToWasabi(token, import.meta.env.VITE_WASABI_BUCKET, fileBlob)
    }

    const response = await createMediaLibrary({ variables: { createMediaLibraryInput } })
    console.log('response:', response.data)
  }
}

export { upload }
