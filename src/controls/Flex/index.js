/* @flow strict */
import styles from './styles.module.scss'

import cn from 'classnames'
import * as React from 'react'

const justify = {
  CENTER: 'center',
}

const alignItems = {
  CENTER: 'center',
  START: 'flex-start',
}

type Props = {|
  id?: string,
  grow?: number,
  wrap?: boolean,
  inline?: boolean,
  className?: string,
  vertical?: boolean,
  children: React.Node,
  dataComponent?: string,
  justify?: $Values<typeof justify>,
  alignItems?: $Values<typeof alignItems>,
|}

export function Flex(props: Props) {
  const { dataComponent = Flex.displayName } = props
  const className = cn(styles.Flex, props.className, {
    [styles.wrap]: props.wrap,
    [styles.inline]: props.inline,
    [styles.vertical]: props.vertical,
  })
  const style = {
    flexGrow: props.grow,
    alignItems: props.alignItems,
    justifyContent: props.justify,
  }

  return (
    <div
      id={props.id}
      style={style}
      className={className}
      data-component={dataComponent}
    >
      {props.children}
    </div>
  )
}

Flex.justify = justify
Flex.alignItems = alignItems
Flex.displayName = 'Flex'
