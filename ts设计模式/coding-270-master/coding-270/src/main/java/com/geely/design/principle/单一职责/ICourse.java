package com.geely.design.principle.单一职责;

/**
 * Created by geely 拆成两个接口：一个内容，一个功能
 */
public interface ICourse {
    String getCourseName();

    byte[] getCourseVideo();

    void studyCourse();

    void refundCourse();

}
