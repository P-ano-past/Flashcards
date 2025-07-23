import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const spin = keyframes`
to {
  transform: rotate(360deg);
  }
  `;

export const Spinner = styled.div`
  border: 2px solid transparent;
  border-top: 2px solid #fff;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: ${spin} 0.6s linear infinite;
  margin-right: 0.5em;
`;
