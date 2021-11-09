package com.geely.design.principle.迪米特;

/**
 * Created by geely
 */
public class Boss {

    public void commandCheckNumber(TeamLeader teamLeader) {
        teamLeader.checkNumberOfCourses();
    }

}
