package com.mo.action;

import org.springframework.util.ObjectUtils;

/**
 * Created by maguoqiang on 2016/11/10.
 */
public abstract class AbstractTest {

    public void test01(){
        this.test02();
    }

    public abstract void test02();

    public static void main(String[] args) {
        AbstractTest abstractTest=new AbstractTest() {
            @Override
            public void test02() {
                System.out.println("test02方法执行、、、、");
                System.out.println(System.identityHashCode(this));
                System.out.println(Integer.toHexString(System.identityHashCode(this)));
                String d=ObjectUtils.identityToString(this);
                System.out.println(d);
            }
        };
        abstractTest.test01();
    }
}
