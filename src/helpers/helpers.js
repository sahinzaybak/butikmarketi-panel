import { useSelector } from "react-redux";

export const IsAddedProduct = () => {
  //Ürün eklendiyse eğer..
  let addedProductInfo = useSelector((state) => state.addProduct.addedProduct);
  if (addedProductInfo.status == 200) return true;
};
