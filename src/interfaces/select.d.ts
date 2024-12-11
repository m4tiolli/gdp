export interface ISelect {
  placeholder: string,
  label: string,
  items?: ItemsSelect[],
  onChange: () => void,
  value: string
}

export interface ItemsSelect {
  value: string,
  label: string,
}