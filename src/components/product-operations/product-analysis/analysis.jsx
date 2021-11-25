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
const labels = ['18/08', '19/08', '20/08', '21/08', '22/08', 'Dün', 'Bugün'];

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
    <div className="add-product__analysis">
      <div className="analysis">
        <div className="row">
          <div className="col-md-4">
            <div className="analysis-image">
              <img src={selectedProductCoverImage} alt="" />
            </div>
          </div>
          <div className="col-md-8">
            <div className="analysis-wrp">
              <h4>{selectedProductTitle}</h4>
              <div className="d-flex">
                <div className="analysis-item">
                  <h5>GÖRÜNTÜLENME</h5>
                  <p>62</p>
                  <span>kez görüntülendi.</span>
                </div>
                <div className="analysis-item">
                  <h5>FAVORİ</h5>
                  <p>7</p>
                  <span>kişi favorisine ekledi.</span>
                </div>
                <div className="analysis-item">
                  <h5>SİPARİŞ</h5>
                  <p>0</p>
                  <span>kişi sipariş verdi.</span>
                </div>
              </div>
              <div className="analysis-chart mt-4">
                <Bar options={options} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Analysis;
