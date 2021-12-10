import React, { useState } from "react";
import { Table, Radio, DatePicker, Space } from 'antd';
import '../../assets/scss/atoms/table.scss'
import '../../assets/scss/atoms/chart.scss'
import locale from 'antd/es/date-picker/locale/tr_TR';

const AnalysisTableModal = ({ color, title }) => {
  const [selectedDate, setSelectedDate] = useState(false);
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

  const data = [
    {
      key: '1',
      order: 1,
      date: "11.09.2021",
      count: 12,
    },
    {
      key: '2',
      order: 2,
      date: "12.09.2021",
      count: 46,
    },
    {
      key: '3',
      order: 3,
      date: "13.09.2021",
      count: 67,
    },
    {
      key: '4',
      order: 4,
      date: "14.09.2021",
      count: 84,
    },
    {
      key: '5',
      order: 5,
      date: "16.09.2021",
      count: 95,
    },
    {
      key: '6',
      order: 6,
      date: "11.09.2021",
      count: 12,
    },
    {
      key: '7',
      order: 7,
      date: "12.09.2021",
      count: 46,
    },
    {
      key: '8',
      order: 8,
      date: "13.09.2021",
      count: 67,
    },
    {
      key: '9',
      order: 9,
      date: "14.09.2021",
      count: 84,
    },
    {
      key: '10',
      order: 10,
      date: "16.09.2021",
      count: 95,
    },
    {
      key: '11',
      order: 11,
      date: "11.09.2021",
      count: 12,
    },
    {
      key: '12',
      order: 12,
      date: "12.09.2021",
      count: 46,
    },
    {
      key: '13',
      order: 13,
      date: "13.09.2021",
      count: 67,
    },
    {
      key: '14',
      order: 14,
      date: "14.09.2021",
      count: 84,
    },
    {
      key: '15',
      order: 15,
      date: "16.09.2021",
      count: 95,
    },
  ];

  function selectedRadioValue(value) {
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
      <Table className={color} columns={columns} dataSource={data} pagination={{ pageSize: 15 }} scroll={{ y: 400 }} />
    </div>
  );
}
export default AnalysisTableModal
