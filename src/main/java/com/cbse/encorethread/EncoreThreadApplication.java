package com.cbse.encorethread;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class EncoreThreadApplication {

    public static void main(String[] args) {
        SpringApplication.run(EncoreThreadApplication.class, args);
    }

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

}
