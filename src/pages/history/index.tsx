import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'
import { cyclesContext } from '../../context/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function History() {
  const { cycles } = useContext(cyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu historico</h1>

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
                    {formatDistanceToNow(cycles.startDate, {
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
    </HistoryContainer>
  )
}
