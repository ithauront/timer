import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};
  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  @media (max-width: 600px) {
    font-size: 4rem;
    line-height: 3.5rem;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  @media (max-width: 600px) {
    width: 2rem;
  }
`
