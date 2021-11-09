package com.geely.design.principle.依赖倒置;

/**
 * Created by geely
 */
public class Test {

    // v1
    // public static void main(String[] args) {
    // Geely geely = new Geely();
    // geely.studyJavaCourse();
    // geely.studyFECourse();
    // }

    // v2
    // public static void main(String[] args) {
    // Geely geely = new Geely();
    // geely.studyImoocCourse(new JavaCourse());
    // geely.studyImoocCourse(new FECourse());
    // geely.studyImoocCourse(new PythonCourse());
    // }

    // v3
    // public static void main(String[] args) {
    // Geely geely = new Geely(new JavaCourse());
    // geely.studyImoocCourse();
    // }
    public static void main(String[] args) {
        Geely geely = new Geely();
        geely.setiCourse(new JavaCourse());
        geely.studyImoocCourse();

        geely.setiCourse(new FECourse());
        geely.studyImoocCourse();

    }

}
