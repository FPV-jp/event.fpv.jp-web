import { Loading } from '@/assets/Loading'
import { ALL_FLIGHT_POINTS_QUERY } from '@/queries/FlightPoint'
import { downloadFileFromWasabi, downloadFilesFromWasabi } from '@/utils/WasabiDownloader'
import PointForm, { PointFormInput } from '@/views/FlightPointMap/PointForm'
import PointInfo from '@/views/FlightPointMap/PointInfo'
import { useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { PencilSquareIcon } from '@heroicons/react/20/solid'
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'

export default function FlightPointMap() {
  const { getIdTokenClaims } = useAuth0()

  const [selectMarker, setSelectMarker] = useState(null)
  const [selectMarkerImage, setSelectMarkerImage] = useState(null)

  const [openPointForm, setOpenPointForm] = useState(false)
  const [thumbnailImages, setThumbnailImages] = useState(null)

  const [editMode, setEditMode] = useState(false)
  const [selectPoint, setSelectPoint] = useState(null)

  const { loading, error, data, refetch } = useQuery(ALL_FLIGHT_POINTS_QUERY)

  useEffect(() => {
    async function getThumbnailImages() {
      const images = await downloadFilesFromWasabi(
        (await getIdTokenClaims()).__raw,
        import.meta.env.VITE_WASABI_BUCKET,
        data?.allFlightPoints.map((m) => m.marker_image),
        true,
      )
      setThumbnailImages(images)
    }
    if (!loading && !error) getThumbnailImages()
  }, [data, loading, error, getIdTokenClaims])

  if (loading || !thumbnailImages) return <Loading />
  if (error) return <div>Error: {error.message}</div>

  function thumbnail(flightPoint) {
    const thumbnail = thumbnailImages.find((t) => t.wasabi_file_key === flightPoint.marker_image)
    if (!thumbnail || !thumbnail.fileBlob) return <QuestionMarkCircleIcon />
    const imgOption = { width: 50, height: 50, display: 'block', border: 'none', borderRadius: '50%', cursor: 'pointer', padding: 0 }
    const imgUrl = URL.createObjectURL(thumbnail.fileBlob)
    return <img style={imgOption} src={imgUrl} alt={flightPoint.title} />
  }

  function editAction() {
    setEditMode(!editMode)
    editMode && setSelectPoint(null)
  }

  return (
    <div className='bg-white px-4 lg:px-0'>
      <div className='lg:flex lg:items-center lg:justify-between'>
        <PointInfo editMode={editMode} selectMarker={selectMarker} />
        <div className='mt-3 flex lg:ml-4 lg:mt-0'>
          <span className='sm:ml-3'>
            <button type='button' className={`inline-flex items-center rounded-md bg-${editMode ? 'red' : 'indigo'}-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-${editMode ? 'red' : 'indigo'}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${editMode ? 'red' : 'indigo'}-600`} onClick={() => editAction()}>
              {editMode ? (
                <>
                  <XMarkIcon className='-ml-0.5 mr-1.5 h-5 w-5 text-white' aria-hidden='true' />
                  キャンセル
                </>
              ) : (
                <>
                  <PencilSquareIcon className='-ml-0.5 mr-1.5 h-5 w-5 text-white' aria-hidden='true' />
                  新しいマーカーを登録
                </>
              )}
            </button>
          </span>
        </div>
      </div>

      <div className='mx-auto max-w-7xl py-3'>
        <Map
          initialViewState={{
            latitude: 35.7030639,
            longitude: 139.7690916,
            zoom: 16,
          }}
          style={{ width: '100%', height: '80vh' }}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          // mapStyle='mapbox://styles/mapbox/satellite-v11'
          // mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          mapboxAccessToken='pk.eyJ1IjoicmVsaWNzOSIsImEiOiJjbHMzNHlwbDIwNDczMmtvM2xhNWR0ZzVtIn0.whCzeh6XW7ju4Ja6DR0imw'
          onClick={(event) => {
            // setSelectMarker(null)
            editMode &&
              setSelectPoint({
                latitude: event.lngLat.lat,
                longitude: event.lngLat.lng,
              })
          }}
        >
          {!editMode &&
            data?.allFlightPoints.map((flightPoint) => {
              return (
                <Marker
                  key={flightPoint.id}
                  latitude={flightPoint.latitude}
                  longitude={flightPoint.longitude}
                  onClick={async () => {
                    setSelectMarkerImage(null)
                    setSelectMarker(flightPoint)
                    const target = await downloadFileFromWasabi((await getIdTokenClaims()).__raw, import.meta.env.VITE_WASABI_BUCKET, flightPoint.marker_image, false)
                    setSelectMarkerImage(target.fileBlob)
                  }}
                >
                  {thumbnail(flightPoint)}
                </Marker>
              )
            })}

          {!editMode && selectMarker && (
            <Popup latitude={selectMarker.latitude} longitude={selectMarker.longitude} closeButton={true} closeOnClick={false} onClose={() => setSelectMarker(null)}>
              {selectMarkerImage ? <img src={URL.createObjectURL(selectMarkerImage)} alt={selectMarker.create_user} /> : <div>Loading...</div>}
            </Popup>
          )}

          {editMode && selectPoint && (
            <Popup latitude={selectPoint.latitude} longitude={selectPoint.longitude} closeButton={false} closeOnClick={false} onClose={() => setSelectPoint(null)}>
              <button type='button' onClick={() => setOpenPointForm(true)} className='rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                ここに追加
              </button>
            </Popup>
          )}
        </Map>
      </div>

      <PointForm openPointForm={openPointForm} setOpenPointForm={setOpenPointForm}>
        <PointFormInput //
          setThumbnailImages={setThumbnailImages}
          setEditMode={setEditMode}
          setOpenPointForm={setOpenPointForm}
          selectPoint={selectPoint}
          setSelectPoint={setSelectPoint}
          refetch={refetch}
        />
      </PointForm>
    </div>
  )
}
