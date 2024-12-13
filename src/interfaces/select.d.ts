export interface ISelect {
  placeholder: string,
  label: string,
  items?: ItemsSelect[],
  onChange: () => void,
}

export interface ItemsSelect {
  value: string,
  label: string,
}