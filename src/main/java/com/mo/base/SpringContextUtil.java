
package com.mo.base;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import java.util.concurrent.atomic.AtomicReference;

/**
 * 
 * <p>
 * ClassName: SpringContextUtil
 * </p>
 * <p>
 * </p>
 * <p>
 * </p>
 */
public class SpringContextUtil implements ApplicationContextAware {
    /**
     * Spring应用上下文环境
     */
    static final AtomicReference<ApplicationContext> APPLICATIONCONTEXT = new AtomicReference<ApplicationContext>();
    /**
     * 
     */

    /**
     * 实现ApplicationContextAware接口的回调方法，设置上下文环境
     * 
     * @param applicationContext applicationContext
     * @throws BeansException BeansException
     */
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        SpringContextUtil.APPLICATIONCONTEXT.set(applicationContext);
    }

   /**
    * 
    * <p>Description: get</p>
    * @return ApplicationContext ApplicationContext
    */
    public static ApplicationContext getApplicationContext() {
        return APPLICATIONCONTEXT.get();
    }

    /**
     * 获取类型为requiredType的对象
     * 如果bean不能被类型转换，相应的异常将会被抛出（BeanNotOfRequiredTypeException）
     * 
     * @param name bean注册名
     * @param requiredType 返回对象类型
     * @param <T> t
     * @return Object 返回requiredType类型对象
     * @throws BeansException BeansException
     */
    public static <T> T getBean(String name, Class<T> requiredType) throws BeansException {
        return APPLICATIONCONTEXT.get().getBean(name, requiredType);
    }

    /**
     * 获取指定名称的容器内对象，一般不应该经常使用，而应该使用有类型的版本
     * 
     * @param name bean注册名
     * @return Object 返回requiredType类型对象
     * @throws BeansException BeansException
     */
    public static Object getBean(String name) throws BeansException {
        return APPLICATIONCONTEXT.get().getBean(name);
    }

    /**
     * 获取类型为Class<T>的managed bean
     * 
     * @param <T> t
     * @param requiredType requiredType
     * @return T t
     */
    public static <T> T getBean(Class<T> requiredType) {
        return APPLICATIONCONTEXT.get().getBean(requiredType);
    }

    /**
     * 如果BeanFactory包含一个与所给名称匹配的bean定义，则返回true
     * 
     * @param name name 
     * @return boolean boolean
     */
    public static boolean containsBean(String name) {
        return APPLICATIONCONTEXT.get().containsBean(name);
    }

    /**
     * 判断以给定名字注册的bean定义是一个singleton还是一个prototype。
     * 如果与给定名字相应的bean定义没有被找到，将会抛出一个异常（NoSuchBeanDefinitionException）
     * 
     * @param name name
     * @return boolean boolean
     * @throws NoSuchBeanDefinitionException NoSuchBeanDefinitionException
     */
    public static boolean isSingleton(String name) throws NoSuchBeanDefinitionException {
        return APPLICATIONCONTEXT.get().isSingleton(name);
    }

   
    /**
     * 
     * <p>Description: get</p>
     * @param name name
     * @return Class 注册对象的类型
     * @throws NoSuchBeanDefinitionException NoSuchBeanDefinitionException
     */
    public static Class<?> getType(String name) throws NoSuchBeanDefinitionException {
        return APPLICATIONCONTEXT.get().getType(name);
    }

    /**
     * 如果给定的bean名字在bean定义中有别名，则返回这些别名
     * 
     * @param name name
     * @return  String[] String[]
     * @throws NoSuchBeanDefinitionException NoSuchBeanDefinitionException
     */
    public static String[] getAliases(String name) throws NoSuchBeanDefinitionException {
        return APPLICATIONCONTEXT.get().getAliases(name);
    }
}
