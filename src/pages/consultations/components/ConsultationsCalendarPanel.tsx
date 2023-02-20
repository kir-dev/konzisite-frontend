import { Box, useColorMode, useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useNavigate } from 'react-router-dom'
import customTheme from '../../../assets/theme'
import { majorColor } from '../../../util/majorHelpers'
import { PATHS } from '../../../util/paths'
import { ConsultationPreview } from '../types/consultationPreview'

type Props = {
  consultaions: ConsultationPreview[] | undefined
  hideCalendar: boolean
}

type eventProps = {
  id: string
  title: string
  start: string
  end: string
  color: string
}

const StyleWrapper = styled.div`
  --fc-button-active-bg-color: ${(props) => customTheme.colors.brand[props.className === 'light' ? 400 : 300]};
  --fc-button-bg-color: ${(props) => customTheme.colors.brand[props.className === 'light' ? 500 : 200]};
  --fc-button-border-color: ${(props) => customTheme.colors.brand[props.className === 'light' ? 500 : 200]};
  --fc-button-hover-bg-color: ${(props) => customTheme.colors.brand[props.className === 'light' ? 400 : 300]};
  --fc-button-hover-border-color: ${(props) => customTheme.colors.brand[props.className === 'light' ? 400 : 300]};

  .fc-button:disabled {
    opacity: 0.35;
  }

  .fc-button,
  .fc-button:focus,
  .fc-button:active,
  .fc-button-primary:not(:disabled):active:focus,
  .fc-button-primary:not(:disabled).fc-button-active:focus {
    box-shadow: 0 0 0 0;
    border: 0;
  }

  .fc-event {
    cursor: pointer;
  }
`

export const ConsultationsCalendarPanel = ({ consultaions, hideCalendar }: Props) => {
  const navigate = useNavigate()
  const [largeScreen] = useMediaQuery('(min-width: 48em)')
  const colorMode = useColorMode()

  const events: eventProps[] | undefined = consultaions?.map((c) => {
    return {
      id: c.id.toString(),
      title: c.name,
      start: c.startDate,
      end: c.endDate,
      color: c.subject.majors.length > 1 ? 'purple' : majorColor[c.subject.majors[0]]
    }
  })

  return (
    <Box mt={5} hidden={hideCalendar}>
      <StyleWrapper className={colorMode.colorMode}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={
            largeScreen
              ? {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek'
                }
              : {
                  left: 'title',
                  center: '',
                  right: 'dayGridMonth,timeGridWeek'
                }
          }
          footerToolbar={largeScreen ? {} : { left: 'prev', center: 'today', right: 'next' }}
          aspectRatio={largeScreen ? 1.5 : 0.9}
          buttonText={{
            today: 'ma',
            month: 'hónap',
            week: 'hét'
          }}
          views={{
            timeGridWeek: {
              titleFormat: { year: 'numeric', month: '2-digit', day: 'numeric' }
            }
          }}
          locale="hu"
          firstDay={1}
          allDaySlot={false}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          events={events}
          buttonHints={{ week: 'Hét nézet', month: 'Hónap nézet', today: 'Ugrás a mai naphoz', next: 'Következő', prev: 'Előző' }}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit'
          }}
          eventClick={(e) => {
            navigate(`${PATHS.CONSULTATIONS}/${e.event.id}`)
          }}
        />
      </StyleWrapper>
    </Box>
  )
}
