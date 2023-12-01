import React from 'react'
import { Link2, MoreHorizontal } from 'react-feather'

const GalleryCaption = () => {
  return (
    <div id='caption' style={{ display: 'none' }}>
      <div className='gallery-info h-100'>
        <div data-simplebar className='nicescroll-bar'>
          <header className='gallery-header'>
            <div>
              <div className='file-name'>bruce-mars-flEG-pk6Z</div>
              <span className='fs-7'>JPG File</span>
            </div>
            <div className='gallery-options-wrap'>
              <a className='btn btn-icon btn-flush-dark btn-rounded flush-soft-hover' href='#some'>
                <span className='icon'>
                  <span className='feather-icon'>
                    <Link2 />
                  </span>
                </span>
              </a>
              <a className='btn btn-icon btn-flush-dark btn-rounded flush-soft-hover' href='#some'>
                <span className='icon'>
                  <span className='feather-icon'>
                    <MoreHorizontal />
                  </span>
                </span>
              </a>
            </div>
          </header>
          <div className='gallery-detail-body'>
            <div className='collapse-simple'>
              <div className='card'>
                <div className='card-header'>
                  <a role='button' data-bs-toggle='collapse' href='#fl_info' aria-expanded='true'>
                    Specification
                  </a>
                </div>
                <div id='fl_info' className='collapse show'>
                  <div className='card-body'>
                    <ul className='file-info'>
                      <li>
                        <span>Date Modified</span>
                        <span>20 Nov,2020</span>
                      </li>
                      <li>
                        <span>Size</span>
                        <span>15.2 GB</span>
                      </li>
                      <li>
                        <span>Created by</span>
                        <span>Morgan Freeman</span>
                      </li>
                      <li>
                        <span>Date Created</span>
                        <span>12 Nov,2020</span>
                      </li>
                      <li>
                        <span>Dimension</span>
                        <span>1920 x 1245</span>
                      </li>
                      <li>
                        <span className='text-danger'>Delete Permanently</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='separator separator-light mt-0' />
            <form>
              <div className='form-group'>
                <label className='form-label'>Add Comment</label>
                <textarea className='form-control' rows={5} defaultValue={''} />
                <small className='form-text text-muted'>Basic HTML is allowed</small>
              </div>
              <div className='d-flex align-items-center justify-content-between'>
                <button className='btn btn-primary'>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryCaption
