import React, { useState } from "react";
import { Table, Radio, DatePicker, Space } from 'antd';
import '../../assets/scss/atoms/table.scss'
import '../../assets/scss/atoms/chart.scss'
import locale from 'antd/es/date-picker/locale/tr_TR';
import { date } from "faker/locale/zh_TW";

const AnalysisTableModal = ({ color, title, dataValues }) => {
  console.log(dataValues)
  const [selectedDate, setSelectedDate] = useState(false);
  const [tableShowCountValue, setTableShowCountValue] = useState(15);
  const { RangePicker } = DatePicker;
  const columns = [
    {
      title: 'Gün',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: 'Tarih',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Görüntülenme Sayısı',
      key: 'count',
      dataIndex: 'count',
    },
  ];

  //tabloda sadece istenilen verileri almak için gelen datayı mapledim. Tablo yapısı bu parametreler ile çalışıyor.
  const tableRow = dataValues.slice(0, tableShowCountValue).map((item, key) => {
    return {
      key: tableShowCountValue - key,
      order: tableShowCountValue - key,
      date: item.date,
      count: item.clickCount
    }
  })

  function selectedRadioValue(value) {
    setTableShowCountValue(value)
    if (value == "date_picker") setSelectedDate(true)
    else setSelectedDate(false)
  }
  return (
    <div className="analysis-table">
      <h4 className="product-operation__modal-title">{title}</h4>
      <div className="analysis-table__filter">
        <Radio.Group onChange={(e) => selectedRadioValue(e.target.value)} defaultValue="15" className="w-100">
          <Space className="d-flex justify-content-between" direction="horizantal">
            <Radio value="7">Son 7 Gün</Radio>
            <Radio value="15">Son 15 Gün</Radio>
            <Radio value="30">Son 30 Gün </Radio>
            <Radio value="date_picker">Tarih Aralığı Seçin</Radio>
          </Space>
        </Radio.Group>
        {selectedDate &&
          <RangePicker className="w-100 pt-2 pb-2 mt-3" locale={locale} />
        }
      </div>
      <Table className={color} columns={columns} dataSource={tableRow} pagination={{ pageSize: 15 }} scroll={{ y: 400 }} />
    </div>
  );
}
export default AnalysisTableModal
