package com.geely.design.principle.单一职责;

/**
 * Created by geely
 */
public class Method {
    private void updateUserInfo(String userName, String address) {
        userName = "geely";
        address = "beijing";
    }

    private void updateUserInfo(String userName, String... properties) {
        userName = "geely";
        // address = "beijing";
    }

    private void updateUsername(String userName) {
        userName = "geely";
    }

    private void updateUserAddress(String address) {
        address = "beijing";
    }

    private void updateUserInfo(String userName, String address, boolean bool) {
        if (bool) {
            // todo something1
        } else {
            // todo something2
        }

        userName = "geely";
        address = "beijing";
    }

}
