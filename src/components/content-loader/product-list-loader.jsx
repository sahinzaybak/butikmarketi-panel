import React from 'react'
import ContentLoader from 'react-content-loader'

const ProductCardLoader = ({ ...rest }) => (
  <>
    {[...Array(5)].map((x, i) =>
      <div className="product-item" key={i}>
        <ContentLoader width="100%" height={350} viewBox="0 0 100% 350" {...rest}>
          <rect x="0" y="0" rx="6" ry="6" width="100%" height="270" />
          <rect x="0" y="290" rx="6" ry="6" width="170" height="20" />
          <rect x="0" y="320" rx="6" ry="6" width="170" height="20" />
        </ContentLoader>
      </div>
    )}
  </>
)


export default ProductCardLoader