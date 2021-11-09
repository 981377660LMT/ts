package com.geely.design.principle.依赖倒置;

/**
 * Created by geely
 */
public class Geely {

    public void setiCourse(ICourse iCourse) {
        this.iCourse = iCourse;
    }

    private ICourse iCourse;

    public void studyImoocCourse() {
        iCourse.studyCourse();
    }

}
