async function downloadFileFromWasabi(token, bucket, wasabi_file_key, thumbnail) {
  try {
    const wasabi = new FormData()
    wasabi.append('bucket', bucket)
    wasabi.append('fileKey', thumbnail ? `${wasabi_file_key}_thumbnail` : wasabi_file_key)
    const response = await fetch(`${import.meta.env.VITE_REST_ENDPOINT}/wasabi2`, {
      method: 'POST',
      body: wasabi,
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.ok) {
      const fileBlob = await response.blob()
      return {
        wasabi_file_key: wasabi_file_key,
        fileBlob: fileBlob,
      }
    } else {
      return {
        wasabi_file_key: wasabi_file_key,
        fileBlob: null,
      }
    }
  } catch (error) {
    console.error(error.message)
  }
}

async function downloadFilesFromWasabi(token, bucket, fileKeys, thumbnail) {
  const downloadFileFromWasabis = fileKeys.map((fileKey) => downloadFileFromWasabi(token, bucket, fileKey, thumbnail))
  return await Promise.all(downloadFileFromWasabis)
}

export { downloadFileFromWasabi, downloadFilesFromWasabi }
