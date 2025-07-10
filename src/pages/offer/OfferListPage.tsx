import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { createQueryParams } from '../../helpers/common'
import { NotificationType } from '../../types/notification'
import Spinner from '../../components/Spinner'
import CustomTable from '../../components/CustomTable'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useGetOffersQuery } from '../../app/apis/crm/offer.api'
import { getOfferListColumns, transformOfferDataIntoGridData } from '../../transformers/offer'
import { TableRowPerPage } from '../../consts/common'

const OfferListPage = () => {
  const queryParams = createQueryParams(useAppSelector((state) => state.search))
  const { isLoading, data: offers, isError, error } = useGetOffersQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !offers) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/offers')
    return null
  }

  const rows = offers.map((offer) => transformOfferDataIntoGridData(t, offer))
  const columns = getOfferListColumns(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t('pageNamesAndActions.offers').toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={rows} rowPerPage={TableRowPerPage} />
      </Grid>
    </Grid>
  )
}

export default OfferListPage
