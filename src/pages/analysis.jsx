import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import AnalysisTop from '../components/analysis/analysis-top'
import AnalysisCenter from '../components/analysis/analysis-center'
import TableAnalysis from '../components/analysis/table-analysis'
import AnalysisTableModal from '../components/analysis/modal-analysis-table'
import '../assets/scss/analysis.scss'

//actions
import { fetchAnalysisValues } from '../store/actions/analysis'

const Analysis = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(false);
  const [color, setColor] = useState("")
  const [title, setTitle] = useState("")

  let analysisValues = useSelector(state => state.analysis.analysisValues)
  useEffect(() => {
    dispatch(fetchAnalysisValues())
  }, []);

  return (
    <div className="wrapper analysis-page">
      <div className="wrapper-header">
        <h3>Genel Analiz</h3>
      </div>
      <div className="wrapper-main">
        <div className="wrapper-main__item">
          <AnalysisTop
            analysisValues={analysisValues}
            onClickOpenModal={(color, title) => {
              setPreview(true)
              setColor(color)
              setTitle(title)
            }} />
        </div>
        <div className="wrapper-main__item mt-4">
          <AnalysisCenter
            analysisValues={analysisValues}
            onClickOpenModal={(color, title) => {
              setPreview(true)
              setColor(color)
              setTitle(title)
            }} />
        </div>
        <div className="wrapper-main__item mt-4">
          <TableAnalysis />
        </div>
        <Modal
          visible={preview}
          footer={null}
          destroyOnClose={true}
          width={780}
          centered
          onCancel={() => { setPreview(false) }}>
          <div className="add-product__modal">
            <AnalysisTableModal color={color} title={title} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default Analysis
