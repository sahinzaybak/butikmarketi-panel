
import { Table } from 'antd';
const TableAnalysis = () => {

  const columns = [
    {
      title: 'Sıra',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: 'Ürün Adı',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Fiyat',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Kategori',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Görüntülenme',
      key: 'tags',
      dataIndex: 'tags',
    },
  ];

  const data = [
    {
      key: '1',
      order: 1,
      name: 'Erkek Oduncu Gömlek',
      age: "129.90 ₺",
      address: 'Gömlek',
      tags: 121,
    },
    {
      key: '2',
      order: 2,
      name: 'Erkek Oduncu Gömlek',
      age: "129.90 ₺",
      address: 'Gömlek',
      tags: 121,
    },
    {
      key: '2',
      order: 3,
      name: 'Erkek Oduncu Gömlek',
      age: "129.90 ₺",
      address: 'Gömlek',
      tags: 121,
    },
    {
      key: '2',
      order: 4,
      name: 'Erkek Oduncu Gömlek',
      age: "129.90 ₺",
      address: 'Gömlek',
      tags: 121,
    },
    {
      key: '2',
      order: 5,
      name: 'Erkek Oduncu Gömlek',
      age: "129.90 ₺",
      address: 'Gömlek',
      tags: 121,
    },
  ];
  return (
    <div className="analysis">
      <div className="analysis-wrp">
        <div className="row">
          <div className="col-md-6">
            <p className="analysis-chart__title mb-4">En Çok Görüntülenen 5 Ürününüz</p>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
          <div className="col-md-6">
            <p className="analysis-chart__title mb-4">En Çok Sipariş Verilen 5 Ürününüz</p>
            <Table className="green" columns={columns} dataSource={data} pagination={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableAnalysis;
