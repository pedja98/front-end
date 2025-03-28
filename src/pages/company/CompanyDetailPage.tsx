import { Button, Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useGetCompanyQuery } from '../../app/apis/company.api'
import { getCompanyDetailLabels, transformCompanyDataIntoGridData } from '../../transformers/company'
import DetailPageGridField from '../../components/DetailPageGridField'

const CompanyDetailPage = () => {
  const companyId = Number(useParams().id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { isLoading: isGetCompanyLoading, data: company, isError, error } = useGetCompanyQuery(companyId)

  if (isGetCompanyLoading) {
    return <Spinner />
  }

  if (isError || !company) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/companies')
    return null
  }

  const detailPageCompanyGridData = transformCompanyDataIntoGridData(t, company, true)

  const labels = getCompanyDetailLabels(t)

  const handleEditRedirect = () => {
    navigate(`/index/companies/${companyId}/edit`)
  }

  return (
    <>
      <Grid sx={{ width: '100%', mt: 1, mb: 1 }}>
        <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Grid sx={{ width: '80%' }}>
            <Button onClick={handleEditRedirect} sx={{ ml: 0.5, width: '100px' }}>
              {t('general:edit')}
            </Button>
          </Grid>
        </Grid>
        <Grid sx={{ display: 'flex', mt: 1, justifyContent: 'center' }}>
          <Grid container spacing={2} sx={{ width: '80%' }}>
            {labels.map((label) => {
              const gridFieldData = detailPageCompanyGridData[label.key]
              return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default CompanyDetailPage
