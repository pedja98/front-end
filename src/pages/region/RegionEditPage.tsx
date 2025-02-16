import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useTranslation } from 'react-i18next'
import { useGetRegionQuery, useUpdateRegionMutation } from '../../app/apis/region.api'
import Spinner from '../../components/Spinner'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState, useEffect } from 'react'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException } from '../../types/common'

const RegionEditPage = () => {
  const regionId = String(useParams().id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const {
    isLoading: isGetRegionLoading,
    data: region,
    isError: isGetRegionError,
    error: getRegionError,
  } = useGetRegionQuery(regionId)
  const [updateRegion, { isLoading: updateRegionLoading, isError: isUpdateRegionError, error: updateRegionError }] =
    useUpdateRegionMutation()

  const [regionData, setRegionData] = useState({ name: '' })

  useEffect(() => {
    if (region) {
      setRegionData({ name: region.name })
    }
  }, [region])

  if (isGetRegionLoading || updateRegionLoading) {
    return <Spinner />
  }

  if (isGetRegionError || !region || isUpdateRegionError) {
    dispatch(
      setNotification({
        text: JSON.stringify(getRegionError || updateRegionError),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/regions')
    return null
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setRegionData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    try {
      const messageCode = `region:${(await updateRegion({ id: regionId, region: regionData }).unwrap()).message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(`/index/regions/${regionId}`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `region:${errorResponse.data?.message}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>{t('region:editRegionLabel')}</Typography>
      </Grid>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            id='name'
            name='name'
            label={t('region:name')}
            required
            variant='standard'
            value={regionData.name}
            sx={{ width: '100%' }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Button sx={{ width: '100%' }} onClick={handleSave}>
            {t('general:saveButtonLabel')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RegionEditPage
