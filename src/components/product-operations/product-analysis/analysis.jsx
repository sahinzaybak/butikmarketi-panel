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

const labels = ['Cuma', 'Cumartesi', 'Pazar', 'Pazartesi', 'Salı', 'Dün', 'Bugün'];
export const data = {
  labels,
  datasets: [
    {
      label: 'Görüntülenme',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 120 })),
      backgroundColor: '#a252db8c',
    },
  ],
};

const Analysis = ({ selectedProductCoverImage, selectedProductTitle }) => {
  return (
    <div className="product-operation__analysis">
      <div className="analysis">
        <div className="row">
          <div className="col-md-3">
            <div className="analysis-image">
              <img className="analysis-image__cover" src={selectedProductCoverImage} alt="" />
              <img src={selectedProductCoverImage} alt="" />
            </div>
          </div>
          <div className="col-md-9">
            <div className="analysis-wrp">
              <h4>{selectedProductTitle}</h4>
              <div className="d-flex">
                <div className="analysis-item">
                  <h5>T. GÖRÜNTÜLENME</h5>
                  <p>62</p>
                  <span>kez görüntülendi.</span>
                </div>
                <div className="analysis-item">
                  <h5>TOPLAM INSTAGRAM</h5>
                  <p>80</p>
                  <span>kişi ürünü inceledi.</span>
                </div>
                <div className="analysis-item">
                  <h5>TOPLAM SİPARİŞ</h5>
                  <p>0</p>
                  <span>kişi sipariş verdi.</span>
                </div>
                <div className="analysis-item">
                  <h5>TOPLAM FAVORİ</h5>
                  <p>7</p>
                  <span>kişi favorilere ekledi.</span>
                </div>

              </div>
              <p className="mt-1 analysis-info">*Yukarıdaki istatistiklere tıklayarak istatistik detaylarını görebilirsiniz.</p>
              <div className="analysis-chart mt-4">
                <p class="analysis-chart__title mb-3">Ürününüzün 7 Günlük Görüntülenme İstatistikleri</p>
                <Bar options={options} data={data} />
                <p class="analysis-chart__more purple">Daha detaylı incele</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Analysis;
