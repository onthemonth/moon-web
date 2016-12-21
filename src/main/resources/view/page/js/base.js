/**
 * Created by maguoqiang on 2016/11/29.
 *
 */
/*
 * base.js
 * author:  renguodong@shopex.cn
 */
/*
 * 全局可访问对象、属性和方法
 */
__IS_IFRAME__ = true;
var url='http://localhost/usercenter_dev/web/app_dev.php/usercenter/';
(function() {
    this.AUTHOR = 'renguodong@shopex.cn';
    this.text_input_set = [];//输入框句柄集
    this.select_set = [];//下拉框句柄集
    this.password_rank_set = [];//密码打分控件句柄集
    this.emu_uploader_set = [];//模拟上传控件句柄集
    this.auto_redirect = null;//自动重定向控件
    this.page_mask = null;//页面遮罩层
    this.popup_window = null;//页面内弹出窗口
    this.countdown=60;
    this.Toggle = function(_target) {//显示/隐藏对象，支持传入多对象CSS选择器
        $$(_target).each(function(item) {
            $(item).setStyle('display', $(item).getStyle('display') == 'block' ? 'none' : 'block');
        });
    };
    this.ToggleText = function(_this, _strSrc, _strDes) {//切换文本内容
        $(_this).set('text', $(_this).get('text') == _strSrc ? _strDes : _strSrc);
    };
    this.Hide = function(_this) {//隐藏对象
        $(_this).setStyle('display', 'none');
    };
    this.Submit = function() {
        //提交表单时拦截所有未通过验证的输入

        for (var i = 0; i < text_input_set.length; i++) {
            if (!text_input_set[i].isValidated()) {
                text_input_set[i].validateInput();
                if (!text_input_set[i].isValidated()) return false;
            }
        }
    };
    this.ChangeSeccode = function(_this) {
        _url = url+'getverifycode';
        //console.log(_this);
        $(_this).getPrevious('.seccode-img').set('src', _url + '?rand=' + (new Date().getTime()));
        $('verifycode').set('disabled','');
    };
    this.CheckInvitationcode = function(_this)
    {
        _value = $(_this).get('value');
        if ( !_value )
        {
            return TRUE;
        }
        new Request.JSON({
            url: url+'checkinvitationcode',
            onSuccess: function(_response) {
                if (_response.result == 'SUCCESS') {
                } else if(_response.data == 'USED') {
                    $('invitationh5').set('text','该邀请码已被使用，请重新填写').setStyle('display','inline');
                } else if(_response.data == 'NOTFOUND') {
                    $('invitationh5').set('text','该邀请码不存在，请重新填写').setStyle('display','inline');
                } else if(_response.data == 'EXPIRED') {
                    $('invitationh5').set('text','该邀请码已过期，请重新填写').setStyle('display','inline');
                } else if(_response) {
                    $('invitationh5').set('text','该邀请码不可用，请重新填写').setStyle('display','inline');
                }
            }
        }).post({
                'vali_value':_value
            });
    };

    this.SelectUserType = function(_this, _url) {
        r = $(_this).get('value');
        if ( r == 'company' )
        {
            $('Company').setStyle('display','block');
        }
        else if(r=='person'){
            $('Company').setStyle('display','none');

        }else if(r=='credType_1'){
            $$('.credType_2').setStyle('display','block');
            $$('.credType_1').setStyle('display','none');
        }else if(r=='credType_2'){
            $$('.credType_2').setStyle('display','none');
            $$('.credType_1').setStyle('display','block');
        }else if(r=='laywer'){
            $$('.agent_box').setStyle('display','none');
        }else if(r=='agent'){
            $$('.agent_box').setStyle('display','block');
        }else if ( r == 'control_company' )
        {
            $$('.person > .row').setStyle('display','none');
            $$('.company > .row').setStyle('display','block');
        }
        else if(r=='control_person'){
            $$('.company > .row').setStyle('display','none');
            $$('.person > .row').setStyle('display','block');

        }
    };

    this.GetMobileCode = function(_this) {
        var mobile = $('username').get('value');
        var verifycode = $('verifycode').get('value');
        if ( mobile == '' &&  verifycode == '' )
        {
            alert('请输入您常用的手机号和验证码');
            return;
        }
        if ( mobile == '')
        {
            alert('请输入您常用的手机号');
            return;
        }
        if ( verifycode == '' )
        {
            alert('请输入验证码');
            return;
        }
        new Request.JSON({
            url: url+'getmobilecode',
            onSuccess: function(_response) {
                if (_response.result == 'SUCCESS') {
                    $(_this).setStyle('display','none');
                    $('countdown_box').setStyle('display','block');
                    $$('.send-mess').set('html','验证码已经发送给'+mobile+',请注意查收');
                    this.countdown = 60;
                    settime(_this);
                    setTimeout(function(){
                        $$('.send-mess').set('html','');
                    },5000);
                }
                else {
                    if(_response.data=='overtimes'){
                        alert('验证码获取次数超过限制，请联系客服');
                        $(_this).setStyle('display','block');
                        $('countdown_box').setStyle('display','none');
                    }
                    //alert(_response.error);
                }
            }
        }).post({
                'mobile':mobile,
                'verifycode':verifycode,
                'channel': 'newreg'
            });

        /*	$(_this).setStyle('display','none');
         $('countdown_box').setStyle('display','block');
         this.settime(_this);*/


    };
    this.GetBindMobileCode = function(_this) {
        var mobile = $('bindmobile').get('value');
        var verifycode = $('verifycode').get('value');
        if ( mobile == '' &&  verifycode == '' )
        {
            alert('请输入您绑定的手机号和验证码');
            return;
        }
        if ( mobile == '')
        {
            alert('请输入您绑定的手机号');
            return;
        }
        if ( verifycode == '' )
        {
            alert('请输入验证码');
            return;
        }


        new Request.JSON({
            url: url+'getmobilecode',
            onSuccess: function(_response) {
                if (_response.result == 'SUCCESS') {
                    $(_this).setStyle('display','none');
                    $('countdown_box').setStyle('display','block');
                    this.countdown = 60;
                    settime(_this);
                }
                else {
                    if(_response.data=='overtimes'){
                        alert('验证码获取次数超过限制，请联系客服');
                        $(_this).setStyle('display','block');
                        $('countdown_box').setStyle('display','none');
                    }
                }
            }
        }).post({
                'mobile':mobile,
                'verifycode':verifycode,
                'channel': 'bindmobile'
            });
        /*        $(_this).setStyle('display','none');
         $('countdown_box').setStyle('display','block');
         this.settime(_this);*/
    };

    this.GetForgetMobileCode = function(_this) {
        console.log(_this);
        var mobile = $('username').get('value');
        var verifycode = $('verifycode').get('value');
        if ( mobile == '' &&  verifycode == '' )
        {
            alert('请输入您登录的手机号或绑定的手机和验证码');
            return;
        }
        if ( mobile == '')
        {
            alert('请输入您登录的手机号或绑定的手机号');
            return;
        }
        if ( verifycode == '' )
        {
            alert('请输入验证码');
            return;
        }
        new Request.JSON({
            url: url+'getmobilecode',
            onSuccess: function(_response) {
                if (_response.result == 'SUCCESS') {
                    $(_this).setStyle('display','none');
                    $('countdown_box').setStyle('display','block');
                    this.countdown = 60;
                    settime(_this);
                }
                else {
                    if(_response.data=='overtimes'){
                        alert('验证码获取次数超过限制，请联系客服');
                        $(_this).setStyle('display','block');
                        $('countdown_box').setStyle('display','none');
                    }
                    //alert(_response.error);
                }
            }
        }).post({
                'mobile':mobile,
                'verifycode':verifycode,
                'channel': 'newforget'
            });
        /*        $(_this).setStyle('display','none');
         $('countdown_box').setStyle('display','block');
         this.settime(_this);*/

    };

    this.settime = function(_this){
        if (this.countdown == 0) {
            $('mobileCodeBtn').setStyle('display','block');
            $('countdown_box').setStyle('display','none');
            this.countdown = 60;
        }
        else
        {
            $('mobileCodeBtn').setStyle('display','none');
            $('countdown_box').setStyle('display','block');
            $('countdown').set('text',this.countdown);
            this.countdown--;
            setTimeout(function() {
                this.settime(_this);
            },1000);
        }


    };

    this.updateCity = function(_data) {
        var _this = $('City');
        var _html = '';
        for (var i = 0; i < _data.length; i++) {
            _html += "<option value=\"" + _data[i].area_id + "\">" + _data[i].name + "</option>";
        }
        _this.empty().set('html', _html);
    };
})();
/*
 * 控件对象库
 */
