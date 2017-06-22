package com.mo.util;

import com.mo.action.DealExcelOneRow;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * Copyright (c)  by www.leya920.com
 * All right reserved.
 * Create Date: 2017-02-15 18:07
 * Create Author: maguoqiang
 * File Name: ImportExcelUtil.java
 * Last version:  1.0
 * Function: //TODO
 * Last Update Date: 2017-02-15 18:07
 * Last Update Log:
 * Comment: //TODO
 **/
public class ImportExcelUtil {
    public static List<Map<String, String>> parseExcel(InputStream fis) {
        List<Map<String, String>> data = new ArrayList<Map<String, String>>();
        try {
            HSSFWorkbook book = new HSSFWorkbook(fis);
            HSSFSheet sheet = book.getSheetAt(0);
            int firstRow = sheet.getFirstRowNum();
            int lastRow = sheet.getLastRowNum();
            //除去表头和第一行
//          ComnDao dao = SysBeans.getComnDao();
            for (int i = firstRow + 1; i < lastRow + 1; i++) {
                Map<String, String> map = new HashMap<String, String>();

                HSSFRow row = sheet.getRow(i);
                int firstCell = row.getFirstCellNum();
                int lastCell = row.getLastCellNum();


                for (int j = firstCell; j < lastCell; j++) {

                    HSSFCell cell2 = sheet.getRow(firstRow + 1).getCell(j);
                    String key = cell2.getStringCellValue();

                    HSSFCell cell = row.getCell(j);

                    if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
                        cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                    }
                    String val = cell.getStringCellValue();

//              System.out.println(val);

                    if (i == firstRow + 1) {
                        break;
                    } else {
                        map.put(key, val);

                    }
//              System.out.println(map);
                }
                if (i != firstRow + 1) {
                    data.add(map);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;
    }

    public static Map<String,String> readExcelFile(String fileName){
        //创建对Excel工作薄文件的引用

        HashMap<String, String> map=new HashMap<String, String>();
        try {

            InputStream is = new FileInputStream(fileName);
            HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);

            // 循环工作表Sheet
            for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
                HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
                if (hssfSheet == null) {
                    continue;
                }
                // 循环行Row
                for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
                    HSSFRow hssfRow = hssfSheet.getRow(rowNum);
                    if (hssfRow == null) {
                        continue;
                    }
                    HSSFCell no = hssfRow.getCell(0);
                    HSSFCell name = hssfRow.getCell(1);
                    HSSFCell age = hssfRow.getCell(2);
                    HSSFCell score = hssfRow.getCell(3);
                    System.out.println(no+""+name+age+score+"测试数据");
                }
            }



        } catch (Exception e) {
            e.printStackTrace();

        }finally{


        }


        return map;
    }

    /**
     *  测试导入
     * @param fileName 文件名称
     * @return 结果
     */
    public static Map<String,String> readExcelTest(String fileName){
        //创建对Excel工作薄文件的引用

        HashMap<String, String> map=new HashMap<String, String>();
        try {

            InputStream is = new FileInputStream(fileName);
            HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);

            // 循环工作表Sheet
            //原始方法。串行执行  500条数据 55s
            /*for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
                HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
                if (hssfSheet == null) {
                    continue;
                }
                // 循环行Row
                for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
                    //处理每一行数据
                    Thread.sleep(100);
                    map.put(rowNum+"",rowNum+"");
                }
                //改进，多线程执行

            }*/

            //改进，多线程执行  500条数据 200ms
            for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
                HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
                if (hssfSheet == null) {
                    continue;
                }
                ExecutorService pool = Executors.newFixedThreadPool(hssfSheet.getLastRowNum());

                ConcurrentMap<Future,String> concurrentMap=new ConcurrentHashMap<Future,String>();
                // 循环行Row
                for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
                    //处理每一行数据
                    DealExcelOneRow retMes=new DealExcelOneRow(rowNum+"");
                    Future f1 = pool.submit(retMes);
                    concurrentMap.put(f1,"");
                }
                for (Future future:concurrentMap.keySet()){
                    map.put(future.get().toString(),future.get().toString());
                }

            }
        } catch (Exception e) {
            e.printStackTrace();

        }finally{


        }


        return map;
    }


}
