import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography, TextField, Button } from '@mui/material'
import Spinner from '../../components/Spinner'
import { useCreateRegionMutation } from '../../app/apis/region.api'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException } from '../../types/exception'
import { useAppDispatch } from '../../app/hooks'

const RegionCreatePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [createRegionData, setCreateRegionData] = useState<{ name: string }>({
    name: '',
  })

  const [createRegion, { isLoading }] = useCreateRegionMutation()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCreateRegionData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    try {
      const messageCode = `region:${(await createRegion(createRegionData).unwrap()).message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate('/index/regions')
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `region:${errorResponse.data}` || 'general:unknowError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>{t('region:createRegionLabel')}</Typography>
      </Grid>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            id='name'
            required
            name='name'
            label={t('region:name')}
            variant='standard'
            value={createRegionData.name}
            sx={{ width: '100%' }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Button sx={{ width: '100%' }} onClick={handleSave}>
            {t('general:saveButtonText')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RegionCreatePage
