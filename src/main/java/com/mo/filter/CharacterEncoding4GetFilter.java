package com.mo.filter;

import org.springframework.web.filter.CharacterEncodingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * Copyright (c)  by www.leya920.com
 * All right reserved.
 * Create Date: 2017-04-25 16:28
 * Create Author: maguoqiang
 * File Name: CharacterEncoding4GetFilter.java
 * Last version:  1.0
 * Function: //TODO
 * Last Update Date: 2017-04-25 16:28
 * Last Update Log:
 * Comment: 此种方法行不通
 **/
public class CharacterEncoding4GetFilter extends CharacterEncodingFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        /**
         * 自己实现，解决get请求乱码
         */
        String method=request.getMethod();
        if ("GET".equalsIgnoreCase(method)){
            request.setCharacterEncoding("UTF-8");
            Map allParams= request.getParameterMap();
            for (Object o:allParams.keySet()){
                byte[] s=allParams.get(o).toString().getBytes("iso-8859-1");
                o = new String(s,"utf-8");
                System.out.println(o);
            }
            //String str=new String((request.getParameter()).getBytes("iso-8859-1"),"utf-8")

            //response.setContentType("application/json;charset=UTF-8");//防止数据传递乱码
        }
        /**
         * 调用父类，只能解决post请求
         */
        super.doFilterInternal(request, response, filterChain);
    }
}
