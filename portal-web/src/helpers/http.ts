/* eslint-disable no-restricted-syntax */
import fetchStream from "fetch-readablestream"

function readAllChunks(readableStream, handleAudioCallBack) {
  const reader = readableStream.getReader()
  const chunks = [] as any[]

  function pump() {
    return reader.read().then(({ value, done }) => {
      if (done) {
        return chunks
      }
      handleAudioCallBack([...chunks, value])
      chunks.push(value)
      return pump()
    })
  }

  return pump()
}

interface recordingFileProps {
  url: string
  userToken: string
  acceptHeader: string
  handleAudioCallBack?: (chunks: any) => void
  options?: any
}

export const downloadRecordingFile = async (params: recordingFileProps) => {
  const { url, userToken, acceptHeader, options } = params

  return downloadBlobFile({
    url,
    options: {
      headers: {
        ...(options && options.headers ? options.headers : {}),
        Authorization: `Bearer ${userToken}` || "",
        Accept: acceptHeader,
      },
      ...options,
    },
  })
}

const downloadBlobFile = async ({ url, options }) => {
  let response
  try {
    response = await fetch(url, options)

    const blob = await response.blob()
    return blob
  } catch (error) {
    return {
      error: `Failed to download file: ${error.message}`,
      message: "",
    }
  }
}

export const getFileStream = async (params: recordingFileProps) => {
  const { url, userToken, acceptHeader, handleAudioCallBack, options } = params

  const response = await fetchStream(url, {
    headers: {
      ...(options && options.headers ? options.headers : {}),
      Authorization: `Bearer ${userToken}` || "",
      Accept: acceptHeader,
    },
    ...options,
  })

  await readAllChunks(response.body, handleAudioCallBack)
}

interface inputSoundFileProps {
  tag: string
  description: string
  file: any
  url: string
  userToken: string
  options?: any
}

export const uploadSoundFile = async (fileWithProps: inputSoundFileProps) => {
  const { tag, description, file, url, options, userToken } = fileWithProps

  let response

  try {
    response = await fetch(url, {
      method: "POST",
      body: file,
      headers: {
        ...(options && options.headers ? options.headers : {}),
        Authorization: `Bearer ${userToken}` || "",
        ...(description && { "X-Sound-Description": description }),
        ...(tag && { "X-Sound-Tag": tag }),
        "Content-Type": "audio/wav",
      },
    })

    const jsonResult = await response.json()

    if (jsonResult.id) {
      return {
        error: "",
        message: `Sound file is created with id ${jsonResult.id}`,
      }
    }

    if (jsonResult.error) {
      return {
        error: `${jsonResult.error.code}:${jsonResult.error.description}`,
        message: "",
      }
    }

    return jsonResult
  } catch (error) {
    return {
      error: `Failed to upload the audio with error: ${error.message}`,
      message: "",
    }
  }
}

export const updateSoundFile = async (fileWithProps: inputSoundFileProps) => {
  const { tag, description, file, url, options, userToken } = fileWithProps

  let response

  try {
    response = await fetch(url, {
      method: "PATCH",
      body: file,
      headers: {
        ...(options && options.headers ? options.headers : {}),
        Authorization: `Bearer ${userToken}` || "",
        ...(description && { "X-Sound-Description": description }),
        ...(tag && { "X-Sound-Tag": tag }),
        "Content-Type": "audio/mpeg",
      },
    })

    if (response.status === 204) {
      return {
        error: "",
        message: "Sound file is updated",
      }
    }

    return {
      error: "File couldn't be updated",
      message: "",
    }
  } catch (error) {
    return {
      error: `Failed to update the sound with error: ${error.message}`,
      message: "",
    }
  }
}

type deleteSoundFileProps = Pick<
  inputSoundFileProps,
  "url" | "userToken" | "options"
>

export const deleteSoundFile = async (fileWithProps: deleteSoundFileProps) => {
  const { url, options, userToken } = fileWithProps

  let response

  try {
    response = await fetch(url, {
      method: "DELETE",
      headers: {
        ...(options && options.headers ? options.headers : {}),
        Authorization: `Bearer ${userToken}` || "",
        "Content-Type": "audio/wav",
      },
    })

    if (response.status === 204) {
      return {
        error: "",
        message: "Sound file is deleted",
      }
    }

    return {
      error: "File couldn't be deleted",
      message: "",
    }
  } catch (error) {
    return {
      error: `Failed to delete the sound with error: ${error.message}`,
      message: "",
    }
  }
}

type downLoadSoundFileProps = Pick<
  inputSoundFileProps,
  "url" | "userToken" | "options"
>

export const downloadSoundFile = async ({
  url,
  userToken,
  options,
}: downLoadSoundFileProps) => {
  return downloadBlobFile({
    url,
    options: {
      headers: {
        ...(options && options.headers ? options.headers : {}),
        Authorization: `Bearer ${userToken}` || "",
        Accept: "audio/wav",
      },
      ...options,
    },
  })
}
