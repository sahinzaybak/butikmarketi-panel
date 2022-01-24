import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { totalCounts } from '../../helpers/analysisCount'

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


const AnalysisCenter = ({ onClickOpenModal, analysisValues }) => {
  const whatsappLabels = [];
  const whatsappAllClicksValue = []
  const whatsappClicksValue = []
  const instagramLabels = [];
  const instagramAllClicksValue = []
  const instagramClicksValue = []

  if (analysisValues != "") {
    
    // 7 Günlük Whatsapp Soru Sorma İstatistikleri >
    analysisValues.products.data.forEach(attribute => { // Tüm whatsapp click verilerimi aldım.
      attribute.attributes.whatsappClicks.forEach(element => {
        whatsappAllClicksValue.push(element)
      });
    });
    let reverseWhatsappClicks = whatsappAllClicksValue.reverse().slice(0, 7).reverse() //click verilerini ters çevir ve ilk 7 veriyi al.
    reverseWhatsappClicks.forEach(element => {
      whatsappClicksValue.push(element.clickCount)
      let date = new Date(element.date)
      whatsappLabels.push(date.toLocaleString('tr-TR', { weekday: 'long' }))
    });
    // 7 Günlük Whatsapp Soru Sorma İstatistikleri />

    // 7 Günlük Instagram Görüntülenme İstatistikleri >
    analysisValues.products.data.forEach(attribute => { // Tüm instagram click verilerimi aldım.
      attribute.attributes.instagramClicks.forEach(element => {
        instagramAllClicksValue.push(element)
      });
    });
    let reverseInstagramClicks = instagramAllClicksValue.reverse().slice(0, 7).reverse() //click verilerini ters çevir ve ilk 7 veriyi al.
    reverseInstagramClicks.forEach(element => {
      instagramClicksValue.push(element.clickCount)
      let date = new Date(element.date)
      instagramLabels.push(date.toLocaleString('tr-TR', { weekday: 'long' }))
    });
    // 7 Günlük Instagram Görüntülenme İstatistikleri  />
  }

  const whatsappClicksDatas = {
    labels: whatsappLabels,
    datasets: [
      {
        label: 'Günlük Whatsapp Tıklama',
        data: whatsappClicksValue,
        backgroundColor: '#76af3770',
      },
    ],
  };
  const instagramClicksDatas = {
    labels: instagramLabels,
    datasets: [
      {
        label: 'Günlük Instagram Görüntülenme',
        data: instagramClicksValue,
        backgroundColor: '#c13c7ca8',
      },
    ],
  };
  //7 Günlük Whatsapp Soru Sorma İstatistikleri />

  return (
    <div className="analysis">
      {analysisValues != "" &&
        <div className="analysis-wrp">
          <div className="row">
            <div className="col-md-4 analysis-box">
              <div className="analysis-item second">
                <h5 className="analysis-item__title">TOPLAM WHATSAPP SORU</h5>
                <p className="analysis-item__count">{totalCounts("whatsappClicks", analysisValues)}</p>
                <span className="analysis-item__desc">kez whatsapp tıklandı.</span>
              </div>
            </div>
            <div className="col-md-4 analysis-box">
              <div className="analysis-item second">
                <h5 className="analysis-item__title">TOPLAM INSTAGRAM GÖRÜNTÜLENME</h5>
                <p className="analysis-item__count">{totalCounts("instagramClicks", analysisValues)}</p>
                <span className="analysis-item__desc">kez sayfanız görünlendi.</span>
              </div>
            </div>
            <div className="col-md-4 analysis-box">
              <div className="analysis-item second">
                <h5 className="analysis-item__title">TOPLAM KAZANCINIZ</h5>
                <p className="analysis-item__count">0 ₺</p>
                <span className="analysis-item__desc">kazancınız var.</span>
              </div>
            </div>
          </div>
          <div className="analysis-chart mt-5">
            <div className="row">
              <div className="col-md-6">
                <div className="analysis-chart__item">
                  <p className="analysis-chart__title  mb-3">7 Günlük Whatsapp Soru Sorma İstatistikleri</p>
                  <Bar options={options} data={whatsappClicksDatas} />
                  <p className="analysis-chart__more light-green" onClick={() => { onClickOpenModal("light-green", "Günlük Whatsapp Soru Sayısı Detaylı Bilgi") }}>Daha detaylı incele</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="analysis-chart__item">
                  <p className="analysis-chart__title  mb-3">7 Günlük Instagram Görüntülenme İstatistikleri</p>
                  <Bar options={options} data={instagramClicksDatas} />
                  <p className="analysis-chart__more orange" onClick={() => { onClickOpenModal("orange", "Günlük Kazancınız Detaylı Bilgi") }}>Daha detaylı incele</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default AnalysisCenter;
