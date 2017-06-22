package com.mo.action;

import com.mo.util.ProducerClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
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
    @ResponseBody
    public Map batchImport(HttpServletRequest request,HttpServletResponse response) throws Exception {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;

        MultipartFile multipartFile = multipartRequest.getFile("file");
        String sourceName = multipartFile.getOriginalFilename(); // 原始文件名
        String fileType = sourceName.substring(sourceName.lastIndexOf("."));
        //System.out.println("上传的文件名为:"+sourceName+"类型为:"+fileType);
        //System.out.println("项目Id为:"+proId+"项目名称为:"+proName);
        String base = request.getSession().getServletContext().getRealPath("/WEB-INF/views/upload");
        File file = new File(base);
        if(!file.exists()){
            file.mkdirs();
        }
        String path=base + File.separator + sourceName;
        File file_d=new File(path);
        multipartFile.transferTo(file_d);
        //service.insert("insertAttachment", attach);
        //上传成功后读取Excel表格里面的数据
        System.out.println("路径是"+path);
        // File read=new File(path);

        File read=new File(path);
        Map<String,String> map= new HashMap<>();
        /**
         * 模拟导入-垂直导入excel
         */
        //map= ImportExcelUtil.readExcelTest(path);
        /**
         * 模拟导入-使用消息队列   直接把文件作为消息传到server，然后由消费者接受
         */
        sendFile2Mq(path);
        for (int i = 0; i < 10; i++) {
            map.put(i+"",i+"");
        }
        return map;
    }

    /**
     * 传递文件到消息服务
     * @param path 地址
     */
    private void sendFile2Mq(String path)throws Exception{
        InputStream is =new FileInputStream(path);
        byte[] buffer=new byte[8192];
        byte[] message=new byte[8192];
        int length=0;
        while(-1!=(length=is.read(buffer, 0, 8192))){
            System.arraycopy(buffer,0,message,0, length);
        }
        ProducerClient.produceMsgToChannel("mgq_test_file",message);
        is.close();
    }
}
