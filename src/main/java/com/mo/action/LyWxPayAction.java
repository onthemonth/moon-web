package com.mo.action;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mo.action.base.BaseAction;
import com.mo.util.HttpsRequest;
import com.mo.util.WxPayUtils;
import com.moon.utils.IdGenerator;
import com.moon.utils.LeyaConstantUtils;
import com.moon.utils.LeyaDateUtils;
import com.moon.utils.LeyaHttpClientUtils;
import com.moon.vo.BaseResponseVo;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Copyright (c)  by www.leya920.com
 * All right reserved.
 * Create Date: 2017/6/12 13:49
 * Create Author: xiongwy
 * File Name: LyWxPayAction.java
 * Last version:  1.0
 * Function: //TODO
 * Last Update Date: 2017/6/12 13:49
 * Last Update Log:
 * Comment: //TODO
 */
@Controller
public class LyWxPayAction extends BaseAction {

    private static final Logger logger = LoggerFactory.getLogger(LyWxPayAction.class);

    @RequestMapping(value = "/wxpay/lywxpay")
    public ModelAndView lywxpay() throws Exception {
        HttpServletRequest request = getRequest();
        String code = request.getParameter("code");
        if (StringUtils.isBlank(code)) {
            return null;
        }
        ModelAndView view = new ModelAndView();
        String appId = "wxa99ea32062b8f0f0";
        String mchId = "1466877202";
        String appSecret = "53f9051d83f40e70032d8749a58f67d0";
        String key = "759E90EBF1F75AB77A0FD7B5C836EA5q";
        String userBaseInfoUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code";
        String reqUrl = String.format(userBaseInfoUrl, appId, appSecret, code);
        String orderReqUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
        BaseResponseVo vo = LeyaHttpClientUtils.invokeGet(reqUrl);
        logger.info("获取openId请求返回:"+vo);
        if (LeyaConstantUtils.SUCCESS_RESPONSE.equalsIgnoreCase(vo.getResponseCode())) {
            JSONObject json = JSON.parseObject(vo.getResponseMsg());
            String openId = json.getString("openid");
            Map<String,Object> params = assemblyWxpayParam(appId, mchId, key, openId);
            HttpsRequest request2 = new HttpsRequest();
            String result = request2.sendPost(orderReqUrl, params);
            logger.info("发送支付请求返回结果：" + result);
            Map<String,Object>  retMap =  WxPayUtils.getMapFromXML(result);
            view.addObject("wxpayAppId",appId);
            long timeStamp = System.currentTimeMillis()/1000;
            view.addObject("wxpaytimeStamp",timeStamp);
            view.addObject("wxpayNonceStr",retMap.get("nonce_str"));
            String wxpayPackage = "prepay_id="+retMap.get("prepay_id");
            view.addObject("wxpayPackage",wxpayPackage);
            view.addObject("wxpaySignType","MD5");
            Map<String,Object> pageParsm = new HashMap<>(0);
            pageParsm.put("appId",appId);
            pageParsm.put("timeStamp",timeStamp);
            pageParsm.put("nonceStr",retMap.get("nonce_str"));
            pageParsm.put("package",wxpayPackage);
            pageParsm.put("signType","MD5");
            String pageSign = WxPayUtils.getSign(pageParsm, key);
            view.addObject("wxpaySign",pageSign);
            view.setViewName("ftl/weiXin/wxpay");
            return view;
        }
        return null;
    }

    /**
     * （通知频率为15/15/30/180/1800/1800/1800/1800/3600，单位：秒）
     * @return
     */
    @RequestMapping(value = "/lywxpay/paynotify", produces = {"application/xml"})
    @ResponseBody
    public String wxpayCallBack() {
        logger.info("接收微信推送支付结果通知开始"+System.currentTimeMillis());
        HttpServletRequest request = getRequest();
        Map requestParams = request.getParameterMap();
        try{
            InputStream is = request.getInputStream();
            if (null == is) {
                return null;
            }
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            StringBuilder buffer = new StringBuilder();
            String line = "";
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
           logger.info("推送数据:"+buffer.toString());
        }catch (Exception e){
            logger.error("[====INFO====从request中获取请求的body数据出错]",e);
        }
        for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext(); ) {
            String name = (String) iter.next();
            String[] values = (String[]) requestParams.get(name);
            String valueStr = "";
            for (int i = 0; i < values.length; i++) {
                valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
            }
            //乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
           /* try {
                valueStr = new String(valueStr.getBytes("ISO-8859-1"), "UTF-8");
                //valueStr = URLEncoder.encode(valueStr, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }*/
            logger.info("name=" + name + ",value:" + valueStr);
        }
        logger.info("接收微信推送支付结果通知结束"+System.currentTimeMillis());
        //return "";
        return "<xml>\n" +
                "  <return_code><![CDATA[FAIL]]></return_code>\n" +
                "  <return_msg><![CDATA[OK]]></return_msg>\n" +
                "</xml>";

    }

    private Map<String, Object> assemblyWxpayParam(String appId, String mchId, String key, String openId) {
        IdGenerator instance = IdGenerator.ID_GENERATOR;
        Map<String, Object> params = new HashMap<>(0);
        params.put("appid", appId);
        params.put("mch_id", mchId);
        params.put("device_info", "WEB");
        params.put("nonce_str", WxPayUtils.getRandomStringByLength(32));
        // params.put("sign","");
        params.put("sign_type", "MD5");
        params.put("body", "乐牙直通车-测试商品");
        params.put("out_trade_no", instance.nextId());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        params.put("total_fee", 1);
        //params.put("spbill_create_ip",1);
        String formatePattern = "yyyyMMddHHmmss";
        params.put("time_start", LeyaDateUtils.format(calendar, formatePattern));
        calendar.add(Calendar.MINUTE,6);
        params.put("time_expire", LeyaDateUtils.format(calendar,formatePattern));
        params.put("notify_url", "http://testorder.jck51.com/lywxpay/paynotify");
        params.put("trade_type", "JSAPI");
        params.put("openid", openId);
        String sign = WxPayUtils.getSign(params, key);
        params.put("sign", sign);
        return params;
    }

}
