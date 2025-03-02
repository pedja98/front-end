import { useState } from 'react'
import { useGetRegionsQuery } from '../../app/apis/region.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createQueryParamsForSearch } from '../../helpers/common'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { TabelRowPerPage } from '../../consts/common'
import { transformRegionIntoPageGridData } from '../../transformers/region'
import { Grid, Pagination, Typography } from '@mui/material'
import UniformTable from '../../components/UniformTable'

const RegionListPage = () => {
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
  const listPageRegionGridData = paginatedRegions.map((region) => transformRegionIntoPageGridData(region))

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const columns = [
    { label: t('regions:name'), key: 'name' },
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
        <UniformTable columns={columns} rows={listPageRegionGridData} />
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

export default RegionListPage
