import AddProduct from '../components/add-product'
const Index = (props) => {
  return (
    <div className="wrapper add-product">
      <div className="wrapper-header">
        <h3>Ürün Ekle</h3>
      </div>
      <div className="wrapper-main">
        <div className="wrapper-main__item">
          <AddProduct />
        </div>
      </div>
    </div>
  );
}
export default Index
