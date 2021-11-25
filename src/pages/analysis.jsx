import '../assets/scss/analysis.scss'
import AnalysisComp from '../components/analysis'
const Analysis = () => {
  return (
    <div className="wrapper analysis-page">
      <div className="wrapper-header">
        <h3>Analiz</h3>
      </div>
      <div className="wrapper-main">
        <div className="wrapper-main__item">
         <AnalysisComp />
        </div>
      </div>
    </div>
  );
}
export default Analysis
