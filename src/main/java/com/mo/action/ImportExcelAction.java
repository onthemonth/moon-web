package com.mo.action;

import com.mo.util.ImportExcelUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Copyright (c)  by www.leya920.com
 * All right reserved.
 * Create Date: 2017-02-15 17:59
 * Create Author: maguoqiang
 * File Name: ImportExcelAction.java
 * Last version:  1.0
 * Function:
 * Last Update Date: 2017-02-15 17:59
 * Last Update Log:
 * Comment: 导入excel
 **/
@Controller
@RequestMapping(value = "/import")
public class ImportExcelAction {

    @RequestMapping(value = "/toImport")
    public ModelAndView toImport(){
        ModelAndView retView = new ModelAndView();
        retView.setViewName("ftl/import");
        return retView;
    }


    @RequestMapping(value = "/batchImprot")
    public String batchImport(HttpServletRequest request,HttpServletResponse response) throws IOException {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;

        System.out.println("通过 jquery.form.js 提供的ajax方式上传文件！");
        String path = "E:\\demo";
        //容错处理
        File dir = new File(path);
        if(!dir.exists()) {
            dir.mkdirs();
        }
        String fileName = excelFile.getOriginalFilename();//report.xls
        String fileName2 = excelFile.getName();//excelFile

        InputStream fis = excelFile.getInputStream();

        List<Map<String, String>> data = ImportExcelUtil.parseExcel(fis);
        //解析到的数据就可以做一些数据库的插入操作了……
        return null;
    }
}
