import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'
import { cyclesContext } from '../../context/CyclesContext'

export function History() {
  const { cycles } = useContext(cyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu historico</h1>

      <pre>{JSON.stringify(cycles, null, 2)}</pre>

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
            <tr>
              <td>Tarefa</td>
              <td>20min</td>
              <td>ha dois dias</td>
              <td>
                <Status statusColor="green"> Concluido </Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20min</td>
              <td>ha dois dias</td>
              <td>
                <Status statusColor="yellow">Em andamento </Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20min</td>
              <td>ha dois dias</td>
              <td>
                <Status statusColor="red"> Interrompido </Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20min</td>
              <td>ha dois dias</td>
              <td>
                <Status statusColor="green"> Concluido </Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
