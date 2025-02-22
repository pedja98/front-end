import { Button, Grid, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { EmptyValue, GridFieldTypes } from '../../consts/common'
import { LinkStyled } from '../../styles/common'
import { useGetCompanyQuery } from '../../app/apis/company.api'
import { transformCompanyIntoEditPageGridData } from '../../transformers/company'
import { GridFieldType } from '../../types/common'

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

  const detailPageCompanyGridData = transformCompanyIntoEditPageGridData(company, true)

  const labels = [
    { label: t('company:name'), key: 'name' },
    { label: t('company:hqAddress'), key: 'hqAddress' },
    { label: t('company:industry'), key: 'industry' },
    { label: t('company:contactPhone'), key: 'contactPhone' },
    { label: t('company:numberOfEmployees'), key: 'numberOfEmployees' },
    { label: t('company:tin'), key: 'tin' },
    { label: t('company:bankName'), key: 'bankName' },
    { label: t('company:bankAccountNumber'), key: 'bankAccountNumber' },
    { label: t('company:assignedTo') + ':  ', key: 'assignedTo' },
    { label: t('company:temporaryAssignedTo'), key: 'temporaryAssignedTo' },
    { label: t('general:createdBy'), key: 'createdByUsername' },
    { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
    { label: t('general:dateCreated'), key: 'dateCreated' },
    { label: t('general:dateModified'), key: 'dateModified' },
    { label: t('company:comment'), key: 'comment' },
  ]

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
              const gridFieldData = detailPageCompanyGridData[label.key] || EmptyValue
              const isArea = gridFieldData.type === GridFieldTypes.AREA

              return (
                <Grid item xs={12} sm={isArea ? 12 : 6} key={label.key}>
                  <Grid container alignItems='center' sx={{ height: '50px' }}>
                    <Grid item sx={{ minWidth: 120 }}>
                      <Typography variant='subtitle1'>{label.label}</Typography>
                    </Grid>
                    <Grid item xs>
                      <Grid item xs>
                        {(() => {
                          if (
                            ([GridFieldTypes.STRING, GridFieldTypes.AREA] as GridFieldType[]).includes(
                              gridFieldData.type,
                            )
                          ) {
                            return (
                              <TextField
                                fullWidth
                                value={gridFieldData.value || EmptyValue}
                                variant='outlined'
                                disabled
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            )
                          } else if (gridFieldData.type === GridFieldTypes.LINK && gridFieldData.value) {
                            return <LinkStyled to={String(gridFieldData.link)}>{gridFieldData.value}</LinkStyled>
                          } else {
                            return (
                              <TextField
                                fullWidth
                                value={EmptyValue}
                                variant='outlined'
                                disabled
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            )
                          }
                        })()}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default CompanyDetailPage
