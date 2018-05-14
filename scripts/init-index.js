const copyFiles = require('./init-copy-files')
const prompInput = require('./init-prompt-input')
const defaultProjectName = 'my-app'
const defaultProjectType = '1'

const ora = require('ora')
const chalk = require('chalk')
const spinner = ora('Init project')
const path = require('path')

global.projectType = defaultProjectType
global.projectName = defaultProjectName

function doInit () {
  let questions = ['Please choose you project type, 1 mobile 2 pc, will use 1 by default, just input 1 or 2: ', 'Please input you project name: ']

  prompInput.doInput(questions).then(anwsers => {
    let copyPath = ''
    let destPath = path.resolve('./test')

    console.info('#######', __dirname)

    global.projectType = anwsers[0].replace(/\n/, '')
    global.projectName = anwsers[1].replace(/\n/, '')

    if (global.projectType === '1') {
      copyPath = 'rf-vue-app-mobile'
    } else {
      copyPath = 'rf-vue-pc'
    }
    copyPath = path.resolve('./node_modules/' + copyPath)
    spinner.start()

    return copyFiles.doCopy(destPath, copyPath)
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