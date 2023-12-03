export const uuid4 = (): string => {
  let sGuid = ''
  for (let i = 0; i < 32; i++) {
    sGuid += Math.floor(Math.random() * 0xf).toString(0xf)
  }
  return sGuid
}
