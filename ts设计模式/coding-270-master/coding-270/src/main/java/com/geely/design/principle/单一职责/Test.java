package com.geely.design.principle.单一职责;

/**
 * Created by geely
 */
public class Test {
    public static void main(String[] args) {
        // Bird bird = new Bird();
        // bird.mainMoveMode("大雁");
        // bird.mainMoveMode("鸵鸟");

        FlyBird flyBird = new FlyBird();
        flyBird.mainMoveMode("大雁");

        WalkBird walkBird = new WalkBird();
        walkBird.mainMoveMode("鸵鸟");

    }
}
