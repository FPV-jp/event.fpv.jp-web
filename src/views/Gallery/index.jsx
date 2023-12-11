import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { GET } from 'utils/Http'
import GalleryBody from './GalleryBody'
import GalleryHeader from './GalleryHeader'
import GallerySidebar from './GallerySidebar'

// import { useEffect, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { GET } from 'utils/Http'

const getAccessToken = (state) => state.auth0Reducer.accessToken

const Gallery = () => {
  const { t } = useTranslation()
  // const history = useNavigate()
  const accessToken = useSelector(getAccessToken)
  const [data, setData] = useState()

  const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const response = await GET(accessToken, '/api/apps/calendar')
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setData(data)
      } else {
        // history('/auth/error-503')
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='hk-pg-body py-0'>
      <div className={classNames('galleryapp-wrap', { 'galleryapp-sidebar-toggle': !showSidebar })}>
        <GallerySidebar />
        <div className='galleryapp-content'>
          <div className='galleryapp-detail-wrap'>
            <GalleryHeader toggleSidebar={() => setShowSidebar(!showSidebar)} showSidebar={showSidebar} />
            <GalleryBody />
          </div>
          {/* Add Category */}
          <div id='add_new_cat' className='modal fade' tabIndex={-1} role='dialog' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered modal-sm' role='document'>
              <div className='modal-content'>
                <div className='modal-body'>
                  <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>×</span>
                  </button>
                  <h6 className='text-uppercase fw-bold mb-3'>Add Category</h6>
                  <form>
                    <div className='row gx-3'>
                      <div className='col-sm-12'>
                        <div className='form-group'>
                          <input className='form-control' type='text' placeholder='Category Name' />
                        </div>
                      </div>
                    </div>
                    <button type='button' className='btn btn-primary float-end' data-bs-dismiss='modal'>
                      Add
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* /Add Category */}
        </div>
      </div>
    </div>
  )
}

export default Gallery
