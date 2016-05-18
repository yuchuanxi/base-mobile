/**
 *
 * @authors gooofly (wangfei.f2e@gmail.com, http://www.gooofly.com)
 * @date    2016-01-16 10:13:08
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */
require('./index.less');
/**
 * 消息组件
 */
module.exports = (function () {
  var
    toastType = 'toast',
    posType   = 'top',
    toast     = null,
    timer     = null,
    inserted  = false,
    TEMPLATE = {
      toast : '<div>{value}</div>',
      // success : '<div>{value}</div>',
      // error : '<div>{value}</div>',
      // info : '<div>{value}</div>'
      success : '<div><i class="icon"></i>{value}</div>',
      error : '<div><i class="icon"></i>{value}</div>',
      info : '<div><i class="icon"></i>{value}</div>'
    },

    init = function () {
      inserted = true;
      // 全局只有一个实例
      document.querySelector('.views').insertAdjacentHTML('beforeend',
          '<div id="gToast" class="g-toast"></div>');
      toast = document.getElementById('gToast');
      // _subscribeCloseTag();
    },
    hideAnim = function () {
      toast.classList.remove('show');
      toast.classList.remove('scaleOut');
      toast.dataset.type && toast.classList.remove( toast.dataset.type );
      toast.innerHTML = '';
      toast.removeEventListener('webkitAnimationEnd', hideAnim);
      toast.removeEventListener('animationend', hideAnim);
    },

    hide = function () {

      // toast.classList.add('scaleOut');
      toast.classList.add('scaleOut');
      toast.addEventListener('webkitAnimationEnd', hideAnim);
      toast.addEventListener('animationend', hideAnim);
    },
    showAnim = function () {
      toast.classList.remove('scaleIn');
      toast.removeEventListener('webkitAnimationEnd', showAnim);
      toast.removeEventListener('animationend', showAnim);
    },
    /**
     * 显示消息提示
     * @param type 类型  toast|success|error|info  空格 + class name 可以实现自定义样式
     * @param text 文字内容
     * @param dealy 持续时间 为0则不自动关闭,默认为2000ms
     */
    show = function ( type, text, dealy, pos ) {
      var
        className = type.split(/\s/);

      posType = pos || 'center';
      inserted || init();
      timer && clearTimeout( timer );
      toastType = className[ 0 ];
      // toast.className = toastType;
      toast.innerHTML = TEMPLATE[ toastType ].replace('{value}', text);
      toast.dataset.type && toast.classList.remove( toast.dataset.type );
      toast.dataset.type = toastType;
      toast.dataset.pos && toast.classList.remove( toast.dataset.pos );
      toast.dataset.pos = posType;
      toast.classList.add( toastType );
      toast.classList.add('show');
      toast.classList.add('scaleIn');
      toast.classList.add(posType);
      dealy !== 0 && (timer = setTimeout( hide, dealy || 1200 ));
      toast.addEventListener('webkitAnimationEnd', showAnim);
      toast.addEventListener('animationend', showAnim);
    };

    // _subscribeCloseTag = function () {
    //   toast.addEventListener('touchstart', function () {
    //     hide();
    //   }, false);
    // };

    // init();
  return {
    show: show,
    hide: hide
  };
}());
