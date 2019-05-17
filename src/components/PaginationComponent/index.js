import React from 'react'
import Pagination from 'material-ui-flat-pagination'
import '../../assets/css/home.css'

const PaginationComponent = ({limit, size, offset, total, handleClick}) => {
  return (
    <div className='paginate'>
      <Pagination
        limit={limit}
        size={size}
        offset={offset}
        total={total}
        onClick={(e, offset) => handleClick(offset)}
      />
    </div>
  )
}

export default PaginationComponent
