package com.mo.action;

import java.util.concurrent.Callable;

/**
 * Copyright (c)  by www.leya920.com
 * All right reserved.
 * Create Date: 2017-02-16 17:46
 * Create Author: maguoqiang
 * File Name: DealExcelOneRow.java
 * Last version:  1.0
 * Function: //TODO
 * Last Update Date: 2017-02-16 17:46
 * Last Update Log:
 * Comment: //TODO
 **/
public class DealExcelOneRow implements Callable<String> {
    /**
     * Computes a result, or throws an exception if unable to do so.
     *
     * @return computed result
     * @throws Exception if unable to compute a result
     */
    private String retMes;
    public DealExcelOneRow(String retMes){
        this.retMes=retMes;
    }
    @Override
    public String call() throws Exception {
        //模拟处理数据
        Thread.sleep(5000);
        return retMes;
    }
}
