export default func => (...args) =>
  new Promise((resolve, reject) => {
    func(...args, (error, data) => {
      if (!error) return resolve(data)
      if (error instanceof Error) reject(error)
      else resolve(error)
    })
  })
