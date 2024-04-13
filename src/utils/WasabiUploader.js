async function uploadFileToWasabi(token, bucket, fileBlob, thumbnail) {
  try {
    const wasabi = new FormData()
    wasabi.append('bucket', bucket)
    wasabi.append('file', fileBlob)
    wasabi.append('thumbnail', thumbnail)
    const response = await fetch(`${import.meta.env.VITE_REST_ENDPOINT}/wasabi`, {
      method: 'POST',
      body: wasabi,
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.ok) {
      return (await response.json()).wasabi_file_key
    }
  } catch (error) {
    console.error(error.message)
  }
}

export { uploadFileToWasabi }
