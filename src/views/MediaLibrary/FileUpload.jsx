import '@/assets/scss/FileUpload.scss'
import { FileTemplate, ImageTemplate, VideoTemplate } from '@/views/MediaLibrary/Template'
import { useMutation } from '@apollo/client'
import { Dialog, Transition } from '@headlessui/react'
import PropTypes from 'prop-types'
import { Fragment, useRef, useState } from 'react'

import { CREATE_MEDIA_LIBRARY_MUTATION } from '@/queries/MediaLibrary'
import { upload } from '@/views/MediaLibrary/FileUploadSupport'
import { useAuth0 } from '@auth0/auth0-react'

import { Loading } from '@/assets/Loading'

FileUploadForm.propTypes = {
  setOpenFileUpload: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
}

export function FileUploadForm({ setOpenFileUpload, loading, refetch }) {
  const [isDraggedOver, setIsDraggedOver] = useState(false)
  const [counter, setCounter] = useState(0)

  function dropHandler(event) {
    event.preventDefault()
    setIsDraggedOver(false)
    setCounter(0)
    const droppedFiles = event.dataTransfer.files
    for (const file of droppedFiles) {
      addFile(file)
    }
  }

  function dragOverHandler(event) {
    event.preventDefault()
  }

  function dragLeaveHandler(event) {
    event.preventDefault()
    if (1 > counter - 1) {
      setIsDraggedOver(false)
    } else {
      setCounter(counter - 1)
    }
  }

  function dragEnterHandler(event) {
    event.preventDefault()
    setIsDraggedOver(true)
    setCounter(1 + counter)
  }

  const [files, setFiles] = useState({})

  function addFile(file) {
    const newFiles = { ...files }
    console.log(file)
    const objectURL = URL.createObjectURL(file)
    newFiles[objectURL] = file
    setFiles(newFiles)
  }

  function fileInputChange(event) {
    const selectedFiles = event.target.files
    for (const file of selectedFiles) {
      addFile(file)
    }
  }

  function deleteFile(objectURL) {
    const newFiles = { ...files }
    const keys = Object.keys(newFiles)
    for (const key of keys) {
      if (newFiles[key] === objectURL) {
        delete newFiles[key]
        break
      }
    }
    setFiles(newFiles)
  }

  const [uploading, setUploading] = useState(false)
  const { getIdTokenClaims } = useAuth0()
  const [createMediaLibrary] = useMutation(CREATE_MEDIA_LIBRARY_MUTATION)
  async function submit(event) {
    event.preventDefault()

    setUploading(true)
    await upload((await getIdTokenClaims()).__raw, files, createMediaLibrary)
    refetch()
    setOpenFileUpload(false)
    setUploading(false)
  }

  return (
    // <div className='h-screen w-screen bg-gray-500 sm:px-8 sm:py-8 md:px-16'>
    <>
      {loading || uploading ? (
        <Loading />
      ) : (
        <form action='#' method='POST' onSubmit={submit} className='container mx-auto h-full max-w-screen-lg'>
          <article aria-label='File Upload Modal' className='relative flex h-full flex-col rounded-md bg-white shadow-xl' onDrop={dropHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDragEnter={dragEnterHandler}>
            <div id='overlay' className={`pointer-events-none absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center rounded-md ${isDraggedOver ? 'draggedover' : ''}`}>
              <i>
                <svg className='mb-3 h-12 w-12 fill-current text-blue-700' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                  <path d='M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z' />
                </svg>
              </i>
              <p className='text-lg text-blue-700'>Drop files to upload</p>
            </div>
            <section className='flex h-full w-full flex-col overflow-auto p-8'>
              <header className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 py-12'>
                <p className='mb-3 flex flex-wrap justify-center font-semibold text-gray-900'>
                  <span>ファイルをここにドラッグ & ドロップするか</span>
                </p>
                <input id='file-input' type='file' multiple className='hidden' onChange={fileInputChange} />
                <button id='button' type='button' className='focus:shadow-outline mt-2 rounded-md bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-300 focus:outline-none' onClick={() => document.getElementById('file-input').click()}>
                  ファイルを選択する
                </button>
              </header>

              <h1 className='pb-3 pt-8 font-semibold text-gray-900 sm:text-lg'>アップロードファイル</h1>

              <ul id='gallery' className='-m-1 flex flex-1 flex-wrap'>
                {Object.keys(files).length === 0 ? (
                  <li className='flex h-full w-full flex-col items-center justify-center text-center'>
                    <img className='mx-auto w-32' src='https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png' alt='no data' />
                    <span className='text-small text-gray-500'>選択されたファイルがありません</span>
                  </li>
                ) : (
                  Object.keys(files).map((objectURL) => (
                    <li key={objectURL} className='xl:w-1/8 block h-24 w-1/2 p-1 sm:w-1/3 md:w-1/4 lg:w-1/6'>
                      {files[objectURL].type.match('video.*') ? <VideoTemplate objectURL={files[objectURL]} deleteFile={deleteFile} /> : files[objectURL].type.match('image.*') ? <ImageTemplate objectURL={files[objectURL]} deleteFile={deleteFile} /> : <FileTemplate objectURL={files[objectURL]} deleteFile={deleteFile} />}
                    </li>
                  ))
                )}
              </ul>
            </section>

            <footer className='px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                type='submit'
                disabled={Object.keys(files).length === 0}
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm 
             ${Object.keys(files).length === 0 ? 'cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-indigo-600 text-white hover:bg-indigo-500'} 
             sm:ml-3 sm:w-auto`}
              >
                アップロード
              </button>
              <button
                type='button'
                className='mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mt-0 sm:w-auto'
                onClick={() => {
                  setOpenFileUpload(false)
                  setFiles({})
                }}
              >
                キャンセル
              </button>
            </footer>
          </article>
        </form>
      )}
    </>
  )
}

FileUpload.propTypes = {
  children: PropTypes.node.isRequired,
  openFileUpload: PropTypes.bool.isRequired,
  setOpenFileUpload: PropTypes.func.isRequired,
}

export default function FileUpload({ children, openFileUpload, setOpenFileUpload }) {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={openFileUpload} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpenFileUpload}>
        <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl'>{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
