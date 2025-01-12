import { useState } from 'react'
import { useGetRegionsQuery } from '../../app/apis/region.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createQueryParamsForSearch } from '../../helpers/common'
import Spinner from '../common/Spinner'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { TabelRowPerPage } from '../../consts/common'
import { transformRegionIntoViewGridData } from '../../transformers/region'
import { Grid, Pagination, Typography } from '@mui/material'
import UniformTable from '../common/UniformTable'

const RegionListView = () => {
  const queryParams = createQueryParamsForSearch(useAppSelector((state) => state.search))
  const { isLoading, data: regions, isError, error } = useGetRegionsQuery(queryParams)

  const [currentPage, setCurrentPage] = useState(1)

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

  const paginatedRegions = regions.slice((currentPage - 1) * TabelRowPerPage, currentPage * TabelRowPerPage)
  const listViewRegionGridData = paginatedRegions.map((region) => transformRegionIntoViewGridData(region))

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const columns = [
    { label: t('region:name'), key: 'name' },
    { label: t('general:createdBy'), key: 'createdByUsername' },
    { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
    { label: t('general:dateCreated'), key: 'dateCreated' },
    { label: t('general:dateModified'), key: 'dateModified' },
  ]

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t(`pageNamesAndActions.regions`).toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <UniformTable columns={columns} rows={listViewRegionGridData} />
        <Pagination
          count={Math.ceil(regions.length / TabelRowPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color='primary'
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Grid>
    </Grid>
  )
}

export default RegionListView
