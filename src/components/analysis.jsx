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
      label: 'Mağaza Görüntülenme',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 120 })),
      backgroundColor: '#a252db8c',
    },
  ],
};
export const data2 = {
  labels,
  datasets: [
    {
      label: 'Sipariş Sayısı',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: '#7dc73a94',
    },
  ],
};
const AnalysisComp = () => {
  return (
    <div className="analysis">
      <div className="analysis-wrp">
        <div className="row">
          <div className="col-md-3 analysis-box">
            <div className="analysis-item">
              <h5>TOPLAM MAĞAZA GÖRÜNTÜLENME</h5>
              <p>172</p>
              <span>kez görüntülendi.</span>
            </div>
          </div>
          <div className="col-md-3 analysis-box">
            <div className="analysis-item">
              <h5>TOPLAM INSTAGRAM ZİYARET</h5>
              <p>16</p>
              <span>kez sayfanız görüntülendi.</span>
            </div>
            
          </div>
          <div className="col-md-3 analysis-box">
            <div className="analysis-item">
              <h5>TOPLAM ÜRÜN SAYINIZ</h5>
              <p>12</p>
              <span>adet ürününüz yayında.</span>
            </div>
          </div>
          <div className="col-md-3 analysis-box">
            <div className="analysis-item">
              <h5>TOPLAM SİPARİŞ SAYINIZ</h5>
              <p>18</p>
              <span>kez sipariş aldınız.</span>
            </div>
          </div>
        </div>
        <div className="analysis-chart mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="analysis-chart__item">
                <p className="mb-3">7 Günlük Mağaza Profil Sayfanızın Görüntülenme İstatistikleri</p>
                <Bar options={options} data={data} />
              </div>

            </div>
            <div className="col-md-6">
              <div className="analysis-chart__item">
                <p className="mb-3">7 Günlük Sipariş Sayısı İstatistikleri</p>
                <Bar options={options} data={data2} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalysisComp;