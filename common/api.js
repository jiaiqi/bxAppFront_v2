
// 把所有api的url统一在一起并挂在到vue对象上
// 所有接口都在一个文件里会比较大
let remoteAddress = {
  ssourl: 'http://www.100xsys.cn', // 微信登陆sso 端口
  ssoAddress: 'http://sso.100xsys.cn',
  serviceAddress: 'http://srvms.100xsys.cn', // http://login.100xsys.cn 接口地址
  frontEndAddress: 'http://test1.100xsys.cn/home'
}
let ENV = {
  frontEndAddress: remoteAddress.frontEndAddress, //前端线上地址
  appNo: {
    wxmp: 'APPNO20200115100113', //微信小程序
    wxh5: 'APPNO20200107181133', //微信公众号
  },
  appID: {
    wxmp: 'wx8e6f993081f6e979',
    wxh5: ''
  },
  getAuthorization: { //获取公众号授权
    url: remoteAddress.serviceAddress + '/wx/operate/srvwx_public_page_authorization',
    serviceName: 'srvwx_public_page_authorization'
  },
  verifyLogin: { //公众号/小程序验证登录
    url: remoteAddress.serviceAddress + '/wx/operate/srvwx_app_login_verify',
    serviceName: 'srvwx_app_login_verify'
  },
  accountLogin: { //公众号/小程序账号登录
    url: remoteAddress.serviceAddress + 'wx/operate/srvwx_app_login',
    serviceName: 'srvwx_app_login'
  },




  /**
   * 新旧api 分割线—————————————————————————————————————————————————————————— old 
   * */
  backUrl: remoteAddress.ssourl, // 授权域名
  serverURL: remoteAddress.serviceAddress + '/mvpages', // 后台地址
  refuseCode: '0111', // 后台拒绝识别码
  byCode: '1111', // 后台通过码
  byState: 'SUCCESS', // 状态码
  srvHost: remoteAddress.serviceAddress,
  bindLogin: 'bind_login', // 授权成功,请登录绑定账号
  authorizedLoginSuccess: 'authorized_login_success', // 授权成功,可以直接请求业务数据
  ssoAuthor: remoteAddress.serviceAddress + '/wx/operate/', // sso授权地址
  savewxuser: remoteAddress.ssoAddress + '/wx/savewxuser', // sso保存微信用户

  getOpendId: remoteAddress.ssoAddress + '/wx/getOpendId', // sso保存微信用户 /wx/getOpendId
  getSignature: remoteAddress.ssoAddress + '/wx/getSignature', // sso保存微信用户 /wx/getSignature ,
  // 测试地址
  testssoAuthor: remoteAddress.testUrl + '/wx/authorize', // sso授权地址
  testsavewxuser: remoteAddress.testUrl + '/wx/savewxuser', // sso保存微信用户
  testgetOpendId: remoteAddress.testUrl + '/wx/getOpendId', // sso保存微信用户 /wx/getOpendId
  testgetSignature: remoteAddress.testUrl + '/wx/getSignature', // sso保存微信用户 /wx/getSignature ,
  untied: remoteAddress.ssoAddress + '/wx/untied', // 微信解绑 http://Ip:port/wx/untied
  loginAuthor: remoteAddress.ssoAddress + '/bindlogin', // 微信绑定登录地址http://Ip:port/bindlogin
  getImg: remoteAddress.assetsUrl + '/main/', // 图片地址
  downloadImg: remoteAddress.serviceAddress + '/download?filePath=', // 图片地址
  getFilePath: remoteAddress.serviceAddress + '/download?filePath=', // 文件路径地址
  select: remoteAddress.serviceAddress + '/bxsys/select', // 查询接口
  toLogin: remoteAddress.ssoAddress + '/bxsyslogin', // 用户相关接口
  getUserInfo: remoteAddress.ssoAddress + '/getUserInfo', // 用户信息
  selectByUser: remoteAddress.serviceAddress + '/bxsys/srvms.100xsys.cn', // 用户菜单
  selectOne: remoteAddress.serviceAddress + '/bxsys/selectOne', // 产品相关接口
  startProc: remoteAddress.serviceAddress + '/bxsys/startProc', // 流程开启
  approval: remoteAddress.serviceAddress + '/bxsys/approval', // 流程开启
  startDataProc: remoteAddress.serviceAddress + '/bxsys/startDataProc', // 流程子开启
  add: remoteAddress.serviceAddress + '/bxsys/operate', // 新增
  update: remoteAddress.serviceAddress + '/bxsys/operate', // 修改
  delete: remoteAddress.serviceAddress + '/bxsys/operate', // 删除
  saveDraft: remoteAddress.serviceAddress + '/bxsys/saveDraft', // 保存草稿
  upload: remoteAddress.serviceAddress + '/upload'
}
export default ENV
