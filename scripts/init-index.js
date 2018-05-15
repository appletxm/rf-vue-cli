const copyFiles = require('./init-copy-files')
const prompInput = require('./init-prompt-input')
const editFile = require('./init-edit-file')
const defaultProjectName = 'my-app'
const defaultProjectType = '1'

const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(chalk.green('Init project start'))
const path = require('path')

let copyPath =''
let copyFolder = ''
let destPath = path.resolve('./')

global.projectType = defaultProjectType
global.projectName = defaultProjectName

function doInit () {
  let questions = ['Please choose you project type, 1 mobile 2 pc, will use 1 by default, just input 1 or 2: ', 'Please input you project name: ']

  prompInput.doInput(questions).then(anwsers => {
    global.projectType = anwsers[0].replace(/\n/, '')
    global.projectName = anwsers[1].replace(/\n/, '')

    if (global.projectType === '1') {
      copyFolder = 'rf-vue-app-mobile'
    } else {
      copyFolder = 'rf-vue-pc'
    }
    copyPath =  path.join((path.join(__dirname)).replace(/scripts/, 'node_modules'), '/', copyFolder)
    spinner.start()

    return copyFiles.doCopy(destPath, copyPath)
  }).then(res => {
    let packageJsonFilePath = path.join(copyPath + '/package.json')
    if(res === true){
      return editFile.editPackageJsonFile(packageJsonFilePath, projectName)
    }
  }).then(res => {
    spinner.stop()
    console.log(chalk.green('Init project success'))
    process.exit()
  }).catch(error => {
    spinner.stop()
    console.log(chalk.red(error))
    process.exit()
  })
}

module.exports = {
doInit}
