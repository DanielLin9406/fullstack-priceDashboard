export const testExternalLoading = (nextProps) => {
  if (nextProps.isLoading_scheduledPrice || 
    nextProps.isLoading_currentBCPrice || 
    nextProps.isLoading_licenseRule) {
    return true
  } else {
    return false
  }
}

export const testExternalMsg = (nextProps) => {
  const errMsg = [nextProps.errMsg_scheduledPrice, nextProps.errMsg_currentBCPrice, nextProps.errMsg_licenseRule]
  const arr = errMsg.filter((ele) => ele !== '');
  if (arr.length !== 0){
    return arr.join(',')
  }
  return null
}
