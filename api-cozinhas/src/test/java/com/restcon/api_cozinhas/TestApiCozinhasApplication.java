package com.restcon.api_cozinhas;

import org.springframework.boot.SpringApplication;

public class TestApiCozinhasApplication {

	public static void main(String[] args) {
		SpringApplication.from(ApiCozinhasApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
