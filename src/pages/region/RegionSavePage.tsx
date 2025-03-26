import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Grid, Typography, TextField, Button } from '@mui/material'
import Spinner from '../../components/Spinner'
import { useCreateRegionMutation, useGetRegionQuery, useUpdateRegionMutation } from '../../app/apis/region.api'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException } from '../../types/common'
import { useAppDispatch } from '../../app/hooks'

const RegionSavePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const regionId = useParams().id

  const [regionData, setRegionData] = useState<{ name: string }>({
    name: '',
  })

  const [createRegion, { isLoading: isLoadingCreateRegion }] = useCreateRegionMutation()
  const [updateRegion, { isLoading: isLoadingUpdateRegion }] = useUpdateRegionMutation()

  const {
    isLoading: isLoadingGetRegion,
    data: region,
    isError: isErrorGetRegion,
    error: errorGetRegion,
  } = useGetRegionQuery(regionId as string, { skip: !regionId })

  useEffect(() => {
    if (region) {
      setRegionData({ name: region.name })
    }
  }, [region])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setRegionData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }, [])

  const handleSave = async () => {
    try {
      const response = regionId
        ? await updateRegion({ id: regionId, region: regionData }).unwrap()
        : await createRegion(regionData).unwrap()
      const messageCode = `regions:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(regionId ? `/index/regions/${regionId}` : `/index/regions`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `regions:${errorResponse.data}` || 'general:unknowError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (isLoadingCreateRegion || isLoadingGetRegion || isLoadingUpdateRegion) {
    return <Spinner />
  }

  if (isErrorGetRegion) {
    dispatch(
      setNotification({
        text: JSON.stringify(errorGetRegion),
        type: NotificationType.Error,
      }),
    )
    navigate('/index/regions')
    return null
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
      {!regionId && (
        <Grid item sx={{ width: '80%', mb: 2 }}>
          <Typography variant='h4'>{t('regions:createRegionLabel')}</Typography>
        </Grid>
      )}
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            id='name'
            required
            name='name'
            label={t('regions:name')}
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

export default RegionSavePage
