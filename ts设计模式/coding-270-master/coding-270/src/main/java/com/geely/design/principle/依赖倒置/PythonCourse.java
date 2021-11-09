package com.geely.design.principle.依赖倒置;

/**
 * Created by geely
 */
public class PythonCourse implements ICourse {
    @Override
    public void studyCourse() {
        System.out.println("Geely在学习Python课程");
    }
}
