
import { Radio, Space } from "antd";
const RadioGroup = (props) => {
  return (
    <Radio.Group onChange={(e) => props.onChangeCategory(e)} {...props}>
      <Space direction="vertical">
        {props.categoryList != "" && props.categoryList.categories.map((mainCategory, index) => (
          <>
            {mainCategory.slug.includes("ayakkabi-canta") || mainCategory.slug.includes("saat-aksesuar") ? ""
              :
              <>
                {props.catGrupName == "cat" ?
                  <Radio value={mainCategory.slug} defaultValue={mainCategory.filter_title} key={index}>{mainCategory.title}</Radio>
                  :
                  <Radio value={mainCategory.slug} defaultValue={mainCategory.title} key={index}>{mainCategory.title}</Radio>
                }
              </>
            }
          </>
        ))}
        <p>(Diğer kategorilere otomatik atama yapılır.)</p>
      </Space>
    </Radio.Group>
  );
};

export default RadioGroup;
