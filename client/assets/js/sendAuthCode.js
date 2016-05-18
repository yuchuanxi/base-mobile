/**
 *
 * @authors gooofly (wangfei@51xianqu.net, http://www.gooofly.com)
 * @date    2015-09-08 17:05:18
 * @version $Id$
 *
 * 发送验证码
 * --------------------------------------------
 */
var
  apis = require('apis'),
  apisMsg = require('apisMsg'),
  validate = require('validate'),
  toast = require('toast'),
  ajax = require('ajax'),

  verifyMsg = '',
  codeSendDeay = 0,
  refreshSendBtn = function ( sendBtn) {

    if ( --codeSendDeay > 0 ) {
      sendBtn.classList.add('disabled');
      sendBtn.innerText = '('+ codeSendDeay +'秒)后重发';
      setTimeout(function () {
        refreshSendBtn(sendBtn);
      }, 1000);
    }
    else {
      sendBtn.classList.remove('disabled');
      sendBtn.innerText = '重发验证码';
    }
  },

  sendSmsCode = function (spinWrap, mobile, captcha, sendBtn ) {

    if ( sendBtn.matches('.disabled') ) {
      return false;
    }

    verifyMsg = validate.phone(mobile);
    if ( verifyMsg ) {
      toast.show('info', verifyMsg);
      return false;
    }
    if (!captcha) {
      toast.show('info', '请输入图形验证码');
      return false;
    }

    ajax.get(apis.sendSmsCode, spinWrap, {
      phone: mobile,
      captchaCode: captcha
    },
    function ( res ) {
      toast.show('success', '发送成功！');
      codeSendDeay = 61;
      refreshSendBtn( sendBtn );
    },
    function ( res ) {
      toast.show('error', apisMsg.sendSmsCode[res.responseInfo] || '发送失败');
    });
  };

module.exports = sendSmsCode;
