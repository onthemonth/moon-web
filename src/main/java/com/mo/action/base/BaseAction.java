package com.mo.action.base;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Copyright (c)  by www.leya920.com
 * All right reserved.
 * Create Date: 2016/10/9
 * Create Author: xiongwenyou
 * File Name: BaseAction
 * Last version:  1.0
 * Function: 提供action基类提供获取HttpRequest httpResponse
 * Last Update Date: 2016/10/9 9:55
 * Comment: 提供action基础的一些方法
 */
public class BaseAction {
    /**
     *
     * @return
     */
    public HttpServletResponse getResponse(){
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
    }

    /**
     *
     * @return
     */
    public HttpServletRequest getRequest(){
        return ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
    }
}
