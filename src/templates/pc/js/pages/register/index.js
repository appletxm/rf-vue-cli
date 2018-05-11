/* global Vue */
import '../../../css/index.less'
import html from './template.html'
import uiAdapt from 'utils/mobileAdapt'
import models from './model'
import CountDown from 'components/count-down'
import Footer from 'components/footer'
import Header from 'components/header'
import Contract from 'components/contract'
import axioDecorate from 'common/axioDecorate'

uiAdapt(window, document, 750)
axioDecorate.decorate()

const registerPage = new Vue({
  template: html,
  data() {
    return {
      mobile: '',
      verifyCode: '',
      password: '',
      confirmPwd: '',
      realName: '',
      email: '',
      loadingObj: null,
      msgObj: null,
      isAgreeContract: true,
      isShowContract: false,
      maxTimeLength: 120
    }
  },
  methods: {
    $doCheckMobile() {
      models.doCheckMobile(this)
    },

    $doRegister() {
      let result = models.doValidate(this)

      if (result.res === true) {
        // this.$showLoading()
        models.doRegister(this)
      } else {
        this.$showMsg('warning', result.msg)
      }
    },
    $showLoading() {
      this.loadingObj = this.$loading({
        lock: true,
        spinner: 'el-icon-loading'
      })
    },
    $showMsg(type, msg) {
      this.msgObj = this.$message({
        message: msg,
        showClose: true,
        type: type,
        duration: 2000
      })
    },
    $closeLoading() {
      if (this.loadingObj) {
        this.loadingObj.close()
      }
    },

    $getUniqueId(res) {
      this.uniqueId = res.substr(0, 41)
    },

    $checkContract(event) {
      this.isShowContract = true
      event.stopPropagation()
    },

    contrimContractCb() {
      this.isShowContract = false
    }
  },
  components: {
    'count-down': CountDown,
    'app-footer': Footer,
    'app-header': Header,
    'contract': Contract
  },
  created() {},
  mounted() {}
})

registerPage.$mount('#app')
