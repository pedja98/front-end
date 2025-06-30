import { Button, Grid } from '@mui/material'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../app/hooks'
import { hideConfirm } from '../../features/confirm.slice'
import { useSignedContractMutation } from '../../app/apis/crm/contract.api'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'

const SignContractDialog: FC<{ contractId: number }> = ({ contractId }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [signedContract, { isLoading }] = useSignedContractMutation()

  const [dateSigned, setDateSigned] = useState<Dayjs | null>(null)

  const handleSign = async () => {
    if (!dateSigned) return

    try {
      const response = await signedContract({
        contractId,
        dateSigned: dateSigned.format('DD-MM-YYYY'),
      }).unwrap()
      const messageCode = `contracts:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
    } catch (error) {
      dispatch(
        setNotification({
          text: JSON.stringify(error),
          type: NotificationType.Error,
        }),
      )
    } finally {
      dispatch(hideConfirm())
    }
  }

  return (
    <Grid container sx={{ width: '100%' }}>
      <Grid item sx={{ width: '100%' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name='dateSigned'
            label={t('contracts:dateSigned')}
            format='DD/MM/YYYY'
            value={dateSigned}
            onChange={(newValue) => setDateSigned(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                id: 'dateSigned',
              },
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid sx={{ mt: 3, width: '100%', display: 'flex', flexDirection: 'row', gap: 1 }} item>
        <Button sx={{ width: '49%' }} onClick={handleSign} color='primary' disabled={!dateSigned || isLoading}>
          {t('contract:sign')}
        </Button>
        <Button sx={{ width: '49%' }} onClick={() => dispatch(hideConfirm())} color='primary'>
          {t('general:close')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default SignContractDialog
