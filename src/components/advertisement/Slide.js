import React from 'react'
import { css, jsx } from '@emotion/react'

const Slide = ({ content }) => (
  <div
    css={css`
      height: 100;
      width: 100%;
      background-image: url({process.env.PUBLIC_URL + '/img/'+ ${content}});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    `}
  />
)

export default Slide