import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { butikClickTotalCount, totalCounts, crop } from '../../helpers/analysisCount'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    }
  },
};

const AnalysisTop = ({ onClickOpenModal, analysisValues }) => {
  // 7 Günlük Mağaza Profi Sayfası Görüntülenme >
  const labels = [];
  const butikVieswDatas = []
  if (analysisValues != "") {
    const reverseClicks = analysisValues.clicks.reverse().slice(0, 7).reverse() //click verilerini ters çevir ve ilk 7 veriyi al.
    reverseClicks.forEach(value => {
      butikVieswDatas.push(value.clickCount)
      let date = new Date(value.date)
      labels.push(date.toLocaleString('tr-TR', {  weekday: 'long' }))
    });
  }
  const butikProfileDatas = {
    labels,
    datasets: [
      {
        label: 'Günlük Mağaza Görüntülenme',
        data: butikVieswDatas,
        backgroundColor: '#a252db8c',
      },
    ],
  };
 // 7 Günlük Mağaza Profi Sayfası Görüntülenme />


 const data2 = {
  labels,
  datasets: [
    {
      label: 'Günlük Sipariş Sayısı',
      data: [15,20],
      backgroundColor: '#7dc73a94',
    },
  ],
};


  return (
    <div className="analysis">
      {analysisValues != "" &&
        <div className="analysis-wrp">
          <div className="row">
            <div className="col-md-3 analysis-box">
              <div className="analysis-item">
                <h5 className="analysis-item__title">TOPLAM MAĞAZA ZİYARET</h5>
                <p className="analysis-item__count">{butikClickTotalCount(analysisValues)}</p>
                <span className="analysis-item__desc">kez profiliniz görüntülendi.</span>
              </div>
            </div>
            <div className="col-md-3 analysis-box">
              <div className="analysis-item">
                <h5 className="analysis-item__title">TOPLAM ÜRÜN GÖRÜNRÜLEME</h5>
                <p className="analysis-item__count">{totalCounts("clicks", analysisValues)}</p>
                <span className="analysis-item__desc">kez ürünleriniz görüntülendi.</span>
              </div>
            </div>
            <div className="col-md-3 analysis-box">
              <div className="analysis-item">
                <h5 className="analysis-item__title">TOPLAM ÜRÜN SAYINIZ</h5>
                <p className="analysis-item__count">{analysisValues.products.data.length}</p>
                <span className="analysis-item__desc">adet ürününüz yayında.</span>
              </div>
            </div>
            <div className="col-md-3 analysis-box">
              <div className="analysis-item">
                <h5 className="analysis-item__title">TOPLAM SİPARİŞ SAYINIZ</h5>
                <p className="analysis-item__count">0</p>
                <span className="analysis-item__desc">kez sipariş aldınız.</span>
              </div>
            </div>
          </div>
          <div className="analysis-chart mt-5">
            <div className="row">
              <div className="col-md-6">
                <div className="analysis-chart__item">
                  <p className="analysis-chart__title mb-3">7 Günlük Mağaza Profil Sayfanızın Görüntülenme İstatistikleri</p>
                  <Bar options={options} data={butikProfileDatas} />
                  <p className="analysis-chart__more purple" onClick={() => { onClickOpenModal("defaultColor", "Mağaza Profil Sayfası Görüntülenme Detaylı Bilgi", analysisValues.clicks.reverse()) }}>Daha detaylı incele</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="analysis-chart__item">
                  <p className="analysis-chart__title mb-3">7 Günlük Sipariş Sayısı İstatistikleri</p>
                  <Bar options={options} data={data2} />
                  <p className="analysis-chart__more green" onClick={() => { onClickOpenModal("green", "Günlük Sipariş Sayısı Detaylı Bilgi") }}>Daha detaylı incele</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default AnalysisTop;
