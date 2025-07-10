import { useNavigate } from 'react-router-dom'
import { useGetAllContractsQuery } from '../../app/apis/crm/contract.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createQueryParams } from '../../helpers/common'
import { useTranslation } from 'react-i18next'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { getContractLabels, transformContractDataIntoGridData } from '../../transformers/contract'
import { Grid, Typography } from '@mui/material'
import CustomTable from '../../components/CustomTable'
import { TableRowPerPage } from '../../consts/common'

const ContractListPage = () => {
  const queryParams = createQueryParams(useAppSelector((state) => state.search))
  const { isLoading, data: contracts, isError, error } = useGetAllContractsQuery(queryParams)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !contracts) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/contracts')
    return null
  }

  const rows = contracts.map((contract) => transformContractDataIntoGridData(t, contract))
  const columns = getContractLabels(t)

  return (
    <Grid sx={{ mt: 2 }}>
      <Grid item>
        <Typography variant='h4'>{t('pageNamesAndActions.contracts').toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <CustomTable columns={columns} rows={rows} rowPerPage={TableRowPerPage} />
      </Grid>
    </Grid>
  )
}

export default ContractListPage
