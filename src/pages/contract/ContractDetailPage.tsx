import { Button, Grid } from '@mui/material'
import DetailPageGridField from '../../components/DetailPageGridField'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useGetContractByIdQuery } from '../../app/apis/crm/contract.api'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { getContractLabels, transformContractDataIntoGridData } from '../../transformers/contract'

const ContractDetailPage = () => {
  const contractId = useParams().id as string
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { isLoading: isGetContractLoading, data: contract, isError, error } = useGetContractByIdQuery(contractId)

  if (isGetContractLoading) {
    return <Spinner />
  }

  if (isError || !contract) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/offers')
    return null
  }

  const detailPageOfferGridData = transformContractDataIntoGridData(t, contract, true)
  const labels = getContractLabels(t)

  const handleEditRedirect = () => {
    navigate(`/index/offers/${contractId}/edit`)
  }

  return (
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
            const gridFieldData = detailPageOfferGridData[label.key]
            return <DetailPageGridField key={label.key} gridFieldData={gridFieldData} label={label} />
          })}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ContractDetailPage
