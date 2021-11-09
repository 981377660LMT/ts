package com.geely.design.pattern.creational.prototype.abstractprototype;

/**
 * Created by geely
 */
public abstract class A implements Cloneable{
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
