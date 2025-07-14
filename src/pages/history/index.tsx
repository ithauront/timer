import { useContext } from 'react'
import {
  HistoryContainer,
  HistoryList,
  MobileHistoryItem,
  MobileHistoryList,
  Status,
} from './styles'
import { cyclesContext } from '../../context/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useIsMobile } from '@/utils/isMobile'

export function History() {
  const { cycles } = useContext(cyclesContext)
  const isMobile = useIsMobile()
  return (
    <HistoryContainer>
      <h1>Meu historico</h1>

      {!isMobile ? (
        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Inicio</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycles) => {
                return (
                  <tr key={cycles.id}>
                    <td>{cycles.task}</td>
                    <td>{cycles.minutesAmount} minutos</td>
                    <td>
                      {formatDistanceToNow(new Date(cycles.startDate), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td>
                      {cycles.finishDate && (
                        <Status statusColor="green"> Concluido </Status>
                      )}
                      {cycles.interruptedDate && (
                        <Status statusColor="red"> Interrompido </Status>
                      )}
                      {!cycles.interruptedDate && !cycles.finishDate && (
                        <Status statusColor="yellow">Em andamento </Status>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </HistoryList>
      ) : (
        <MobileHistoryList>
          {cycles.map((cycle) => (
            <MobileHistoryItem key={cycle.id}>
              <strong>{cycle.task}</strong>
              <span>Duração: {cycle.minutesAmount} minutos</span>
              <span>
                Início:{' '}
                {formatDistanceToNow(new Date(cycle.startDate), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </span>
              <span>
                Status:{' '}
                {cycle.finishDate && (
                  <Status statusColor="green">Concluído</Status>
                )}
                {cycle.interruptedDate && (
                  <Status statusColor="red">Interrompido</Status>
                )}
                {!cycle.interruptedDate && !cycle.finishDate && (
                  <Status statusColor="yellow">Em andamento</Status>
                )}
              </span>
            </MobileHistoryItem>
          ))}
        </MobileHistoryList>
      )}
    </HistoryContainer>
  )
}
