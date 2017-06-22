package com.mo.util;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

/**
 * Copyright (c)  by www.leya920.com
 * All right reserved.
 * Create Date: 2017-04-25 10:03
 * Create Author: maguoqiang
 * File Name: ProducerClient.java
 * Last version:  1.0
 * Function: //TODO
 * Last Update Date: 2017-04-25 10:03
 * Last Update Log:
 * Comment: //TODO
 **/
public class ProducerClient {

    public static void produceMsgToChannel(String routingKey, byte[] message) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("192.168.0.108");
        factory.setUsername("admin");
        factory.setPassword("admin");

        Connection connection = factory.newConnection();

        Channel channel = connection.createChannel();
        channel.queueDeclare(routingKey, false, false, false, null);
        channel.basicPublish("", routingKey, null, message);

        System.out.println(" [192.168.0.108] Sent ..");

        channel.close();
        connection.close();
    }
}
