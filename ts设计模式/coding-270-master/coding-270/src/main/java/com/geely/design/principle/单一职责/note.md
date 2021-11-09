不要存在多于一个导致类变更的原因
提高可读性

将类拆分
例如二分图就和 DFS 的图不要合在一个类里写 而是要分开
课程内容管理和课程权限管理接口要拆开 因为课程退订就没有 content 了

```JAVA

/**
 * Created by geely
 */
public class CourseImpl implements ICourseManager, ICourseContent {
    @Override
    public void studyCourse() {

    }

    @Override
    public void refundCourse() {

    }

    @Override
    public String getCourseName() {
        return null;
    }

    @Override
    public byte[] getCourseVideo() {
        return new byte[0];
    }
}

```
