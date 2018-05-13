

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


function doInit(){
  let questions = ['Please choose you project type, 1 for mobile 2 for pc, will use pc by default: ', 'Please input you project name: ']

  prompInput.doInput(questions).then(anwsers => {
    let copyPath = ''
    console.info('your input info:', anwsers)
    global.projectType = anwsers[0].replace(/\\n/, '')
    global.projectName = anwsers[1].replace(/\\n/, '')

    console.info('@@@@@1@@@@@@@', global.projectType, global.projectType === '2')

    if (global.projectType === '2') {
      copyPath = 'rf-vue-app-mobile'
    } else {
      copyPath = 'rf-vue-pc'
    }

    copyPath = path.resolve('./node_modules/' + copyPath)

    console.info('@@@@2@@@@@', copyPath)

    spinner.start()

    return copyFiles.doCopy()
  }).then(res => {
    spinner.stop()
    console.log(chalk.green('Init project success'))
    process.exit()
  }).catch( error => {
    spinner.stop()
    console.log(chalk.red(error))
    process.exit()
  })
}

module.exports = {
  doInit
}