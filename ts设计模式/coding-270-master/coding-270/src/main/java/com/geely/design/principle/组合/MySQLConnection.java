package com.geely.design.principle.组合;

/**
 * Created by geely
 */
public class MySQLConnection extends DBConnection {
    @Override
    public String getConnection() {
        return "MySQL数据库连接";
    }
}