(function() {
    /*
     * 自动重定向控件
     * 为页面添加#AutoRedirect和#AutoRedirectURL两个隐藏域即可开启自动重定向功能
     * #AutoRedirect的value用来设置重定向倒计时的长度，以秒为单位，0则直接重定向
     * #AutoRedirectURL的value用来设置重定向的目标页面地址
     * 设置全局变量auto_redirect = false可以中断倒计时，再次设置为true时可以继续倒计时
     */
    this.AutoRedirect = function() {
        this._timer = null;
        this.init();
    };
    this.AutoRedirect.prototype.init = function() {
        if ($('AutoRedirect') && $('AutoRedirectURL')) {
            var _cd = parseInt($('AutoRedirect').get('value'));
            var _arcd = $('ARCD').set('text', _cd);
            this.timer = setInterval(function() {
                if (auto_redirect) {
                    if (--_cd == 0) {
                        if ($('AutoRedirectURL').get('value') != '') window.top.location.href = $('AutoRedirectURL').get('value');
                        else window.top.location.reload();
                    }
                    _arcd.set('text', _cd);
                }
            }, 1000);
        }
    };
    /*
     * 文本输入框控件
     * 包含placeholder功能，自动判断兼容性
     * 只需将placeholder文本作为title属性值添加到输入控件即可兼容各种浏览器
     * 在input标签内添加js-validate="foo"属性即可支持输入框验证
     * 若没有foo相对应的验证规则可以自由添加
     */
    this.TextInput = function(_text_input) {
        this._this = _text_input;
        this._need_validate = false;
        this._validated = true;
        this._regex = [];
        this._error = [];
        this._empty = '';
        this._validate_name = '';

        this.init();
    };
    this.TextInput.prototype.init = function() {
        var _self = this, _this = this._this;
        _this.addEvents({
            'mouseenter': function(e) {
                _this.addClass('hovered-text-input');
            },
            'mouseleave': function(e) {
                _this.removeClass('hovered-text-input');
            },
            'focus': function(e) {
                _this.addClass('focused-text-input');
                _self.showHint('warning');
            },
            'blur': function(e) {
                _this.removeClass('focused-text-input');
                _self.validateInput();
            },
            'change': function(e) {
                _this.removeClass('focused-text-input');
                _self.validateInput();
            }

        });
        this.supportPlaceholder();
        this.supportAutoValidate();
    };
    this.TextInput.prototype.supportPlaceholder = function() {
        var _self = this, _this = this._this;
        _this.set('title', typeof(_this.get('title')) == 'string' ? _this.get('title') : '');
        //对支持placeholder的现代浏览器，将title的值赋予placeholder
        if ('placeholder' in document.createElement('input')) {
            typeof(_this.get('placeholder')) != 'string' && !!_this.get('title') && _this.set('placeholder', _this.get('title'));
            return false;
        }
        //对于不支持placeholder的浏览器添加模拟 placeholder 功能
        if (!!_this.get('title')) {
            _this.get('value') == '' && _this.addClass('placeholder').set('value', _this.get('title'));
            _this.addEvents({
                'focus': function(e) {
                    _this.hasClass('placeholder') && _this.set('value', '').removeClass('placeholder');
                },
                'blur': function(e) {
                    _this.get('value') == '' && _this.addClass('placeholder').set('value', _this.get('title'));
                }
            });
        }
    };
    this.TextInput.prototype.supportAutoValidate = function() {
        var _self = this, _this = this._this;
        if (typeof(_this.getProperty('js-validate')) == 'string' && _this.getProperty('js-validate') != '') {
            var _name = this._validate_name = _this.getProperty('js-validate');
            this._need_validate = true;
            this._validated = false;
            switch (_name) {
                //添加case分支，可以支持更多测试规则
                case 'company-name':{
                    this._regex = [/^.{4,80}$/, /^[a-zA-Z\u4e00-\u9fa5()（）]+$/];
                    this._error = ['企业名称长度不符合要求', '必须由中文或英文大小写字母组成'];
                    this._empty = '请输入企业名称';
                    break;
                }
                case 'contact-name':{
                    this._regex = [/^.{4,10}$/, /^[a-zA-Z\u4e00-\u9fa5]+$/];
                    this._error = ['联系人姓名格式不符合要求', '请输入中文姓名'];
                    this._empty = '请输入联系人姓名';
                    break;
                }
                case 'user-name':{
                    this._regex = [/^.{4,10}$/, /^[a-zA-Z\u4e00-\u9fa5]+$/];
                    this._error = ['个人名称格式不符合要求', '请输入中文姓名'];
                    this._empty = '请输入个人名称';
                    break;
                }
                case 'telephone':{
                    this._regex = [/^.{11,}$/, /^((\+86)|(86)|0)?\d{11}$/];
                    this._error = ['手机号格式不符合要求', '手机号格式不符合要求'];
                    this._empty = '请填写您的手机号，并发送手机校验码';
                    break;
                }

                case 'phone':{
                    this._regex = [/^.{6,}$/, /^[+]{0,1}(\d){1,4}[ ]{0,1}([-]{0,1}((\d)|[ ]){1,12})+$/];
                    this._error = ['联系电话格式不符合要求', '联系电话格式不符合要求'];
                    this._empty = '请输入手机号或者固定电话';
                    break;
                }
                case 'forget-mobile':{
                    this._regex = [/^.{11,}$/, /^((\+86)|(86)|0)?\d{11}$/];
                    this._error = ['手机号格式不符合要求', '手机号格式不符合要求'];
                    this._empty = '请输入您登录的手机号或绑定的手机号';
                    break;
                }
                case 'mobile':{
                    this._regex = [/^.{11,}$/, /^((\+86)|(86)|0)?\d{11}$/];
                    this._error = ['手机号格式不符合要求', '手机号格式不符合要求'];
                    this._empty = '请输入您常用的手机号';
                    break;
                }
                case 'bindmobile':{
                    this._regex = [/^.{11,}$/, /^((\+86)|(86)|0)?\d{11}$/];
                    this._error = ['手机号格式不符合要求', '手机号格式不符合要求'];
                    this._empty = '请输入您要绑定的手机号';
                    break;
                }

                case 'email':{
                    this._regex = [/^.{5,}$/, /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/];
                    this._error = ['邮箱格式不符合要求', '邮箱格式不符合要求'];
                    this._empty = '请输入电子邮箱';
                    break;
                }
                case 'vali-email':{
                    this._regex = [/^.{5,}$/, /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/];
                    this._error = ['邮箱格式不符合要求', '邮箱格式不符合要求'];
                    this._empty = '请输入电子邮箱';
                    break;
                }
                case 'vali-modemail':{
                    this._regex = [/^.{5,}$/, /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/];
                    this._error = ['邮箱格式不符合要求', '邮箱格式不符合要求'];
                    this._empty = '请输入电子邮箱';
                    break;
                }
                case 'contact-email':{
                    this._regex = [/^.{5,}$/, /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/];
                    this._error = ['邮箱格式不符合要求', '邮箱格式不符合要求'];
                    this._empty = '请输入电子邮箱';
                    break;
                }
                case 'get-email':{
                    this._regex = [/^.{5,}$/, /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/];
                    this._error = ['邮箱格式不符合要求', '邮箱格式不符合要求'];
                    this._empty = '请输入电子邮箱';
                    break;
                }
                case 'password':{
                    this._regex = [/^.{6,18}$/,/^[a-z\d\_]+$/i];
                    this._error = ['密码长度不符合要求', '密码格式不符合要求'];
                    this._empty = '请输入您的登录密码';
                    break;
                }
                case 'confirm-password':{
                    this._regex = [];
                    this._error = [];
                    this._empty = '请再次输入您的登录密码';
                    break;
                }
                case 'trade':{
                    this._regex = [/^.{1,}$/, /^\d{1,}$/];
                    this._error = ['请选择行业', '请选择行业'];
                    this._empty = '请选择行业';
                    break;
                }
                case 'address':{
                    this._regex = [/^.{2,}$/, /^.{2,}$/];
                    this._error = ['请选择地区', '请选择地区'];
                    this._empty = '请选择地区';
                    break;
                }
                case 'address_detail':{
                    this._regex = [/^(.*)$/, /^((?!<script|\/|select|SELECT).)*$/];
                    this._error = ['不能输入非法字符', '不能输入非法字符'];
                    this._empty = '请输入详细地址';
                    break;
                }
                case 'filter':{
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    this._error = ['不能输入非法字符', '不能输入非法字符'];
                    this._empty = '不能输入非法字符';
                    break;
                }
                case 'noempty':{
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    this._error = ['不能为空', '不能为空'];
                    this._empty = '不能为空';
                    break;
                }
                case 'select-area':{
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    this._error = ['不能为空', '不能为空'];
                    this._empty = '不能为空';
                    break;
                }
                case 'mobilecode':{
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    this._error = ['手机校验码不能为空', '手机校验码不能为空'];
                    this._empty = '手机校验码不能为空';
                    break;
                }
                case 'verifycode':{
                    this._regex = [/^.{4,}$/, /^.{4,}$/];
                    this._error = ['验证码长度不对', '请输入验证码'];
                    this._empty = '请输入验证码';
                    break;
                }
                case 'checkcode':{
                    this._regex = [/^.{5}$/, /^.{5}$/];
                    this._error = ['校验码长度不对', '校验码长度不对'];
                    this._empty = '请输入手机校验码';
                    break;
                }
                case 'mobile-code':{
                    //this._regex = [/^[0-9]{6}$$/, /^((?!<script).)*$/];
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    //this._error = ['手机验证码必须为6位纯数字'];
                    this._error = ['手机校验码不能为空', '手机校验码不能为空'];
                    this._empty = '请输入手机验证码';
                    break;
                }
                case 'forgetpassword':{
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    this._error = ['请输入电子邮箱或ShopExID', '请输入电子邮箱或ShopExID'];
                    this._empty = '请输入电子邮箱或ShopExID';
                    break;
                }
                //新增用户注册
                case 'register-code':{
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    this._error = ['社会信用代码不符合要求', '社会信用代码不符合要求'];
                    this._empty = '请输入您的社会信用代码';
                    break;
                }
                case 'register-num':{
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    this._error = ['注册号不符合要求', '注册号不符合要求'];
                    this._empty = '请输入您的注册号';
                    break;
                }
                case 'business_sp':{
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    this._error = ['业务范围不符合要求', '业务范围不符合要求'];
                    this._empty = '请输入您的业务范围';
                    break;
                }
                case 'valid_time':{
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    this._error = ['有效期不符合要求', '有效期不符合要求'];
                    this._empty = '请输入您的有效期';
                    break;
                }
                case 'org_num':{
                    this._regex = [/^.{9,10}$/, /^((?!<script).)*$/];
                    this._error = ['组织机构代码长度为9位或10位', '组织机构代码不符合要求'];
                    this._empty = '请输入您的组织机构代码';
                    break;
                }
                case 'civil-num':{
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    this._error = ['民政字号不符合要求', '民政字号不符合要求'];
                    this._empty = '请输入您的民政字号';
                    break;
                }
                case 'law-num':{
                    this._regex = [/^(.*)$/, /^((?!<script).)*$/];
                    this._error = ['执法证号不符合要求', '执法证号不符合要求'];
                    this._empty = '请输入您的执法证号';
                    break;
                }
                case 'approve_mobile':{

                    this._regex = [/^.{11,}$/, /^((\+86)|(86)|0)?\d{11}$/];
                    this._error = ['手机号格式不符合要求', '手机号格式不符合要求'];
                    this._empty = '请输入联系人手机号码';
                    break;
                }
                case 'id-no':{
                    //320323199102211033
                    this._regex = [/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x))/,/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x))/];
                    this._error = ['身份证位数不对', '身份证不对'];
                    this._empty = '请输入身份证号';
                    break;
                }
                default:{
                    break;
                }
            }
        }
    };
    this.TextInput.prototype.showHint = function(_type, _string) {
        var _row = this._this.getParent('.row');
        var type = !!_type ? _type : 'default';
        var string = !!_string ? _string : '';
        if (!!_row.getElement('h3')) _row.getElement('h3').set('text', type == 'correct' ? string : '').setStyle('display', type == 'correct' ? 'block' : 'none');
        if (!!_row.getElement('h4')) _row.getElement('h4').setStyle('display', type == 'warning' ? 'block' : 'none');
        if (!!_row.getElement('h5')) _row.getElement('h5').set('text', type == 'error' ? string : '').setStyle('display', type == 'error' ? 'inline' : 'none');
        if (!!_row.getElement('h6')) _row.getElement('h6').setStyle('display', (type == 'default' || (type == 'warning' && !!!_row.getElement('h4'))) ? 'block' : 'none');
        if (this._need_validate) this._validated = type == 'correct';
    };
    this.TextInput.prototype.testRegEx = function() {
        var _string = this._this.get('value');
        _string = _string.replace(/\s/g,'');

        for (var i = 0; i < this._regex.length; i++) {
            if (!this._regex[i].test(i == 0 ? _string.replace(/[^\x00-\xff]/g, "**") : _string)) return i + 1;
        }
        return 0;
    };
    this.TextInput.prototype.validateInput = function() {
        var _self = this, _this = this._this, _name = this._validate_name;
        var _value = _this.get('value');
        if (!this._need_validate) return;
        if (_value != '') {
            var _eid = this.testRegEx();
            if (_eid) {
                this.showHint('error', _self._error[_eid - 1]);
                return;
            }
            if (_name == 'confirm-password' && _value != $('Password').getElement('input').get('value')) {
                this.showHint('error', '两次密码输入不一致');
                return;
            }
            if (_name == 'forget-mobile') {
                new Request.JSON({
                    url: url+'checkmobile',
                    onSuccess: function(_response) {
                        if (_response.result == 'SUCCESS') {
                            _self.showHint('error','该手机号未注册或未绑定');
                            $('mobileCodeBtn').set({
                                'data-flag':'1',
                                'disabled':true
                            });
                            //$('mobileCodeBtn').set('disabled','disabled');
                        } else {
                            _self.showHint('correct');
                            $('mobileCodeBtn').set({
                                'data-flag':'0',
                                'disabled':false
                            });

                        }
                    }
                }).post({
                        'vali_type':'mobile',
                        'vali_value':_value
                    });
            }


            if (_name == 'select-area') {
                new Request.JSON({
                    url: url+'getarea',
                    onSuccess: function(_response) {
                        if (_response.result == 'SUCCESS') {
                            updateCity(_response.data);
                        } else {

                        }
                    }
                }).post({
                        'id':_value,
                    });
            }

            if (_name == 'mobile') {
                new Request.JSON({
                    url: url+'checkmobile',
                    onSuccess: function(_response) {
                        if (_response.result == 'SUCCESS') {
                            _self.showHint('correct');
                            $('mobileCodeBtn').set({
                                'data-flag':'0',
                                'disabled':false
                            });
                        } else {
                            _self.showHint('error','该手机号已被占用，请重新填写。');
                            $('mobileCodeBtn').set({
                                'data-flag':'1',
                                'disabled':true
                            });
                        }
                    }
                }).post({
                        'vali_type':'mobile',
                        'vali_value':_value
                    });
            }

            if (_name == 'bindmobile') {
                new Request.JSON({
                    url: url+'checkbindmobile',
                    onSuccess: function(_response) {
                        if (_response.result == 'SUCCESS') {
                            _self.showHint('correct');
                            $('mobileCodeBtn').set('disabled','');
                        } else {
                            _self.showHint('error','该手机号已被占用，请重新填写。');
                            $('mobileCodeBtn').set('disabled','disabled');

                        }
                    }
                }).post({
                        'vali_type':'bindmobile',
                        'vali_value':_value
                    });
            }

            if (_name == 'verifycode') {
                new Request.JSON({
                    url: url+'checkverifycode',
                    onSuccess: function(_response)
                    {
                        console.log(_response.result,_name);
                        if (_response.result == 'SUCCESS')
                        {
                            _self.showHint('correct');
                            var flag = $('mobileCodeBtn').get('data-flag');
                            if(flag =='1'){
                                $('mobileCodeBtn').set('disabled',true);
                            }else{
                                $('mobileCodeBtn').set('disabled',false);
                            }


                            $('verifycode').set('disabled','disabled');
                        }
                        else
                        {
                            _self.showHint('error','验证码错误');
                            $('verifycode').set('disabled','');
                            $('mobileCodeBtn').set('disabled','disabled');
                        }
                    }}).post({ 'verifycode':_value});
            }
            this.showHint('correct');
            return;
        }
        if (typeof(_this.getProperty('js-not-required')) == 'string' && _this.getProperty('js-not-required') == 'true') {
            this._validated = true;
            return;
        }
        this.showHint('error', _self._empty);
        return;
    };
    this.TextInput.prototype.isValidated = function() {
        if (this._this.getParent('.row').getStyle('display') == 'none') return true;
        return this._validated;
    };
    /*
     * 上传控件
     */
    this.EmuUploader = function(_uploader) {
        this._this = _uploader;
        this._text_box = _uploader.getParent('.row').getElement('.text-input').set('disabled', 'disabled');
        this.init();
    };
    this.EmuUploader.prototype.init = function() {
        var _this = this._this, _text_box = this._text_box;
        _this.addEvent('change', function() {
            _text_box.set('value', _this.get('value').substring(_this.get('value').lastIndexOf("\\") + 1));//只显示文件名，不显示完整路径
        })
    };
    /*
     * 下拉框控件
     * 自动计算并设置宽度，支持用户手动指定宽度(在CSS里设置)
     */
    this.Select = function(_select) {
        this._this = _select;
        this._dt = _select.getElement('dt');

        this._dd = _select.getElement('dd');
        this._link = _select.getElements('a');
        this._value = _select.getElement('input');
        this.init();
    };
    this.Select.prototype.init = function(_refresh) {
        var _this = this._this, _dt = this._dt, _dd = this._dd, _value = this._value;
        if (!_refresh) {//刷新下拉列表项时无需重复绑定事件响应
            _this.addEvents({
                'mouseenter': function(e) {
                    _this.addClass('hovered-select');
                    _dd.setStyle('display', 'block');
                },
                'mouseleave': function(e) {
                    _this.removeClass('hovered-select');
                    _dd.setStyle('display', 'none');
                }
            });
        }
        this._link.addEvent('click', function(e) {//对每个下拉列表项绑定事件响应
            _value.set('value', $(this).get('name'));
            _dt.set('text', $(this).get('text'));
            _this.removeClass('placeholder');
            _dd.setStyle('display', 'none');
        }).each(function(item) {
            $(item).set('title', $(item).get('text'));
        });
        this.resize();
    };
    this.Select.prototype.resize = function() {
        var _this = this._this, _dd = this._dd;
        var _width = 0;
        _dd.setStyles({//临时设置对象样式，使之能够获取正确尺寸
            'display': 'block',
            'visibility': 'hidden'
        });
        _width = _dd.getSize().x > 50 ? _dd.getSize().x - 2 : 48;
        _sum = _this.getElements('dd li').setStyle('height', 25).length;
        this._dt.setStyle('width', _width - 30);
        this._dd.setStyle('height', 25 * (_sum < 7 ? _sum : 7));
        this._dd.getElements('a').setStyle('width', _width - 10);
        this._dd.getElement('ul').setStyle('height', 25 * _sum);
        _this.getElements('dd, dd ul, dd li').setStyle('width', _width);
        if (_sum > 7) {
            this._dd.setStyles({
                'overflow-x': 'hidden',
                'overflow-y': 'auto'
            });
        }
        _this.setStyles({//绑定下拉列表与父元素的位置
            'position': 'relative'
        });
        _dd.setStyles({//还原对象
            'display': 'none',
            'visibility': 'visible'
        });
    };
    /*
     * 密码评分控件
     */
    this.PasswordRank = function(_password_rank) {
        this._this = _password_rank;
        this._source = _password_rank.getPrevious('.text-input');
        this._value = _password_rank.getElement('b');
        this.init();
    };
    this.PasswordRank.prototype.init = function() {
        var _self = this, _this = this._this, _value = this._value;
        this._source.addEvent('keyup', function(e) {
            _self.display(_self.calc());
        });
    };
    this.PasswordRank.prototype.calc = function() {
        _input = this._source.get('value');
        var score = 0, _numbers = 0, _uppers = 0, _lowers = 0, _symbols = 0, _total = 0;
        for (var i = 0; i < _input.length; i++) {
            var code = _input.charCodeAt(i);
            if (code < 33 || code > 126) return -1;
            if (code > 47 && code < 58) _numbers++;
            else if (code > 64 && code < 91) _uppers++;
            else if (code > 96 && code < 123) _lowers++;
            else _symbols++;
            _total++;
        }
        score += _total * _total;//基础分数是长度的平方
        score += _numbers * (_uppers + _lowers) > 0 ? _total * 5 : 0;//数字与字母组合有加分（长度值的5倍）
        score += _symbols * (_uppers + _lowers) > 0 ? _total * 5 : 0;//符号与字母组合有加分（长度值的5倍）
        score += _uppers * _lowers > 0 ? _total * 5 : 0;//大小写字母组合有加分（长度值的5倍）
        score += _symbols * _uppers * _lowers > 0 ? _total * 5 : 0;//符号与大小写字母组合有加分（长度值的5倍）
        return score;
    };
    this.PasswordRank.prototype.display = function(_score) {
        var _this = this._this;
        this._value.set({
            'class': _score > 0 ? (_score > 100 ? (_score > 300 ? 'high' : 'mid') : 'low') : '',
            'text': _score > 0 ? (_score > 100 ? (_score > 300 ? '高' : '中') : '低') : ''
        });
        _this.getElement('input').set('value', _score);
    };
    /*
     * 页面遮罩层控件
     * 自动适应窗口和页面
     */
    this.PageMask = function() {
        this._this = $('PageMask');
        this.init();
    };
    this.PageMask.prototype.init = function() {
        this.resize();
        window.addEvents({
            'resize': (function() {
                this.resize();
            }).bind(this)
        });
    };
    this.PageMask.prototype.resize = function() {
        this._this.setStyles({//宽度和高度取页面和视口的最大值，真正完美覆盖
            'width': $(document.body).clientWidth > window.getWidth() ? $(document.body).clientWidth : window.getWidth(),
            'height': $(document.body).clientHeight > window.getHeight() ? $(document.body).clientHeight : window.getHeight()
        });
    };
    this.PageMask.prototype.toggle = function(_to) {
        this._this.setStyle('display', _to == 'hide' ? 'none' : 'block');
    };
    /*
     * 页内弹出窗口控件
     */
    this.PopupWindow = function() {
        this._this = $('PopupWindow');
        this._window = this._this.getElement('iframe');
        this.width = 0;
        this.height = 0;
        this.pm = page_mask;
        this.init();
    };
    this.PopupWindow.prototype.init = function() {
        this.resize();
        this.relocate();
        window.addEvents({
            'scroll': (function(e) {
                this.relocate();
            }).bind(this),
            'resize': (function(e) {
                this.relocate();
            }).bind(this)
        });
    };
    this.PopupWindow.prototype.relocate = function() {
        this._this.setStyles({//使弹出框居中
            'left': (window.getWidth() - this.width) / 2,
            'top': (window.getHeight() - this.height) / 2 + window.getScroll().y
        });
    };
    this.PopupWindow.prototype.resize = function(_width, _height) {
        this.width = (_width ? _width : 400) + 10;
        this.height = (_height ? _height : 300) + 10;
        this._this.setStyles({
            'width': this.width,
            'height': this.height
        }).getElement('iframe').setStyles({
            'width': this.width - 10,
            'height': this.height - 10
        });
        this._this.getElement('.shadow').setStyles({//修复IE6的BUG
            'width': this.width,
            'height': this.height
        });
        this.relocate();
    };
    this.PopupWindow.prototype.open = function(_width, _height, _url) {
        this.resize(_width, _height);
        this._window.set('src', _url ? _url : 'about:blank');
        this.pm.toggle('show');
        this._this.setStyle('display', 'block');
    };
    this.PopupWindow.prototype.close = function() {
        this._this.setStyle('display', 'none');
        this._window.set('src', 'about:blank');//当弹出框无需显示时清空iframe缓存，防止浏览器缓存BUG
        this.pm.toggle('hide');
    };
})();
/*
 * 初始化页面
 */
window.addEvents({
    'domready': function(e) {
        auto_redirect = new AutoRedirect();
        $$('.select').each(function(item) {
            select_set.push(new Select($(item)));
        });
        $$('.text-input, textarea').each(function(item) {
            text_input_set.push(new TextInput($(item)));
        });
        $$('.password-rank').each(function(item) {
            password_rank_set.push(new PasswordRank($(item)))
        });
        $$('.file-uploader').each(function(item) {
            emu_uploader_set.push(new EmuUploader($(item)));
        });
        $$('.hide').setStyle('display', 'none');
        $$('a').each(function(item) {
            if ($(item).get('href') == '#') $(item).set('href', 'javascript:;');
        });
        $$('form:not(.not-validate)').addEvent('submit',function(e){return Submit();});
        //$$('form').set('onsubmit', 'return Submit();');
        if (!__IS_IFRAME__) {//弹出框内联页面无需初始化的对象
            page_mask = new PageMask();
            popup_window = new PopupWindow();
        }
    }
});

