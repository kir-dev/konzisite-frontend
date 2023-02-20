import { Box, useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useNavigate } from 'react-router-dom'
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

/*
.fc-button.fc-prev-button,
  .fc-button.fc-next-button,
  .fc-button.fc-button-secondary,
  .fc-button.fc-button-primary {
    background: #062c4c;
  }
  */

const StyleWrapper = styled.div`
  --fc-button-bg-color: #062c4c;
  .fc-event {
    cursor: pointer;
  }
`

export const ConsultationsCalendarPanel = ({ consultaions, hideCalendar }: Props) => {
  const navigate = useNavigate()
  const [largeScreen] = useMediaQuery('(min-width: 48em)')

  const events: eventProps[] | undefined = consultaions?.map((c) => {
    return {
      id: c.id.toString(),
      title: c.name,
      start: c.startDate,
      end: c.endDate,
      color: c.subject.majors.length > 1 ? 'purple' : 'blue' //TODO with major colors
    }
  })

  return (
    <Box mt={5} hidden={hideCalendar}>
      <StyleWrapper>
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
          //initialView="dayGridMonth"
          //selectable={true}
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
