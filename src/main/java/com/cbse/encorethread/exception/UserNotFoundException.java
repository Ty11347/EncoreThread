package com.cbse.encorethread.exception;


public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }

    // Optionally, you can also override other constructors as needed.
    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotFoundException(Throwable cause) {
        super(cause);
    }

    protected UserNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> b79c09baacdc5ccb0decd225770a881b9dd3d6f3
