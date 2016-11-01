package com.mo.action;


import com.mo.vo.HelloVo;
import com.moon.auth.entity.Depart;
import com.moon.dubbo.test.IDemoService;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * Created by maguoqiang on 16/4/18.
 *
 */
@Controller
public class TestAction {
    @Resource(name = "demoService")
    private IDemoService demoService;
    @RequestMapping(value = "/",method = RequestMethod.GET)
    @ResponseBody
    public String index(@RequestParam(value = "signature", required = false)String signature,
                        @RequestParam(value = "timestamp", required = false)String timestamp,
                        @RequestParam(value = "nonce", required = false)String nonce,
                        @RequestParam(value = "echostr", required = false)String echostr){
        //System.out.println("-------"+s.sayHello("aaa"));
        //这个是自己在微信公众号网站中设置的
        String token ="dd792cf7c6ec872a06249d02af9f6eba";
        //基本信息校验
        if(StringUtils.isBlank(signature)){
            return "index";
        }
        System.out.println("request:"+signature);
        List<String> paramsList = new ArrayList<String>(0);
        paramsList.add(token);
        paramsList.add(timestamp);
        paramsList.add(nonce);
        Collections.sort(paramsList);
        String sha2Sign = this.createSign(paramsList);
        System.out.println("creat:"+sha2Sign);
        if(sha2Sign.equalsIgnoreCase(signature)){
            System.out.println("两者相等");
            System.out.println(echostr);
            return echostr;
        }
        return "index";
    }

    private String createSign(List<String> paramsList){
        String params = "";
        for (String str : paramsList) {
            params += str;
        }
        MessageDigest msgDigest = DigestUtils.getSha1Digest();
        try {
            msgDigest.update(params.getBytes("UTF-8"));
            byte[] sha1Byte = msgDigest.digest();
            return getFormattedText(sha1Byte);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }
    private static String getFormattedText(byte[] bytes) {
        int len = bytes.length;
        StringBuilder buf = new StringBuilder(len * 2);
        char hexDigit[] = {'0', '1', '2', '3', '4', '5', '6', '7',
                '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
        for (int j=0; j<bytes.length; j++) {
            buf.append(hexDigit[(bytes[j] >> 4) & 0x0f]);
            buf.append(hexDigit[bytes[j] & 0x0f]);
        }
        return buf.toString();
    }

    @RequestMapping(value = "/test/ftl")
    public ModelAndView test(HttpServletRequest request,HttpServletResponse response){
        System.out.println();
        Cookie c=new Cookie("Customer","huangxp");
        c.setPath("/test");
        c.setMaxAge(123456879);
        response.addCookie(c);
        ModelAndView view = new ModelAndView("test");
        List<String> s = new ArrayList<String>();
        s.add("a");
        s.add("ab");
        s.add("ac");
        s.add("ad");
        view.addObject("strl",s);
        view.addObject("bb","bbb");
        view.addObject("ooo", new OOO("afa", "safd"));
        List<OOO> oool = new ArrayList<>();
        oool.add(new OOO("afa","safd"));
        oool.add(new OOO("afa", "safd"));
        view.addObject("date",new Date());
        view.addObject("oool", oool);
        return view;
    }

    public static class OOO{
        public OOO(String n,String ab){
            this.name=n;
            this.age=ab;
        }
        String name;
        String age;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getAge() {
            return age;
        }

        public void setAge(String age) {
            this.age = age;
        }

        @Override
        public String toString() {
            return "OOO{" +
                    "name='" + name + '\'' +
                    ", age='" + age + '\'' +
                    '}';
        }
    }

    // /ajax/a   即返回a
    @RequestMapping(value = "/ajax/{name:[a-z]+}")
    @ResponseBody
    public Object ajax_json(@PathVariable String name){
        return name;//helloWordService.sayHello(name);
    }

    // /ajax/obj?name=aaa&val=aab
    @RequestMapping(value = "/ajax/obj")
    @ResponseBody
    public Object ajax_object(HelloVo hello){
        return hello;
    }
    // /ajax/obj1?name=aaa&val=aab   不可行
    @RequestMapping(value = "/ajax/obj1")
    @ResponseBody
    public Object ajax_object1(@RequestParam(required = false) HelloVo hello){
        return hello;
    }

    // /ajax/list?names=a&names=2
    @RequestMapping(value = "/ajax/list")
    @ResponseBody
    public Object ajax_list(@RequestParam(required = false) List<String> names){
        return names;
    }

    // /ajax/list1?names=a&names=2   此方式不可行
    @RequestMapping(value = "/ajax/list1")
    @ResponseBody
    public Object ajax_list1(List<String> names){
        return names;
    }

    // /ajax/list2?name=a&name=2
    // /ajax/list2?name=a,2
    @RequestMapping(value = "/ajax/list2")
    @ResponseBody
    public Object ajax_list2(@RequestParam(value =  "name",required = false) List<String> names){
        return names;
    }


    @RequestMapping(value = "/test/dubbo",method = RequestMethod.GET)
    @ResponseBody
    public Depart testDubbo(String parama){
        Depart d = this.demoService.sayHello(parama);
        return d;
    }
}