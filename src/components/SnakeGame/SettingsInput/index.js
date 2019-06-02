/* @flow strict */
import * as React from 'react'

import { Label, Range, Toggle } from '../../../controls'

export type Settings = {|
  speed: number,
  foodCount: number,
  bordered: boolean,
|}

type Props = {|
  settings: Settings,
  onChange: (settings: Settings) => mixed,
|}

const initialSettings = {
  speed: 5,
  foodCount: 3,
  bordered: true,
}

export function SettingsInput(props: Props) {
  const { settings, onChange } = props

  function handleRangeChange(field: 'speed' | 'foodCount') {
    return (value: number) => {
      onChange({
        ...settings,
        [field]: value,
      })
    }
  }

  function handleBorderedChange(value: boolean) {
    onChange({
      ...settings,
      bordered: value,
    })
  }

  return (
    <>
      <Label title="Food count">
        <Range
          min={1}
          max={10}
          step={1}
          value={settings.foodCount}
          onChange={handleRangeChange('foodCount')}
        />
      </Label>
      <br />
      <Label title="Speed">
        <Range
          min={1}
          max={10}
          step={1}
          value={settings.speed}
          onChange={handleRangeChange('speed')}
        />
      </Label>
      <br />
      <Label title="Bordered">
        <Toggle value={settings.bordered} onChange={handleBorderedChange} />
      </Label>
    </>
  )
}

SettingsInput.useSettings = function useSettings() {
  return React.useState(initialSettings)
}
