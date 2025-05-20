import { useGetRegionsQuery } from '../../app/apis/region.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createQueryParamsForSearch } from '../../helpers/common'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { getRegionPageGridLabels, transformRegionIntoPageGridData } from '../../transformers/region'
import { Grid, Typography } from '@mui/material'
import CustomTable from '../../components/CustomTable'
import { TableRowPerPage } from '../../consts/common'

const RegionListPage = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: regions, isError, error } = useGetRegionsQuery(queryParams)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !regions) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/regions')
    return null
  }

  const listPageRegionGridData = regions.map((region) => transformRegionIntoPageGridData(region))
  const columns = getRegionPageGridLabels(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.regions`).toUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={listPageRegionGridData} rowPerPage={TableRowPerPage} />
      </Grid>
    </Grid>
  )
}

export default RegionListPage
