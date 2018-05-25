const fs = require('fs')

function editPackageJsonFile (packageJsonFilePath, projectName, copyFolder) {
  let pacakgeFile
  let nameReg
  let newProjectNameStr
  let promise

  promise = new Promise((resolve) => {
    pacakgeFile = fs.readFileSync(packageJsonFilePath, 'utf8')
    nameReg = new RegExp('"' + copyFolder + '"', 'g')
    newProjectNameStr = '"' + projectName + '"'
    pacakgeFile = pacakgeFile.replace(nameReg, newProjectNameStr)
    fs.writeFileSync(packageJsonFilePath, pacakgeFile, {encoding: 'utf8'})

    resolve(true)
  })

  return promise
}

module.exports = {
editPackageJsonFile}
