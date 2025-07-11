import Spinner from './Spinner'

const ReportTable = ({ isLoadingReportData }: { isLoadingReportData: boolean }) => {
  if (isLoadingReportData) {
    return <Spinner />
  }
  return <div>L</div>
}

export default ReportTable
