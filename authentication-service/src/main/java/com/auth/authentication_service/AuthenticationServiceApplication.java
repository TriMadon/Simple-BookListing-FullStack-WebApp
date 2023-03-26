package com.auth.authentication_service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

@SpringBootApplication
@RestController
public class AuthenticationServiceApplication {
  static HashMap dummyUserDataBase;

  public static void main(String[] args) throws IOException {
    System.setProperty("server.port", "8081");
    System.setProperty("http.maxConnections", "100");

    InputStream is = new ClassPathResource("userdata.json").getInputStream();
    dummyUserDataBase = new ObjectMapper().readValue(is, HashMap.class);

    SpringApplication.run(AuthenticationServiceApplication.class, args);
  }

  @CrossOrigin
  @PostMapping(path = "/auth",
  consumes = MediaType.APPLICATION_JSON_VALUE,
  produces = MediaType.APPLICATION_JSON_VALUE)
  public String handleAuthentication(@RequestBody String credentials) throws JsonProcessingException {
    System.out.println(credentials);
    HashMap credentialMap = new ObjectMapper().readValue(credentials, HashMap.class);
    String username = (String) credentialMap.get("username");
    String password = (String) credentialMap.get("password");
    if (dummyUserDataBase.containsKey(username) && dummyUserDataBase.get(username).equals(password))
      return "200";
    return "404";
  }
}
