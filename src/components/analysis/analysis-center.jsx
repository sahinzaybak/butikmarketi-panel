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
      label: 'Günlük Whatsapp Tıklama',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 120 })),
      backgroundColor: '#76af3770',
    },
  ],
};
export const data2 = {
  labels,
  datasets: [
    {
      label: 'Günlük Instagram Görüntülenme',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 400 })),
      backgroundColor: '#c13c7ca8',
    },
  ],
};
const AnalysisCenter = ({ onClickOpenModal }) => {
  return (
    <div className="analysis">
      <div className="analysis-wrp">
        <div className="row">
          <div className="col-md-4 analysis-box">
            <div className="analysis-item second">
              <h5 className="analysis-item__title">TOPLAM WHATSAPP SORU</h5>
              <p className="analysis-item__count">45</p>
              <span className="analysis-item__desc">kez whatsapp tıklandı.</span>
            </div>
          </div>
          <div className="col-md-4 analysis-box">
            <div className="analysis-item second">
              <h5 className="analysis-item__title">TOPLAM INSTAGRAM GÖRÜNTÜLENME</h5>
              <p className="analysis-item__count">92</p>
              <span className="analysis-item__desc">kez sayfanız görünlendi.</span>
            </div>
          </div>
          <div className="col-md-4 analysis-box">
            <div className="analysis-item second">
              <h5 className="analysis-item__title">TOPLAM KAZANCINIZ</h5>
              <p className="analysis-item__count">458 ₺</p>
              <span className="analysis-item__desc">kazancınız var.</span>
            </div>
          </div>
        </div>
        <div className="analysis-chart mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="analysis-chart__item">
                <p className="analysis-chart__title  mb-3">7 Günlük Whatsapp Soru Sorma İstatistikleri</p>
                <Bar options={options} data={data} />
                <p className="analysis-chart__more light-green" onClick={() => { onClickOpenModal("light-green", "Günlük Whatsapp Soru Sayısı Detaylı Bilgi") }}>Daha detaylı incele</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="analysis-chart__item">
                <p className="analysis-chart__title  mb-3">7 Günlük Instagram Görüntülenme İstatistikleri</p>
                <Bar options={options} data={data2} />
                <p className="analysis-chart__more orange" onClick={() => { onClickOpenModal("orange", "Günlük Kazancınız Detaylı Bilgi") }}>Daha detaylı incele</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCenter;
