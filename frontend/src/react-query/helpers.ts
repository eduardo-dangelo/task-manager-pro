export const dataFromApi = (obj: any) => {
  const camelCaseObj: any = {}
  Object.keys(obj).forEach((key) => {
    const camelCaseKey = key.replace(/(_\w)/g, (k) => k[1].toUpperCase())
    camelCaseObj[camelCaseKey] = obj[key]
  })
  return camelCaseObj
}

export const dataToApi = (obj: any) => {
  const snakeCaseObj: any = {}
  Object.keys(obj).forEach((key) => {
    const snakeCaseKey = key.replace(/([A-Z])/g, (k) => `_${k.toLowerCase()}`)
    snakeCaseObj[snakeCaseKey] = obj[key]
  })
  return snakeCaseObj
}
