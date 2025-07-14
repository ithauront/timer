import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme[`gray-100`]};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme[`gray-600`]};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme[`gray-100`]};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-left: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme[`gray-700`]};
      border-top: 4px solid ${(props) => props.theme[`gray-800`]};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-left: 1.5rem;
      }
    }
    @media (max-width: 600px) {
      display: none;
    }
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
  overflow-y: auto;
  margin-top: 2rem;

  @media (max-width: 600px) {
    overflow-x: auto;
  }
`
const STATUS_COLOR = {
  yellow: 'yellow-500',
  red: 'red-500',
  green: 'green-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
}

export const Status = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};
  }
`

export const MobileHistoryList = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;

    flex: 1;
    overflow-y: auto;
  }
`

export const MobileHistoryItem = styled.div`
  background-color: ${(props) => props.theme['gray-700']};
  padding: 1rem;
  border-radius: 8px;
  color: ${(props) => props.theme['gray-100']};
  font-size: 0.875rem;
  line-height: 1.4;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  strong {
    font-size: 1rem;
  }
`
