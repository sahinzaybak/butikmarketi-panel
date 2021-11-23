import ProductOperations from '../components/product-operations'
const Index = () => {
  return (
    <div className="wrapper add-product">
      <div className="wrapper-header">
        <h3>Ürün İşlemleri</h3>
      </div>
      <div className="wrapper-main">
        <div className="wrapper-main__item">
          <ProductOperations />
        </div>
      </div>
    </div>
  );
}
export default Index
