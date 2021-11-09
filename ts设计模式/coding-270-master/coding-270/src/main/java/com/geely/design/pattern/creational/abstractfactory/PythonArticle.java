package com.geely.design.pattern.creational.abstractfactory;

/**
 * Created by geely
 */
public class PythonArticle extends Article {
    @Override
    public void produce() {
        System.out.println("编写Python课程手记");
    }
}
