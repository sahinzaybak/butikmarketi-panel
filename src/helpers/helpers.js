import { useSelector } from "react-redux";

//Ürün eklendiyse eğer..
export const IsAddedProduct = () => {
  let addedProductInfo = useSelector((state) => state.addProduct.addedProduct);
  if (addedProductInfo.status == 200) return true;
};

//Giriş yapıldı mı?
export const IsLogin = () => {
  let authInfo = useSelector((state) => state.auth.authInfo);
  if (authInfo != "") return authInfo.data.status == 200 ? true : false;
};
