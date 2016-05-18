/**
 *
 * @authors gooofly (wangfei@51xianqu.net, http://www.gooofly.com)
 * @date    2015-09-08 17:06:09
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */

function phone ( phone ) {
  var reg = /^1\d{10}$/;

  phone = +phone;
  if ( !phone ) {
    return '请输入手机号';
  }

  if ( !reg.test(phone) ) {
    return '请输入有效的手机号码';
  }

  return false;
}

function pwd ( pwd ) {
  // var reg = /^[a-zA-Z0-9]{6,16}$/;

  if ( !pwd ) { 
    return '请输入密码';
  }
  if ( !(pwd.length >= 6 && pwd.length <= 20) ) {
    return '密码必须大于等于6位，小于等于16位';
  }
  if ( !(/\d+/.test(pwd) && /\D+/.test(pwd)) ) {
    return '密码必须同时包含数字和字母或字符 ';
  }

  return false;
}

function rpwd ( pwd, repwd ) {
  if ( pwd !== repwd ) {
    return '两次输入密码不一致';
  }

  return false;
}

// 验证码
function smsCode ( code ) {
  var reg = /^\d+$/;

  if ( !reg.test(code) ) {
    return '请输入短信验证码';
  }

  return false;
}

module.exports = {
  phone     : phone,
  pwd   : pwd,
  rpwd : rpwd,
  smsCode   : smsCode
};
