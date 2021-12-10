import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
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
const labels = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Dün', 'Bugün'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Günlük Mağaza Görüntülenme',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 120 })),
      backgroundColor: '#a252db8c',
    },
  ],
};
export const data2 = {
  labels,
  datasets: [
    {
      label: 'Günlük Sipariş Sayısı',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: '#7dc73a94',
    },
  ],
};
const AnalysisTop = ({ onClickOpenModal }) => {
  return (
    <div className="analysis">
      <div className="analysis-wrp">
        <div className="row">
          <div className="col-md-3 analysis-box">
            <div className="analysis-item">
              <h5 className="analysis-item__title">TOPLAM MAĞAZA ZİYARET</h5>
              <p className="analysis-item__count">172</p>
              <span className="analysis-item__desc">kez profiliniz görüntülendi.</span>
            </div>
          </div>
          <div className="col-md-3 analysis-box">
            <div className="analysis-item">
              <h5 className="analysis-item__title">TOPLAM ÜRÜN GÖRÜNRÜLEME</h5>
              <p className="analysis-item__count">265</p>
              <span className="analysis-item__desc">kez ürünleriniz görüntülendi.</span>
            </div>
          </div>
          <div className="col-md-3 analysis-box">
            <div className="analysis-item">
              <h5 className="analysis-item__title">TOPLAM ÜRÜN SAYINIZ</h5>
              <p className="analysis-item__count">12</p>
              <span className="analysis-item__desc">adet ürününüz yayında.</span>
            </div>
          </div>
          <div className="col-md-3 analysis-box">
            <div className="analysis-item">
              <h5 className="analysis-item__title">TOPLAM SİPARİŞ SAYINIZ</h5>
              <p className="analysis-item__count">18</p>
              <span className="analysis-item__desc">kez sipariş aldınız.</span>
            </div>
          </div>
        </div>
        <div className="analysis-chart mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="analysis-chart__item">
                <p className="analysis-chart__title mb-3">7 Günlük Mağaza Profil Sayfanızın Görüntülenme İstatistikleri</p>
                <Bar options={options} data={data} />
                <p className="analysis-chart__more purple" onClick={() => { onClickOpenModal("defaultColor", "Mağaza Profil Sayfası Görüntülenme Detaylı Bilgi") }}>Daha detaylı incele</p>
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
    </div>
  );
};

export default AnalysisTop;
